import {graphicalResources} from '../../main';

    export default function(container, closingFunction, margins){
        const closeTexture = graphicalResources.uiSheet.textures['close'];
        const closer = new PIXI.Sprite.from(closeTexture);
        closer.interactive = true;
        closer.buttonMode = true;
        closer.on('click', () => {
            closingFunction();
        });
        const size = container.getBounds();
        closer.position.set(size.width - margins.x, margins.y);
        closer.height = 24;
        closer.width = 24;
        return closer;
    }
