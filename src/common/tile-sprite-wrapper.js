export default class TileSpriteWrapper {
    constructor(container, primarySprite, secondarySprite) {
        this.container = container;
        this.primarySprite = primarySprite;
        this.secondarySprite = secondarySprite;
        this.x = container.x;
        this.y = container.y;
        this.previousTints = [];
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

    illumine() {
        this.container.children.forEach(sprite => {sprite.tint = 0xDDDDDD;});
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