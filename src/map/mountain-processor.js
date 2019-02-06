import mapContiguousTiles from './map-contiguous-tiles';
import processTileGroup from './process-tile-group';

export default function parse(grid) {
    const ranges = splitMountainRanges(grid);
    const bigRanges = [];
    const tooSmallGroups = [];
    ranges.forEach(range => {
        if (range.size > 35) {
            bigRanges.push(range);
        } else {
            tooSmallGroups.push(range);
        }
    })

    processTooSmallGroups(tooSmallGroups);
    let normalizedRanges = normalizeBigRanges(bigRanges);        
    defineRidges(normalizedRanges);

}

function SortAndConvertToArray(range) {
    let keys = Object.keys(range.tiles);
    keys.sort((a, b) => a - b);
    range.tiles = keys.map(key => range.tiles[key]);
    return range;
}

function normalizeBigRanges(ranges) {
    ranges.forEach(range => {
        range.tiles = range.tiles.reduce((acc, tile, index) => {
            if (!acc.hasOwnProperty(tile.y)) {
                acc[tile.y] = [tile];
            } else {
                acc[tile.y].push(tile);
            }
            return acc;
        }, {});

        range = SortAndConvertToArray(range);
        range.tiles.forEach((row, index) => {
            if (row.length < 2) {
                row.forEach(tile => {
                    tile.setTerrain('field', false);
                });
                range.tiles.splice(index, row.length);
                return;
            }
            row.sort((a,b) => a.x - b.x);
            //let midPoint = row[Math.floor(row.length / 2)].x;
            //keep ranges from getting too fat. The height is not visually believable, and can lead to goofy tile configurations
            // for (let index = 0; index < row.length; index++) {
            //     let tile = row[index];
            //     if (tile.x - 3 > midPoint || tile.x + 4 < midPoint) {
            //         tile.setTerrain('field', false);
            //         row.splice(index, 1);
            //         index--;
            //     }
            // }
        });            
    });
    return ranges;
}

function defineTerrainSubtypeByRow(row, previousSpineIndex, movedLeftLastTime, move) {
    let couldAssignRidgeTile = false;
    row.forEach(tile => {
        let targetType = null;
        if (previousSpineIndex + 5 < tile.x || previousSpineIndex - 5 > tile.x) {
            tile.setTerrain('field', false);
            targetType = "heath";
        } else if (tile.x === previousSpineIndex) {
            couldAssignRidgeTile = true;
            targetType = move === 0 && movedLeftLastTime
                ? "ridge-forwardDiagonal"
                : move < 0
                    ? "ridge-forwardDiagonal"
                    : move > 0
                        ? "ridge-backwardDiagonal"
                        : "ridge-vertical";
        } else {
            targetType = tile.x > previousSpineIndex
            ? tile.x - 1 === previousSpineIndex && (move !== 0 || movedLeftLastTime) ? "ridge-eastSlope" : "eastSlope"
            : tile.x + 1 === previousSpineIndex
                ? "ridge-westSlope"
                : "westSlope";
        }

        tile.setTerrainSubtypeName(targetType);
    });
    return couldAssignRidgeTile
}

function assignRidgeToRangeRow(row, continuousStraightRidges, movedLeftLastTime, previousSpineIndex) {
    let currentMidpoint = row[Math.floor(row.length / 2)].x;
    let move = 0;
    //if this is the first iteration, just start the spine in the middle
    if (previousSpineIndex === null) {
        previousSpineIndex = currentMidpoint;
    } 
    //some randomness to break up long vertical ranges, as suggested by guide
    if (( Math.random() > 0.4 && continuousStraightRidges > 2 ) || (previousSpineIndex !== currentMidpoint && !movedLeftLastTime)) {
        continuousStraightRidges = 0;
        move = (previousSpineIndex <= currentMidpoint) 
            ? 1
            : -1;
    }
    if (move < 0) {
        previousSpineIndex--;
    }
    let couldAssignRidgeTile = defineTerrainSubtypeByRow(row, previousSpineIndex, movedLeftLastTime, move);
    return {
        move,
        couldAssignRidgeTile,
        continuousStraightRidges,
        previousSpineIndex
    }
}

function defineRidges(ranges) {
    ranges.forEach(range => {
        let previousSpineIndex = null;
        let movedLeftLastTime = null;
        let targetIndex = range.tiles.length;
        let inc = 1;
        let continuousStraightRidges = 0;
        for (let i = 0; i !== targetIndex; i += inc) {
            let row = range.tiles[i];

            let result = assignRidgeToRangeRow(row, continuousStraightRidges, movedLeftLastTime, previousSpineIndex)
            continuousStraightRidges = result.continuousStraightRidges;
            let move = result.move;
            let couldAssignRidgeTile = result.couldAssignRidgeTile;
            previousSpineIndex = result.previousSpineIndex;
            // let currentMidpoint = row[Math.floor(row.length / 2)].x;
            // let move = 0;
            // //if this is the first iteration, just start the spine in the middle
            // if (previousSpineIndex === null) {
            //     previousSpineIndex = currentMidpoint;
            // } 
            // //some randomness to break up long vertical ranges, as suggested by guide
            // if (( Math.random() > 0.4 && continuousStraightRidges > 2 ) || (previousSpineIndex !== currentMidpoint && !movedLeftLastTime)) {
            //     continuousStraightRidges = 0;
            //     move = (previousSpineIndex <= currentMidpoint) 
            //         ? 1
            //         : -1;
            // }
            // if (move < 0) {
            //     previousSpineIndex--;
            // }
           // let couldAssignRidgeTile = defineTerrainSubtypeByRow(row, previousSpineIndex, movedLeftLastTime, move);
            
           
           let hasBorderOnBottom = range.tiles.length - 1 === i || !couldAssignRidgeTile;
            if (hasBorderOnBottom) {
                removeIncongruousTiles(row);
            }

            //updates for next iteration        
            if (!couldAssignRidgeTile) {
               // handleDiscontinuousRidges(range, i);
            } 

                previousSpineIndex += move;
                movedLeftLastTime = move === -1;
                continuousStraightRidges += move === 0 ? 1 : 0;        
        }

    });
}

function removeIncongruousTiles(row) {
    let lastRidgeTileIndex = row.findIndex(tile => tile.terrain.subtypeName.indexOf('Diagonal') >= 0);
    if (lastRidgeTileIndex === -1) {
        return;
    }
    let tilesThatDontWork = [];
    if (row[lastRidgeTileIndex].terrain.subtypeName.indexOf("forward") >= 0) {
        tilesThatDontWork = row.slice(0, lastRidgeTileIndex + 1);
        row.splice(0, lastRidgeTileIndex);    
    } else {
        tilesThatDontWork = row.slice(lastRidgeTileIndex + 1);
        row.splice(lastRidgeTileIndex, row.length);
    }
    tilesThatDontWork.forEach(tile => {
        tile.setTerrain('field', false);
    });

}

function handleDiscontinuousRidges(range, failedIndex) {
    let currentMidpoint = row[Math.floor(row.length / 2)].x;
    for (let i = failedIndex; failedIndex < range.tiles.length; i++) {

    }

}

function splitMountainRanges(grid) {
    const ranges = [];
    grid.rows.forEach(row => {
        row.forEach(tile => {
            if (tile.terrain.typeName === 'hills' && tile.terrain.associatedMountainRange === null) {
                let currentRange = { name: tile.UID };
                mapContiguousTiles(tile, currentRange, 'hills');
                let processedGroup = processTileGroup(currentRange);
                ranges.push(processedGroup);
            }
        })
    });
    return ranges;
}


function processTooSmallGroups(groups) {

    groups.forEach(group => {
        let targetType = group.size > 5 ? 'cliffs' : 'field'
        group.tiles.forEach(tile => {
            tile.setTerrain(targetType, group.size > 5);
        });
    });
    
}