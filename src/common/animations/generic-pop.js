export default function setPopOnMouseover(displayObject) {
    displayObject.on('mouseover', scaleUp);
    displayObject.on('mouseout', scaleDown);
}

function pop(displayObject, reset) {
    if (reset) {
        displayObject.scale.set(displayObject.previousScaleX, displayObject.previousScaleY);
        return;
    }
    displayObject.previousScaleX = displayObject.scale.x;
    displayObject.previousScaleY = displayObject.scale.y
    let pop = displayObject.scale.x * 1.1;
    displayObject.scale.set(pop, pop);
}

function scaleUp(event) {
    pop(event.target, false);
}

function scaleDown(event) {
    pop(event.currentTarget, true);
}