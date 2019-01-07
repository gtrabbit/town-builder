    export default function(tile){
 
        let ui = new PIXI.Container();       

        const width = tile.squareSize;
        const height = tile.squareSize;

        let uiTexture;
 

        let spriteId = tile.getSpriteId();

        if (spriteId) {
            uiTexture = PIXI.mySpritesheet.textures[spriteId];
        } else {
            console.log("no sprite Id", tile);
            switch (tile.terrain.typeName) {
                case 'field':
                    uiTexture = PIXI.mySpritesheet.textures['sprite1']; //yellowish
                    break;
    
                case 'forest':
                    uiTexture = PIXI.mySpritesheet.textures['sprite282']; //greenish
                    break;
    
                case 'hills':
                    uiTexture = PIXI.mySpritesheet.textures['sprite226'];  //brown-grey
                    break;
            }
        }
        let underSpriteName = tile.terrain !== 'field' && tile.terrainSecondary === 'field'
            ? PIXI.mySpritesheet.textures['sprite76']
            : PIXI.mySpritesheet.textures['sprite76'];



        // // uncomment if we want to see the outlines...
        // square.beginFill(0x72613d);
        // square.lineStyle(1, 0x000, 1);
        // square.drawRect(0, 0, height, width);
        // square.endFill();
        let underSprite = new PIXI.Sprite(underSpriteName);
        underSprite.height = height;
        underSprite.width = width;
        let sprite = new PIXI.Sprite(uiTexture);
        sprite.height = height;
        sprite.width = width;
    //     sprite.x = -27;
    //     sprite.y = -17;

    // //    const tileHitArea = new PIXI.Polygon(0, height / 2, width / 2, 0, width, height / 2, width / 2, height);
    // //    ui.hitArea = tileHitArea;
        underSprite.tint = 0x777777;
        ui.addChild(underSprite, sprite);

        ui.sortOrder = tile.UID;

        ui.x = tile.x * width;
        ui.y = tile.y * height;
        ui.name = 'tileContainer - ' + tile.UID;

         return ui;
    }
