import {displaySettings} from '../../core/settings';
import {graphicalResources} from '../../main';
import stopClick from '../../common/utils/stop-click-bubble-down';
import { Sprite } from 'pixi.js';

    export default function makeTextBox(message) {

        let container = new PIXI.Container();

        let border = new PIXI.Graphics();
        border.beginFill(0x999999, 1);
        border.lineStyle(1, 0xDDDDDD, 1, 0);
        border.drawRect(0, 0, displaySettings.displayWidth, 3);
        border.endFill();

        let textBox = new Sprite.from(graphicalResources.uiSheet.textures['page']);
        textBox.anchor.set(0,0);
        textBox.height = message.height + 15;
        textBox.width = displaySettings.displayWidth + 36;
        textBox.x = -12;
        
        message.position.set(20, 15);
        textBox.interactive = true;
        stopClick(textBox);

        container.addChild(textBox, message, border);
        return container;
    }
