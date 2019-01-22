import TerrainSubtypeModel from './terrain-subtype-model';
import {GetSpriteByTerrainAndCaseNumber, GetSpriteForMountainTerrain} from './sprite-mappings';


export function assignSprite(tile) {
    if (tile.terrain.typeName === 'hills') {
        return assignHillsTerrainSubtype(tile);
    } else if (tile.terrain.typeName === 'field') {
        return assignFieldTerrainSubtype(tile)
    }
    if (tile.terrain.typeName === 'forest') {
        setForestSecondarySprite(tile);
    }
    return assignTerrainSubtype(tile);
}

function setForestSecondarySprite(tile) {
    let terrainSubtypeModel = assignFieldTerrainSubtype(tile, 'field');
    tile.setSecondaryTerrainSubtype(terrainSubtypeModel);
}

function assignFieldTerrainSubtype(tile, terrainTypeOverride) {
    let caseNumber = tile.terrain.secondaryTerrainTypeName === 'heath' 
        ? "1-0" 
        : getCaseNumberFromSpriteNumber(calcSpriteNumberByNeighborTiles(tile, tile.getNeighborTiles(), fieldSpriteMatchingCallback));
    let spriteMapping = GetSpriteByTerrainAndCaseNumber(tile, caseNumber, terrainTypeOverride);
    let terrainSubtype = getTerrainSubtypeModel(spriteMapping, 1);
    return terrainSubtype;
}

function assignTerrainSubtype(tile) {
    let neighbors = tile.getNeighborTiles();
    let spriteNumber = calcSpriteNumberByNeighborTiles(tile, neighbors, generalSpriteMatchingCallback);
    let caseNumber = getCaseNumberFromSpriteNumber(spriteNumber, tile.terrain.typeName);
    let spriteMapping = GetSpriteByTerrainAndCaseNumber(tile, caseNumber);
    let terrainSubtype = getTerrainSubtypeModel(spriteMapping, spriteNumber);
    return terrainSubtype;
}

function assignHillsTerrainSubtype(tile) {
    let neighborTiles = tile.getNeighborTiles();
    let spriteNumber = calcSpriteNumberByNeighborTiles(tile, neighborTiles, generalSpriteMatchingCallback);
    let spriteMapping = getSpriteMappingForMountainTerrain(tile, spriteNumber);
    let terrainSubtype = getTerrainSubtypeModel(spriteMapping, spriteNumber);
    return terrainSubtype;
}

function fieldSpriteMatchingCallback(tile, neighborTile) {
    return neighborTile.terrain.typeName === 'hills' || neighborTile.terrain.typeName === 'cliffs' || tile.terrain.secondaryTerrainTypeName !== neighborTile.terrain.secondaryTerrainTypeName;
}

function generalSpriteMatchingCallback(tile, neighborTile) {
    return tile.terrain.typeName !== neighborTile.terrain.typeName;
}

function calcSpriteNumberByNeighborTiles(tile, neighborTiles, matchingCallback) {
    let spriteNumber = neighborTiles.reduce((a, b, i) => 
    b === null || matchingCallback(tile, b)
        ? a + Math.pow(2, i)
        : a + 0,
    0);
    return spriteNumber - 16; //subtract 16 to account for matching on self because getNeighborTiles returns a null for the center (self) tile
}

function getSpriteMappingForMountainTerrain(tile, spriteNumber) {    
    let caseNumber = getCaseNumberFromSpriteNumber(spriteNumber, tile.terrain.typeName);
    return GetSpriteForMountainTerrain(caseNumber, tile.terrain.subtypeName);
}

//tendency toward getting sprites with a lower index in the passed array
function getRandomSpriteFromArray(possibleSprites) {
    var roll = Math.min(Math.floor(possibleSprites.length * Math.random()), Math.floor(possibleSprites.length * Math.random()));
    return "sprite" + possibleSprites[roll];
}

function getTerrainSubtypeModel(spriteMapping, spriteNumber) {
    const spriteName = getRandomSpriteFromArray(spriteMapping.sprites);
    return new TerrainSubtypeModel(spriteMapping.terrainSubtypeName, spriteName, spriteNumber);
}

function getCaseNumberFromSpriteNumber(spriteNumber, terrainTypeName) {
    if (terrainTypeName === 'field') {
        return 0;
    }

    if (spriteNumber === 0) {        
        return 0; //none missing
    } else if (spriteNumber === 1) {
        return 1; //top left missing
    } else if (spriteNumber === 4) {
        return 2; //top right missing 
    } else if ((spriteNumber >= 2 && spriteNumber <= 7)) {
        return 3; //center top or all top missing 
    } else if (spriteNumber === 64) {
        return 4; // bottom left missing
    } else if (spriteNumber === 8 || spriteNumber === 9 || spriteNumber === 65 || (spriteNumber >= 72 && spriteNumber <= 73)) {
        return 5; //center left or all left missing
    } else if (spriteNumber === 68) {
        return 6; // top right and bottom left missing
    } else if ((spriteNumber >= 10 && spriteNumber <= 15) || spriteNumber === 66 || spriteNumber === 67 || (spriteNumber >= 69 && spriteNumber <= 79)) {
        return 7; // all left and all top missing
    } else if (spriteNumber === 256) {
        return 8; //bottom right missing
    } else if (spriteNumber === 257) {
        return 9; // top left and bottom right missing
    } else if (spriteNumber === 32 || spriteNumber === 36 || spriteNumber === 260 || spriteNumber === 288 || spriteNumber === 292) {
        return 10; // all right missing
    } else if (spriteNumber === 33 || spriteNumber === 34 || spriteNumber === 35 || spriteNumber === 37 || spriteNumber === 38 || spriteNumber === 39 || (spriteNumber >= 258 && spriteNumber <= 262) || spriteNumber === 263 || (spriteNumber >= 289 && spriteNumber <= 295)) {
        return 11; // all right and all top missing
    } else if (spriteNumber === 128 || spriteNumber === 192 || spriteNumber === 320 || spriteNumber === 384 || spriteNumber === 448) {
        return 12; // center bottom or all bottom missing
    } else if (spriteNumber === 129 || spriteNumber === 136 || spriteNumber === 137 || spriteNumber === 193 || (spriteNumber >= 200 && spriteNumber <= 201) || spriteNumber === 264 || spriteNumber === 265 || spriteNumber === 321 || spriteNumber === 329 || spriteNumber === 328 || spriteNumber === 385 || spriteNumber === 392 || spriteNumber === 393 || spriteNumber === 449 || (spriteNumber >= 456 && spriteNumber <= 457)) {
        return 13; // all left and all bottom missing
    } else if (spriteNumber === 96 || spriteNumber === 100 || spriteNumber === 132 || spriteNumber === 136 || spriteNumber === 160 || spriteNumber === 164 || spriteNumber === 196 || spriteNumber === 224 || spriteNumber === 228 || spriteNumber === 324 || spriteNumber === 352 || spriteNumber === 356 || spriteNumber === 388 || spriteNumber === 416 || spriteNumber === 420 || spriteNumber === 452 || spriteNumber === 484 || spriteNumber === 480) {
        return 14; // all right and all bottom missing
    } else {
        return 15; // all missing
    }
}


