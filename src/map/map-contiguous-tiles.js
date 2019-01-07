export default function mapContiguousTiles(tile, currentRange, terrainTypeName) {
    let tileRangeName = tile.x + ":" + tile.y;
    if (!currentRange.hasOwnProperty(tileRangeName)) {        
        currentRange[tileRangeName] = tile;
        tile.terrain.associatedMountainRange = currentRange.name;
        let contiguousTiles = tile.getNeighborTiles().filter(n => n !== null && n.terrain.typeName === terrainTypeName && !n.terrain.associatedMountainRange);
        contiguousTiles.forEach(cTile => { mapContiguousTiles(cTile, currentRange, terrainTypeName); });
    }
};