import {assignSprite} from './terrain-subtype-selector';

export default class Terrain {
    constructor(tile, terrainTypeName) {
        this.tile = tile;
        this.typeName = terrainTypeName;
        this.associatedMountainRange = null;
        this.secondaryTerrainTypeName = null;
    }

    getSpriteId() {
        return this.spriteName;
    }

    getSecondaryTerrainSpriteId() {
        return this.secondaryTerrainSpriteName;
    }

    setSecondaryTerrainType(typeName) {
        this.secondaryTerrainTypeName = typeName;
    }

    setSecondaryTerrainSubtype(terrainSubtypeModel) {
        this.secondaryTerrainSpriteName = terrainSubtypeModel.spriteName;
        this.secondaryTerrainSpriteIndex = terrainSubtypeModel.spriteIndex;
        this.secondaryTerrainSubtypeName = terrainSubtypeModel.subtypeName;
    }

    setSubtypeName(name) {
        this.subtypeName = name;
    }

    //determine if we need to set the subtype first
    canSetSprite() {
        return (this.subtypeName && !this.spriteIndex);
    }

    setSprite(terrainSubtypeModel) {
        if (!terrainSubtypeModel) {
            terrainSubtypeModel = assignSprite(this.tile);
        }
        this.spriteIndex = terrainSubtypeModel.spriteIndex;
        let wasChange = this.spriteName && this.spriteName !== terrainSubtypeModel.spriteName;
        this.spriteName = terrainSubtypeModel.spriteName;
        return wasChange;
    }

    setSubtype() {
        var subtype = assignSprite(this.tile);
        this.subtypeName = subtype.subtypeName;
        return this.setSprite(subtype);
    }
}