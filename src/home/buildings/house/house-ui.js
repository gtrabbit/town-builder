import uiWrapper from '../../../common/tile-sprite-wrapper';
    export default function(tile, level){
        const spriteWrapper = new PIXI.Container();
        const mapTexture = PIXI.tileSheet.textures["sprite434"];
        let mapSprite = new PIXI.Sprite(mapTexture);
        mapSprite.width = Math.floor(tile.squareSize * 0.7);
        mapSprite.height = Math.floor(tile.squareSize * 0.7);
        spriteWrapper.addChild(mapSprite);
        const uiObject = new uiWrapper(spriteWrapper, mapSprite);
        return uiObject;
    }
