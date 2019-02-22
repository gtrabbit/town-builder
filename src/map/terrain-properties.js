const terrainProps = {
    "field": {
        "heath": {
            canBuild: (buildingType) => true,
            defenseBonus: 0,
            dangerModifier: 1
        },
        "field": {
            canBuild: (buildingType) => true,
            defenseBonus: 1,
            dangerModifier: 0
        },
        "field-edge": {
            canBuild: (buildingType) => true,
            defenseBonus: 0,
            dangerModifier: 2
        }
    },
    "forest": {
        "deep": {
            canBuild: (buildingType) => ['cabin', 'lumber-mill'].includes(buildingType),
            defenseBonus: 0,
            dangerModifier: 5
        },
        "edge": {
            canBuild: (buildingType) => ['cabin', 'lumber-mill'].includes(buildingType),
            defenseBonus: 0,
            dangerModifier: 4
        },
        "grove": {
            canBuild: (buildingType) => true,
            defenseBonus: 0,
            dangerModifier: 3
        }
    },
    "cliffs": {
        "plateau": {
            canBuild: (buildingType) => true,
            defenseBonus: 0,
            dangerModifier: 0
        },
        "cliff-face": {
            canBuild: (buildingType) => ['mine'].includes(buildingType),
            defenseBonus: 5,
            dangerModifier: 0
        },
        "cliff-base": {
            canBuild: (buildingType) => ['mine'].includes(buildingType),
            defenseBonus: 3,
            dangerModifier: 1
        }
    }
}

export default function(terrain, prop) {
    if (prop) {
        return terrainProps[terrain.typeName][terrain.subtypeName][prop];
    }
    return terrainProps[terrain.typeName][terrain.subtypeName];
}


