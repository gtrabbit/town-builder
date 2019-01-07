const spriteMappings = {
    'field': {
        0: {terrainSubtypeName: "plains", sprites:["1"]},
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
            "1-0":{terrainSubtypeName: "ridge-vertical-heights", sprites:["288"]},
            "1-1":{terrainSubtypeName: "ridge-vertical-edge", sprites:["255"]},
            "1-2":{terrainSubtypeName: "ridge-vertical-edge", sprites:["256"]},
            "1-3":{terrainSubtypeName: "ridge-vertical-edge", sprites:["255"]},
            "1-4":{terrainSubtypeName: "ridge-vertical-edge", sprites:["325"]},
            "1-5":{terrainSubtypeName: "ridge-vertical-edge", sprites:["258"]},
            "1-6":{terrainSubtypeName: "ridge-vertical-edge", sprites:["221"]},
            "1-7":{terrainSubtypeName: "ridge-vertical-edge", sprites:["258"]},
            "1-8":{terrainSubtypeName: "ridge-vertical-edge", sprites:["325"]},
            "1-9":{terrainSubtypeName: "ridge-vertical-edge", sprites:["223"]},
            "1-10":{terrainSubtypeName: "ridge-vertical-edge", sprites:["289"]},
            "1-11":{terrainSubtypeName: "ridge-vertical-edge", sprites:["259"]},
            "1-12":{terrainSubtypeName: "ridge-vertical-edge", sprites:["325"]},
            "1-13":{terrainSubtypeName: "ridge-vertical-edge", sprites:["327"]},
            "1-14":{terrainSubtypeName: "ridge-vertical-edge", sprites:["326"]},
            "1-15":{terrainSubtypeName: "ridge-vertical-edge", sprites:["80"]},
            "2-0":{terrainSubtypeName: "ridge-backwardDiagonal-heights", sprites:["257"]},
            "3-0":{terrainSubtypeName: "ridge-backwardDiagonal-heights", sprites:["290"]},
            "4-1": {terrainSubtypeName: "eastSlope-edge", sprites:["259"]},
            "5-1":{terrainSubtypeName: "westSlope-edge", sprites:["291"]},
        },
        'slope': {
            "0-0": {terrainSubtypeName: "eastSlope-heights", sprites:["193"]},
            "1-0":{terrainSubtypeName: "westSlope-heights", sprites:["192"]},
            "1-1": {terrainSubtypeName: "westSlope-edge", sprites:["156"]},
            "0-2": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "0-3": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "1-3": {terrainSubtypeName: "westSlope-edge", sprites:["156"]},
            "1-4": {terrainSubtypeName: "westSlope-edge", sprites:["192"]},
            "0-4": {terrainSubtypeName: "westSlope-edge", sprites:["192"]},
            "1-5": {terrainSubtypeName: "westSlope-edge", sprites:["191"]},
            "1-6": {terrainSubtypeName: "westSlope-edge", sprites:["296"]},
            "0-6": {terrainSubtypeName: "eastSlope-edge", sprites:["296"]},
            "1-7": {terrainSubtypeName: "westSlope-edge", sprites:["155"]},
            "0-8": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "1-8": {terrainSubtypeName: "eastSlope-edge", sprites:["193"]},
            "0-9": {terrainSubtypeName: "eastSlope-edge", sprites:["263"]},
            "1-9": {terrainSubtypeName: "westSlope-edge", sprites:["263"]},
            "0-10": {terrainSubtypeName: "eastSlope-edge", sprites:["194"]},
            "0-11": {terrainSubtypeName: "eastSlope-edge", sprites:["158"]},
            "1-12": {terrainSubtypeName: "westSlope-edge", sprites:["225"]},
            "0-12": {terrainSubtypeName: "eastSlope-edge", sprites:["226"]},
            "1-13": {terrainSubtypeName: "westSlope-edge", sprites:["224"]},
            "0-14": {terrainSubtypeName: "eastSlope-edge", sprites:["227"]},
            "0-15": {terrainSubtypeName: "westSlope-edge", sprites:["263"]},
            "1-15": {terrainSubtypeName: "westSlope-edge", sprites:["263"]}
        }
        

    }
}

export function GetSpriteByTerrainAndCaseNumber(terrainTypeName, caseNumber) {
    return spriteMappings[terrainTypeName][caseNumber];
}

export function GetSpriteForMountainTerrain(caseNumber, terrainSubtypeName) {
    let ridgeKey = null;
    if (terrainSubtypeName.slice(0, 5) === "ridge") {
        ridgeKey = 'ridge';
        caseNumber = mutateCaseNumberByRidgeType(caseNumber, terrainSubtypeName);
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
    if (caseNumber === 0) {
        switch(terrainSubtypeName) {
            case "ridge-forwardDiagonal":
                return "3-" + caseNumber;
            case "ridge-backwardDiagonal":
                return "2-" + caseNumber;
            case "ridge-vertical":
                return "1-" + caseNumber;
        }
    } else {
        switch(terrainSubtypeName) {
            case "ridge-eastSlope":
                return "4-1";
            case "ridge-westSlope":
                return "5-1";
            default:
                return "1-" + caseNumber;
        }
        
    }
}
