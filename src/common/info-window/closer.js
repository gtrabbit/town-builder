
    export default function(container, closingFunction, style){
        const closer = new PIXI.Text('X', style);
        closer.interactive = true;
        closer.buttonMode = true;
        closer.on('click', () => {
            closingFunction();

        });
        const size = container.getBounds();
        //25 pixels in from the right of the parent container and 5 pixels down
        closer.position.set(size.width - 25, 5);
        return closer;
    }
