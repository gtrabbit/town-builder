import mapContiguousTiles from './map-contiguous-tiles';
import processTileGroup from './process-tile-group';

export default function parse(grid) {
    const ranges = splitMountainRanges(grid);
    const bigRanges = [];
    const tooSmallGroups = [];
    ranges.forEach(range => {
        if (range.size > 20) {
            bigRanges.push(range);
        } else {
            tooSmallGroups.push(range);
        }
    })

    processTooSmallGroups(tooSmallGroups);
    let normalizedRanges = normalizeBigRanges(bigRanges);        
    defineRidges(normalizedRanges);
    //defineEdges(normalizedRanges);

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

        for (let index in range.tiles) {
            if (range.tiles.hasOwnProperty(index)) {
                let row = range.tiles[index];
                row.sort((a,b) => a.x - b.x);
                let midPoint = row[Math.floor(row.length / 2)].x;
                //keep ranges from getting too fat. The height is not visually believable, and can lead to goofy tile configurations
                for (let index = 0; index < row.length; index++) {
                    let tile = row[index];
                    if (tile.x - 3 > midPoint || tile.x + 4 < midPoint) {
                        tile.setTerrain('field', false);
                        row.splice(index, 1);
                        index--;
                    }
                }
            }
        }
    });
    return ranges;
}

function defineEdges(ranges) {

    ranges.forEach(range => {
        let tiles = range.tiles;

    })
}

//ToDo: do not set spriteNames directly, but instead set terrainTypes and let terrain class handle transformations
function defineRidges(ranges) {
    ranges.forEach(range => {
        let previousSpineIndex = null;
        let movedLeftLastTime = null;
        let continuousStraightRidges = 0;
        for (let groupIndex in range.tiles) {
            if (range.tiles.hasOwnProperty(groupIndex)) {
                let group = range.tiles[groupIndex];
                let currentMidpoint = group[Math.floor(group.length / 2)].x;
                let move = 0;
                //if this is the first iteration, just start the spine in the middle
                if (previousSpineIndex === null) {
                    previousSpineIndex = currentMidpoint;
                } 
                //some randomness to break up long vertical changes, as suggested by guide
                if (( Math.random() > 0.4 && continuousStraightRidges > 2 ) || (previousSpineIndex !== currentMidpoint && !movedLeftLastTime)) {
                    continuousStraightRidges = 0;
                    move = (previousSpineIndex <= currentMidpoint) 
                        ? 1
                        : -1;
                }
                if (move < 0) {
                    previousSpineIndex--;
                }

                group.forEach(tile => {
                    let targetType = null;
                    if (tile.x === previousSpineIndex) {
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
                        : tile.x - 1 === previousSpineIndex
                            ? "ridge-westSlope"
                            : "westSlope";
                    }
                    tile.setTerrainSubtypeName(targetType);
                });
                previousSpineIndex += move;
                movedLeftLastTime = move === -1;
                continuousStraightRidges += move === 0 ? 1 : 0;
            }
        }
    });
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