export default class Pop {
    constructor(textWrapper, factor, startEvent, endEvent) {
        this.startEvent = startEvent || 'mouseover';
        this.endEvent = endEvent || 'mouseout';
        this.previousScaleX = textWrapper.ui.scale.x;
        this.previousScaleY = textWrapper.ui.scale.y;
        this.displayObject = textWrapper.ui;
        this.displayObject.on(this.startEvent, scaleUp);
        this.displayObject.on(this.endEvent, scaleDown);
        this.factor = factor ? (factor * 0.1) + 1 : 1.1;
    }

    scaleUp() {
        this.displayObject.scale.set(this.previousScaleX * factor, this.previousScaleY * factor);
    }

    scaleDown() {
        this.displayObject.scale.set(this.previousScaleX, this.previousScaleY);
    }


}