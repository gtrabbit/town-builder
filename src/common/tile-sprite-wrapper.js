import textureLegend from './texture-legend';

export default class TileSpriteWrapper {
    constructor(container, primarySprite, secondarySprite) {
        this.container = container;
        this.primarySprite = primarySprite;
        this.secondarySprite = secondarySprite;
        this.x = container.x;
        this.y = container.y;
        this.previousTints = [];
        this.dangerIndicator = null
    }

    getContainer() {
        return this.container;
    }

    highlight(tint) {
        this.container.children.forEach(sprite => {
            this.previousTints.push(sprite.tint);
            sprite.tint = tint;
        })
    }

    removeHighlight() {
        this.container.children.forEach(sprite => {
            sprite.tint = this.previousTints.pop();
        });
    }

    destroy() {
        this.container.destroy({children: true});
    }

    dim() {
        this.container.children.forEach(sprite => {sprite.tint = 0x777777;});
    }

    illumine(isCivicTile) {
        const value = isCivicTile ? 0xFFFFFF : 0xBBBBBB;
        this.container.children.forEach(sprite => { if(!sprite.skipIllumine) sprite.tint = value;});
    }

    setTintForTileByCurrentThreat(currentThreat) {
        const alphaValue = 1 / Math.max((32 - Math.max(currentThreat, 0)), 1);

        if (alphaValue > 0.1) {
            if (!this.dangerIndicator) {
                this.dangerIndicator = textureLegend('glass-circle');
                this.dangerIndicator.skipIllumine = true;
                this.dangerIndicator.height = this.container.height;
                this.dangerIndicator.width = this.container.width;
                this.dangerIndicator.tint = 0x8B1111;
                this.container.addChild(this.dangerIndicator);
            }
            this.dangerIndicator.alpha = alphaValue;
        } 
    }

    enableInteraction() {
        this.primarySprite.interactive = true;
    }

    addOneTimeEventListener(eventName, callback, buttonMode) {
        this.enableInteraction();
        this.primarySprite.buttonMode = buttonMode; //something to turn this off?
        this.primarySprite.once(eventName, callback);
    }

    addEventListener(eventName, callback, buttonMode) {
        this.enableInteraction();
        this.primarySprite.buttonMode = buttonMode;
        this.primarySprite.on(eventName, callback)
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.container.x = x;
        this.container.y = y;
    }
}