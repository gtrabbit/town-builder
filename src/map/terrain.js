import {assignTerrainSubtype} from './terrain-subtype-selector';
import {getSpriteForNamedSubtype} from './terrain-subtype-selector';

export default class Terrain {
    constructor(tile, terrainTypeName) {
        this.tile = tile;
        this.typeName = terrainTypeName;
        this.associatedMountainRange = null;
    }

    getSpriteId() {
        return this.spriteName;
    }

    setSubtypeName(name) {
        this.subtypeName = name;
    }

    //determine if we need to set the subtype first
    canSetSprite() {
        return !!this.subtypeName && !this.spriteIndex;
    }

    setSprite() {
        var spriteInfo = getSpriteForNamedSubtype(this.tile);
        this.spriteIndex = spriteInfo.spriteIndex;
        this.spriteName = spriteInfo.spriteName;
    }

    setSubtype() {
        var subtype = assignTerrainSubtype(this.tile);
        this.subtypeName = subtype.subtypeName;
        this.spriteName = subtype.spriteName;
        this.spriteIndex = subtype.spriteIndex;
    }
}