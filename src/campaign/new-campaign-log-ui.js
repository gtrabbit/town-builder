import {displaySettings} from '../core/settings';
import Tab from '../common/ui-elements/tab';
import TabSet from '../common/ui-elements/tab-set';
import {graphicalResources} from '../main';
import stopClick from '../common/utils/stop-click-bubble-down';
import closer from '../common/ui-elements/closer';

//return a PIXI.Container()
export default class EventBox {
    constructor(displayLayer) {
        this.container = this.createDisplayObject(displayLayer);
    }

    showEventResults(events, turnNumber) {
        //title
        this.title.text = this.title.text.slice(0, 4).concat(turnNumber);

    }

    createDisplayObject(displayLayer) {
        const xOffset = 100;
        const log = new PIXI.Container();
        log.height = displaySettings.displayHeight;
        log.width = displaySettings.displayWidth;
        const main = new PIXI.Container();
        main.name = "campaign-log__main"
        const fuzzyOverlay = new PIXI.Container();
        log.addChild(main, fuzzyOverlay);
        main.position.set(xOffset, 0);
        main.interactive = true;
        stopClick(main);
        


        //fuzzy overlay
        const fuzzy = new PIXI.Graphics();
        fuzzy.beginFill(0x222222, .6);
        fuzzy.drawRect(0, 0, xOffset, displaySettings.displayHeight);
        fuzzy.endFill();
        fuzzyOverlay.addChild(fuzzy);
        fuzzy.interactive = true;
        stopClick(fuzzy);
            
        //main background image
        const backing = new PIXI.Sprite.from(graphicalResources.misc.parchment);
        backing.width = displaySettings.displayWidth - xOffset;
        backing.height = displaySettings.displayHeight;
        main.addChild(backing);
    
        //set title
        this.title = new PIXI.Text(`Day `);
        this.title.pivot.set(this.title.width / 2, this.title.height / 2);
        this.title.position.set(main.width / 2, 25);

        //create closer
        const closeFunction = () => {
            displayLayer.removeChild(log);
        }
        const closerUi = closer(log, closeFunction);
        log.addChild(closerUi);    
        fuzzy.on('click', closeFunction);
    
        //create tabs
        const tabLabels = ['summary', 'events', 'militia', 'resources', 'population'];
        const tabHeight = 64;
        const tabWidth = 32;
        const tabs = tabLabels.map(l => new Tab(l, tabWidth, tabHeight));
        tabs.forEach((a, i) => {
            main.addChild(a.container);
            a.setPosition(2, i * tabHeight);        
        });
        this.tabSet = new TabSet(tabs);
        this.main = main;
        this.main.addChild(this.title);
        displayLayer.addChild(log);
        return log;
    }
}