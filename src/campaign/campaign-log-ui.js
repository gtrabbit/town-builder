import {displaySettings} from '../core/settings';
import Tab from '../common/ui-elements/tab';
import TabSet from '../common/ui-elements/tab-set';
import {graphicalResources} from '../main';
import stopClick from '../common/utils/stop-click-bubble-down';
import closer from '../common/ui-elements/closer';
import pop from '../common/animations/generic-pop';
import TabOrganizer from './tab-content-organizer';


//return a PIXI.Container()
export default class EventBox {
    constructor(displayLayer, nextAction, previousAction, tabsetConfig) {
        this.container = this.createDisplayObject(displayLayer, nextAction, previousAction, tabsetConfig);
        this.tabOrganizer = new TabOrganizer(tabsetConfig);
    }

    showEventResults(events, turnNumber, isCurrentTurn) {
        //title
        this.title.text = this.title.text.slice(0, 4).concat(turnNumber);
        this.tabSet.tabs[0].setActive();
        var sortedEvents = this.tabOrganizer.categorize(events);
        console.log(sortedEvents); 
        
        
        
        //add object to displayLayer -- do this last
        this.displayLayer.addChild(this.container);
    }

    createDisplayObject(displayLayer, nextAction, previousAction, tabsetConfig) {
        this.displayLayer = displayLayer;
        const xOffset = 64;
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
        fuzzy.drawRect(0, 0, displaySettings.displayWidth, displaySettings.displayHeight);
        fuzzy.endFill();
        
        fuzzy.interactive = true;
        stopClick(fuzzy);
            
        //main background image
        const backing = new PIXI.Sprite.from(graphicalResources.uiSheet.textures['book-full.png']);
        backing.anchor.set(0, 0);
        main.addChild(backing);
    
        //set title
        this.title = new PIXI.Text(`Week `);
        this.title.pivot.set(this.title.width / 2, this.title.height / 2);
        this.title.position.set(main.width / 2, 25);

        //next / previous buttons
        //Make this configurable?
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
        const tabs = tabsetConfig.tabConfigs.map(config => new Tab(config.category, config.icon, tabsetConfig.tabWidth, tabsetConfig.tabHeight));
        this.tabSet = new TabSet(tabs);
        this.main = main;

        //create closer
        const closeFunction = () => {
            displayLayer.removeChild(log);
        }
        const closerUi = closer(main, closeFunction);


        //add children in desired order
        log.addChild(fuzzyOverlay, main);
        displayLayer.addChild(log);
        fuzzyOverlay.addChild(fuzzy);
        main.addChild(this.title, nextButton, previousButton, closerUi);
        
        tabs.forEach((a, i) => {
            main.addChild(a.container);
            a.setPosition(36, i * (tabsetConfig.tabHeight + 8) + 128);  
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