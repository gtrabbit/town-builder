import TerrainSubtypeModel from './terrain-subtype-model';
import {GetSpriteByTerrainAndCaseNumber, GetSpriteForMountainTerrain} from './sprite-mappings';


export function assignTerrainSubtype(tile) {
    let neighbors = tile.getNeighborTiles();
    let spriteNumber = calcSpriteNumberByNeighborTiles(tile, neighbors);
    let caseNumber = getCaseNumberFromSpriteNumber(spriteNumber, tile.terrain.typeName);
    let spriteMapping = GetSpriteByTerrainAndCaseNumber(tile.terrain.typeName, caseNumber);
    let terrainSubtype = getTerrainSubtypeModel(spriteMapping, spriteNumber);
    return terrainSubtype;
}

export function getSpriteForNamedSubtype(tile) {
    let neighborTiles = tile.getNeighborTiles();
    let spriteNumber = calcSpriteNumberByNeighborTiles(tile, neighborTiles);
    let spriteMapping = getSpriteMappingForMountainTerrain(tile, spriteNumber);
    console.log(tile, spriteMapping, spriteNumber);
    let terrainSubtype = getTerrainSubtypeModel(spriteMapping, spriteNumber);
    return terrainSubtype;
}

function calcSpriteNumberByNeighborTiles(tile, neighborTiles) {
    let spriteNumber = neighborTiles.reduce((a, b, i) => 
    b === null || b.terrain.typeName !== tile.terrain.typeName
        ? a + Math.pow(2, i)
        : a + 0,
    0);
    return spriteNumber - 16; //subtract 16 to account for matching on self because getNeighborTiles returns a null for the center (self) tile
}

function getSpriteMappingForMountainTerrain(tile, spriteNumber) {    
    let caseNumber = getCaseNumberFromSpriteNumber(spriteNumber, tile.terrain.typeName);
    console.log("caseNumber: " + caseNumber);
    return GetSpriteForMountainTerrain(caseNumber, tile.terrain.subtypeName);
}


function getRandomSpriteFromArray(possibleSprites) {
    return "sprite" + possibleSprites[Math.floor(possibleSprites.length * Math.random())];
}

function getTerrainSubtypeModel(spriteMapping, spriteNumber) {
    const spriteName = getRandomSpriteFromArray(spriteMapping.sprites);
    return new TerrainSubtypeModel(spriteMapping.terrainSubtypeName, spriteName, spriteNumber);
}

function getCaseNumberFromSpriteNumber(spriteNumber, terrainTypeName) {
    if (terrainTypeName === 'field') {
        return 0
    }

    if (spriteNumber === 0) {        
        return 0;
    } else if (spriteNumber === 1) {
        return 1;
    } else if (spriteNumber === 4) {
        return 2;
    } else if ((spriteNumber >= 2 && spriteNumber <= 7)) {
        return 3;
    } else if (spriteNumber === 64) {
        return 4;
    } else if (spriteNumber === 8 || spriteNumber === 9 || spriteNumber === 65 || (spriteNumber >= 72 && spriteNumber <= 73)) {
        return 5;
    } else if (spriteNumber === 68) {
        return 6;
    } else if ((spriteNumber >= 10 && spriteNumber <= 15) || spriteNumber === 66 || spriteNumber === 67 || (spriteNumber >= 69 && spriteNumber <= 79)) {
        return 7;
    } else if (spriteNumber === 256) {
        return 8;
    } else if (spriteNumber === 257) {
        return 9;
    } else if (spriteNumber === 32 || spriteNumber === 36 || spriteNumber === 260 || spriteNumber === 288 || spriteNumber === 292) {
        return 10;
    } else if (spriteNumber === 33 || spriteNumber === 34 || spriteNumber === 35 || spriteNumber === 37 || spriteNumber === 38 || spriteNumber === 39 || (spriteNumber >= 258 && spriteNumber <= 262) || spriteNumber === 263 || (spriteNumber >= 289 && spriteNumber <= 295)) {
        return 11;
    } else if (spriteNumber === 128 || spriteNumber === 192 || spriteNumber === 320 || spriteNumber === 384 || spriteNumber === 448) {
        return 12;
    } else if (spriteNumber === 129 || spriteNumber === 136 || spriteNumber === 137 || spriteNumber === 193 || (spriteNumber >= 200 && spriteNumber <= 201) || spriteNumber === 264 || spriteNumber === 265 || spriteNumber === 321 || spriteNumber === 329 || spriteNumber === 328 || spriteNumber === 385 || spriteNumber === 392 || spriteNumber === 393 || spriteNumber === 449 || (spriteNumber >= 456 && spriteNumber <= 457)) {
        return 13;
    } else if (spriteNumber === 96 || spriteNumber === 100 || spriteNumber === 132 || spriteNumber === 136 || spriteNumber === 160 || spriteNumber === 164 || spriteNumber === 196 || spriteNumber === 224 || spriteNumber === 228 || spriteNumber === 324 || spriteNumber === 352 || spriteNumber === 356 || spriteNumber === 388 || spriteNumber === 416 || spriteNumber === 420 || spriteNumber === 452 || spriteNumber === 484 || spriteNumber === 480) {
        return 14;
    } else {
        return 15;
    }
}


