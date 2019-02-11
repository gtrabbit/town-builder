import closerButton from '../../../assets/close-button.png';

    export default function(container, closingFunction){
        const closer = new PIXI.Sprite.fromImage(closerButton);
        closer.interactive = true;
        closer.buttonMode = true;
        closer.on('click', () => {
            closingFunction();

        });
        const size = container.getBounds();
        closer.position.set(size.width - 32, 8);
        closer.height = 24;
        closer.width = 24;
        return closer;
    }
