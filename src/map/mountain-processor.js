import mapContiguousTiles from './map-contiguous-tiles';
import processTileGroup from './process-tile-group';


export default function parse(grid) {
    processTooSmallGroups(splitMountainRanges(grid));
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