import {isCloseTo} from './map-utils';

export default function parse(grid, homeStartPosition) {
    cellularDivision(grid, homeStartPosition);
}

function cellularDivision(grid, homeStartPosition) {
    grid.rows.forEach(row => {
        row.forEach(tile => {
            let targetType;
            if (isCloseTo([tile.x, tile.y], [homeStartPosition[0], homeStartPosition[1]], 4)) {
                targetType = 'field';
            } else {
                targetType = Math.random() > 0.55 ? 'field' : 'heath';
            }
            tile.setSecondaryTerrainType(targetType);
        });
    });
    for (let i = 0; i < 3; i++) {
        grid.rows.forEach(row => {
            row.forEach(tile => {
                let neighbors = tile.getNeighbors();
                let similarTiles = neighbors.reduce((a, b) => 
                    grid.rows[b[0]][b[1]].terrain.secondaryTerrainTypeName === tile.terrain.secondaryTerrainTypeName 
                        ? a + 1
                        : a + 0
                , 0);
                if (similarTiles < 4) {
                    tile.setSecondaryTerrainType(tile.terrain.secondaryTerrainTypeName === 'field' ? 'heath': 'field');
                }
            });
        });
    }
}