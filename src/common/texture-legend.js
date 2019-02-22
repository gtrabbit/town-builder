import {graphicalResources} from '../main';


export default function(key) {
    const sheet = graphicalResources.uiSheet.textures;
    const legend = {
        "sprite-name": sheet['thing'],
        "food": sheet['bread-small'],
        "wood": sheet['crow-small'],
        "silver": sheet['red-circle'],
        "up-arrow": sheet['up-arrow'],
        "down-arrow": sheet['down-arrow'],
        "frame": sheet['frame'],
        "glass-circle": sheet['glass-circle']
    };
    return new PIXI.Sprite.from(legend[key]);
};