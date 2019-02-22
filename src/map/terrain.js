import {assignSprite} from './terrain-subtype-selector';
import terrainProperties from './terrain-properties';

export default class Terrain {
    constructor(tile, terrainTypeName) {
        this.tile = tile;
        this.typeName = terrainTypeName;
        this.associatedMountainRange = null;
        this.secondaryTerrainTypeName = null;
        this.hasSecondaryTerrainSubtype = false;
        this.propsSet = false;
    }

    getSpriteId() {
        return this.spriteName;
    }

    setProps() {
        if (this.propsSet) return;
        const props = terrainProperties(this);
        for (let key in props) {
            if (props.hasOwnProperty(key)) {
                this[key] = props[key];
            }
        }
        this.propsSet = true;
    }

    get defenseBonus() {
        if (!this.propsSet) {
            this.setProps();
        }
        return this._defenseBonus;
    }

    set defenseBonus(value) {
        this._defenseBonus = value;
    }

    getSecondaryTerrainSpriteId() {
        return this.secondaryTerrainSpriteName;
    }

    checkHasSecondaryTerrainSubtype() {
        return this.hasSecondaryTerrainSubtype;
    }

    setSecondaryTerrainType(typeName) {
        this.hasSecondaryTerrainSubtype = true;
        this.secondaryTerrainTypeName = typeName;
    }

    setSecondaryTerrainSubtype(terrainSubtypeModel) {
        this.hasSecondaryTerrainSubtype = true;
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