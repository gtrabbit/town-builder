import {displaySettings} from '../core/settings';
import Tab from '../common/ui-elements/tab';
import TabSet from '../common/ui-elements/tab-set';
import {graphicalResources} from '../main';
import stopClick from '../common/utils/stop-click-bubble-down';
import closer from '../common/ui-elements/closer';
import pop from '../common/animations/generic-pop';

//return a PIXI.Container()
export default class EventBox {
    constructor(displayLayer) {
        this.container = this.createDisplayObject(displayLayer);
    }

    showEventResults(events, turnNumber) {
        //title
        this.title.text = this.title.text.slice(0, 4).concat(turnNumber);
        this.tabSet.tabs[0].setActive();
        


    }

    createDisplayObject(displayLayer, nextAction, previousAction) {
        const xOffset = 100;
        const log = new PIXI.Container();
        log.height = displaySettings.displayHeight;
        log.width = displaySettings.displayWidth;
        const main = new PIXI.Container();
        main.name = "campaign-log__main"
        const fuzzyOverlay = new PIXI.Container();
        
        main.position.set(xOffset, 0);
        main.interactive = true;
        stopClick(main);
        


        //fuzzy overlay
        const fuzzy = new PIXI.Graphics();
        fuzzy.beginFill(0x222222, .6);
        fuzzy.drawRect(0, 0, xOffset, displaySettings.displayHeight);
        fuzzy.endFill();
        
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

        //next / previous buttons
        const nextButton = new PIXI.Sprite.from(graphicalResources.misc.arrow);
        const previousButton = new PIXI.Sprite.from(graphicalResources.misc.arrow);
        resizeButton(nextButton, true);
        resizeButton(previousButton);
        nextButton.position.set(this.title.x + this.title.width + 10, this.title.y);
        previousButton.position.set(this.title.x - 50, this.title.y);
        this.nextButton = nextButton;
        this.previousButton = previousButton;
        this.previousButton.on('click', previousAction);
        this.nextButton.on('click', nextAction);

        //create tabs
        const tabLabels = ['summary', 'events', 'militia', 'resources', 'population'];
        const tabHeight = 64;
        const tabWidth = 32;
        const tabs = tabLabels.map(l => new Tab(l, tabWidth, tabHeight));

        this.tabSet = new TabSet(tabs);
        this.main = main;

        //create closer
        const closeFunction = () => {
            displayLayer.removeChild(log);
        }
        const closerUi = closer(main, closeFunction);
        fuzzy.on('click', closeFunction);

        //add children in desired order
        log.addChild(main, fuzzyOverlay);
        displayLayer.addChild(log);

        fuzzyOverlay.addChild(fuzzy);

        main.addChild(this.title, nextButton, previousButton, closerUi);
        
        tabs.forEach((a, i) => {
            main.addChild(a.container);
            a.setPosition(2, i * tabHeight);        
        });

        //return
        return log;

    }
}

function resizeButton(button, rotate) {
    button.height = 16;
    button.width = 16;
    button.anchor.set(0.5, 0.5);
    button.rotation = rotate ? Math.PI : 0;
    button.interactive = true;
    button.buttonMode = true;
    pop(button);
}