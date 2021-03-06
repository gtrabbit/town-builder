import uiWrapper from '../../../common/tile-sprite-wrapper';
import {graphicalResources} from '../../../main';

    export default function(tile, level){
        const spriteWrapper = new PIXI.Container();
        const mapTexture = graphicalResources.tileSheet.textures["sprite476"];
        let mapSprite = new PIXI.Sprite(mapTexture);
        mapSprite.width = Math.floor(tile.squareSize * 0.6);
        mapSprite.height = Math.floor(tile.squareSize * 0.8);
        mapSprite.position.set(tile.squareSize * 0.3, tile.squareSize * 0.1);
        spriteWrapper.addChild(mapSprite);
        const uiObject = new uiWrapper(spriteWrapper, mapSprite);
        return uiObject;
    }
