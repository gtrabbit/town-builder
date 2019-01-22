import {displaySettings} from '../../core/settings';

    export default function makeTextBox(message) {

        let container = new PIXI.Container();

        let border = new PIXI.Graphics();
        border.beginFill(0x999999, 1);
        border.lineStyle(1, 0xDDDDDD, 1, 0);
        border.drawRect(0, 0, displaySettings.displayWidth, 3);
        border.endFill();


        let textBox = PIXI.mySprites.parchment;
        textBox.height = 128;
        textBox.width = displaySettings.displayWidth;
        
        message.position.set(20, 15);
        textBox.interactive = true;
        textBox.on('click', stopClickEvents);

        function stopClickEvents(event) {
            event.stopPropagation();
            event.reset();
        }
        container.addChild(textBox, message, border);
        return container;
    }
