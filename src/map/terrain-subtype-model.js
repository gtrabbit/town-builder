export default class TerrainSubtypeModel {
    constructor(subtypeName, spriteName, spriteIndex) {
        this.subtypeName = subtypeName;
        this.spriteName = spriteName;
        this.spriteIndex = spriteIndex;
    }

    makeMeAField() {
        this.subtypeName = 'field';
        this.spriteName = "sprite76";
        this.spriteIndex = 1;
    }
}