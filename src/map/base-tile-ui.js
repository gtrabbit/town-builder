import TileSpriteWrapper from '../common/tile-sprite-wrapper';
import {graphicalResources} from '../main';

export default function(tile){
 
        let container = new PIXI.Container();
        const width = tile.squareSize;
        const height = tile.squareSize;

        
        // // uncomment if we want to see the outlines...
        // square.beginFill(0x72613d);
        // square.lineStyle(1, 0x000, 1);
        // square.drawRect(0, 0, height, width);
        // square.endFill();


        let spriteId = tile.getSpriteId();
        let uiTexture = graphicalResources.tileSheet.textures[spriteId];
        let sprite = new PIXI.Sprite(uiTexture);
        sprite.height = height;
        sprite.width = width;
        let underSprite;

        if (tile.terrain.checkHasSecondaryTerrainSubtype()) {
            let underSpriteName = tile.getSecondaryTerrainSpriteId();
            let underSpriteTexture = graphicalResources.tileSheet.textures[underSpriteName];
            underSprite = new PIXI.Sprite(underSpriteTexture);
            underSprite.height = height;
            underSprite.width = width;
            container.addChild(underSprite);
        }

        container.addChild(sprite);
        container.sortOrder = tile.UID;
        container.x = tile.x * width;
        container.y = tile.y * height;
        container.name = 'tileContainer - ' + tile.UID;
        let spriteWrapper = new TileSpriteWrapper(container, sprite, underSprite);

        return spriteWrapper;
    }
