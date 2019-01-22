import CaseNumberHandler from './case-number-handler';

const caseNumberHandler = new CaseNumberHandler();

const spriteMappings = {
    'field': {
        "1-0": {terrainSubtypeName: "heath", sprites:["1", "1", "3", "2"]},
        0: {terrainSubtypeName: "field", sprites:["76", "76", "76", "41", "42", "80", "81"]},
        1: {terrainSubtypeName: "field-edge", sprites:["39"]},
        2: {terrainSubtypeName: "field-edge", sprites:["40"]},
        3: {terrainSubtypeName: "field-edge", sprites:["37"]},
        4: {terrainSubtypeName: "field-edge", sprites:["78"]},
        5: {terrainSubtypeName: "field-edge", sprites:["75"]},
        6: {terrainSubtypeName: "field-edge", sprites:["118"]},
        7: {terrainSubtypeName: "field-edge", sprites:["36"]},
        8: {terrainSubtypeName: "field-edge", sprites:["79"]},
        9: {terrainSubtypeName: "field-edge", sprites:["117"]},
        10: {terrainSubtypeName: "field-edge", sprites:["77"]},
        11: {terrainSubtypeName: "field-edge", sprites:["38"]},
        12: {terrainSubtypeName: "field-edge", sprites:["115"]},
        13: {terrainSubtypeName: "field-edge", sprites:["114"]},
        14: {terrainSubtypeName: "field-edge", sprites:["116"]},
        15: {terrainSubtypeName: "heath", sprites:["1"]},

    },
    'forest': {
        0: {terrainSubtypeName: "deep", sprites: ["253", "286", "282"]},
        1: {terrainSubtypeName: "edge", sprites: ["251"]},
        2: {terrainSubtypeName: "edge", sprites:["252"]},
        3: {terrainSubtypeName: "edge", sprites:["249"]},
        4: {terrainSubtypeName: "edge", sprites:["284"]},
        5: {terrainSubtypeName: "edge", sprites:["281"]},
        6: {terrainSubtypeName: "edge", sprites:["322"]},
        7: {terrainSubtypeName: "edge", sprites:["248"]},
        8: {terrainSubtypeName: "edge", sprites:["285"]},
        9: {terrainSubtypeName: "edge", sprites:["321"]},
        10: {terrainSubtypeName: "edge", sprites:["283"]},
        11: {terrainSubtypeName: "edge", sprites:["250"]},
        12: {terrainSubtypeName: "edge", sprites:["319"]},
        13: {terrainSubtypeName: "edge", sprites:["318"]},
        14: {terrainSubtypeName: "edge", sprites:["320"]},
        15: {terrainSubtypeName: "grove", sprites:["254", "287"]}
    },
    'cliffs': {
        0: {terrainSubtypeName: "plateau", sprites:["1"]},
        1: {terrainSubtypeName: "cliff-face", sprites:["353"]},
        2: {terrainSubtypeName: "cliff-face", sprites:["354"]},
        3: {terrainSubtypeName: "cliff-face", sprites:["351"]},
        4: {terrainSubtypeName: "cliff-face", sprites:["393"]},
        5: {terrainSubtypeName: "cliff-face", sprites:["390"]},
        6: {terrainSubtypeName: "cliff-face", sprites:["429"]},
        7: {terrainSubtypeName: "cliff-face", sprites:["350"]},
        8: {terrainSubtypeName: "cliff-face", sprites:["394"]},
        9: {terrainSubtypeName: "cliff-face", sprites:["428"]},
        10: {terrainSubtypeName: "cliff-face", sprites:["392"]},
        11: {terrainSubtypeName: "cliff-face", sprites:["352"]},
        12: {terrainSubtypeName: "cliff-face", sprites:["426"]},
        13: {terrainSubtypeName: "cliff-face", sprites:["425"]},
        14: {terrainSubtypeName: "cliff-face", sprites:["427"]},
        15: {terrainSubtypeName: "cliff-base", sprites:["391"]}
    },
    'hills': {
        'ridge': {
            "0-14":{terrainSubtypeName: "ridge-vertical-edge", sprites:["326"]},
            "1-0":{terrainSubtypeName: "ridge-vertical-heights", sprites:["288"]},
            "1-1":{terrainSubtypeName: "ridge-vertical-edge", sprites:["255"]},
            "1-2":{terrainSubtypeName: "ridge-vertical-edge", sprites:["288"]},
            "1-3":{terrainSubtypeName: "ridge-vertical-edge", sprites:["255"]},
            "1-4":{terrainSubtypeName: "ridge-vertical-edge", sprites:["288"]},
            "1-5":{terrainSubtypeName: "ridge-vertical-edge", sprites:["258"]},
            "1-6":{terrainSubtypeName: "ridge-vertical-edge", sprites:["221"]},
            "1-7":{terrainSubtypeName: "ridge-vertical-edge", sprites:["258"]},
            "1-8":{terrainSubtypeName: "ridge-vertical-edge", sprites:["288"]},
            "1-9":{terrainSubtypeName: "ridge-vertical-edge", sprites:["223"]},
            "1-10":{terrainSubtypeName: "ridge-vertical-edge", sprites:["289"]},
            "1-11":{terrainSubtypeName: "ridge-vertical-edge", sprites:["256"]},
            "1-12":{terrainSubtypeName: "ridge-vertical-edge", sprites:["325"]},
            "1-13":{terrainSubtypeName: "ridge-vertical-edge", sprites:["327"]},
            "1-14":{terrainSubtypeName: "ridge-vertical-edge", sprites:["326"]},
            "1-15":{terrainSubtypeName: "ridge-vertical-edge", sprites:["1"]},
            "2-0":{terrainSubtypeName: "ridge-backwardDiagonal-heights", sprites:["257"]},
            "2-1":{terrainSubtypeName: "ridge-backwardDiagonal-edge", sprites:["258"]},
            "2-2":{terrainSubtypeName: "ridge-backwardDiagonal-edge", sprites:["328"]},
            "3-0":{terrainSubtypeName: "ridge-forwardDiagonal-heights", sprites:["290"]},
            "3-1":{terrainSubtypeName: "ridge-forwardDiagonal-edge", sprites:["292"]},
            "3-2":{terrainSubtypeName: "ridge-forwardDiagonal-edge", sprites:["327"]},
            "4-0":{terrainSubtypeName: "ridge-eastSlope-heights", sprites:["160"]},
            "4-1": {terrainSubtypeName: "eastSlope-edge", sprites:["259"]},
            "4-8":{terrainSubtypeName: "ridge-eastSlope-heights", sprites:["160"]},
            "5-0":{terrainSubtypeName:"ridge-westSlope-heights", sprites:["159","159", "195"]},
            "5-1":{terrainSubtypeName: "westSlope-edge", sprites:["291"]},
            "5-8":{terrainSubtypeName:"ridge-westSlope-heights", sprites:["159","159", "195"]},

        },
        'slope': {
            "0-0": {terrainSubtypeName: "eastSlope-heights", sprites:["193"]},
            "0-2": {terrainSubtypeName: "eastSlope-edge", sprites:["193", "196"]},
            "0-3": {terrainSubtypeName: "eastSlope-edge", sprites:["157"]},
            "0-4": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "0-6": {terrainSubtypeName: "eastSlope-edge", sprites:["296"]},
            "0-8": {terrainSubtypeName: "eastSlope-edge", sprites:["193", "196"]},            
            "0-9": {terrainSubtypeName: "eastSlope-edge", sprites:["263"]},
            "0-10": {terrainSubtypeName: "eastSlope-edge", sprites:["194"]},
            "0-11": {terrainSubtypeName: "eastSlope-edge", sprites:["158"]},            
            "0-12": {terrainSubtypeName: "eastSlope-edge", sprites:["226"]},
            "0-14": {terrainSubtypeName: "eastSlope-edge", sprites:["227"]},
            "0-15": {terrainSubtypeName: "westSlope-edge", sprites:["1"]},
            "1-0": {terrainSubtypeName: "westSlope-heights", sprites:["192"]},
            "1-1": {terrainSubtypeName: "westSlope-edge", sprites:["192"]},
            "1-3": {terrainSubtypeName: "westSlope-edge", sprites:["156"]},
            "1-4": {terrainSubtypeName: "westSlope-edge", sprites:["192"]},
            "1-5": {terrainSubtypeName: "westSlope-edge", sprites:["191"]},
            "1-6": {terrainSubtypeName: "westSlope-edge", sprites:["296"]},
            "1-7": {terrainSubtypeName: "westSlope-edge", sprites:["155"]},
            "1-8": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "1-9": {terrainSubtypeName: "westSlope-edge", sprites:["263"]},
            "1-12": {terrainSubtypeName: "westSlope-edge", sprites:["225"]},
            "1-13": {terrainSubtypeName: "westSlope-edge", sprites:["224"]},
            "1-14": {terrainSubtypeName: "eastSlope-edge", sprites:["227"]},
            "1-15": {terrainSubtypeName: "westSlope-edge", sprites:["1"]}
        }
    }
}

export function GetSpriteByTerrainAndCaseNumber(tile, caseNumber, terrainTypeOverride) {
    let terrainTypeName = terrainTypeOverride || tile.terrain.typeName;
    if (terrainTypeName === 'hills') {
        return GetSpriteForMountainTerrain(caseNumber, tile.terrain.subtypeName);
    }
    return spriteMappings[terrainTypeName][caseNumber];
}

export function GetSpriteForMountainTerrain(caseNumber, terrainSubtypeName) {
    let ridgeKey = null;
    if (terrainSubtypeName.slice(0, 5) === "ridge") {
        caseNumber = mutateCaseNumberByRidgeType(caseNumber, terrainSubtypeName);
        if (caseNumber.slice(0, 2) === "--") { //special handling for near-ridge tiles that land near edges
            ridgeKey = 'slope';
            caseNumber = mutateCaseNumberBySlopeDirection(caseNumber.slice(2), terrainSubtypeName.slice(6));
        } else {
            ridgeKey =  'ridge';
        }
    } else {
        ridgeKey = 'slope';
        caseNumber = mutateCaseNumberBySlopeDirection(caseNumber, terrainSubtypeName);
    }
    
    const spriteMapping = spriteMappings['hills'][ridgeKey][caseNumber];
    return spriteMapping ? spriteMapping : {terrainSubtypeName: "plains", sprites:["1"]};
}

function mutateCaseNumberBySlopeDirection(caseNumber, terrainSubtypeName) {
    switch(terrainSubtypeName) {
        case "westSlope":
            return "1-" + caseNumber;
        case "eastSlope":
        default:
            return "0-" + caseNumber;
        
    }
}

function mutateCaseNumberByRidgeType(caseNumber, terrainSubtypeName) {
    let casePrefix = "";
        switch(terrainSubtypeName) {
            case "ridge-forwardDiagonal":
                casePrefix = "3-";
                caseNumber = caseNumberHandler.hasBreakingBorderOnBottom(caseNumber)
                    ? 2
                    : 0;
                break;
            case "ridge-backwardDiagonal":
                casePrefix = "2-";
                caseNumber = caseNumberHandler.hasBreakingBorderOnBottom(caseNumber)
                    ? 2
                    : 0;
                break;
            case "ridge-vertical":
                casePrefix = "1-";
                break;
            case "ridge-eastSlope":
                if (caseNumber !== caseNumberHandler.BottomRightMissing && caseNumber > 4) {
                    casePrefix = "--";
                } else {
                    casePrefix = "4-";
                    caseNumber = 0;
                }
                break;
            case "ridge-westSlope":
                if (caseNumber !== caseNumberHandler.NoneMissing && caseNumber !== caseNumberHandler.BottomRightMissing) {
                    casePrefix = "--";
                } else {
                    casePrefix = "5-";
                    caseNumber = 0;
                }
                break;
            default:
                casePrefix = "1-";
                break;
        }
    return casePrefix + caseNumber;
}
