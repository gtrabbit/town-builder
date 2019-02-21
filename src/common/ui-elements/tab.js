import {graphicalResources} from '../../main';

export default class Tab {
    constructor(label, iconTexture, width, height) {
        this.container = new PIXI.Container();
        this.category = label;
        //create tab backing images
        let darkTexture = graphicalResources.uiSheet.textures['tab-half'];
        let lightTexture = graphicalResources.uiSheet.textures['tab-full'];
        let alertTexture = graphicalResources.uiSheet.textures['alert'];
        
        this.alert = new PIXI.Sprite.from(alertTexture);
        
        this.alert.visible = false;
        this.alert.width = 24;
        this.alert.height = 24;
        this.alert.position.set(12, 0);
        this.alert.tint = 0xDD2233;

        
        this.active = false;
        this.inactiveSprite = new PIXI.Sprite(darkTexture);
        this.inactiveSprite.tint = 0x555555; 
        this.activeSprite = new PIXI.Sprite(lightTexture);
        this.activeSprite.name = label + "-active";
        this.inactiveSprite.name = label + '-inactive';

        this.height = height;
        this.width = width;
        this.container.addChild(this.activeSprite, this.inactiveSprite, this.alert);
        this.container.interactive = true;
        this.container.on('click', this.setActive.bind(this))
        this.activeSprite.visible = false;

        //create icons
        let tabIcon = new PIXI.Sprite.from(iconTexture);
        tabIcon.position.set(16, 0);
        tabIcon.tint = 0x555555;
        tabIcon.interactive = true;
        tabIcon.name = label + "-sprite";
        this.tabIcon = tabIcon;
        this.container.addChild(tabIcon);
    }


    registerWithTabSet(callback) {
        this.tabSetCallback = callback;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.container.x = x;
        this.container.y = y;
    }

    toggleSprites(active) {
        this.inactiveSprite.visible = !active;
        this.activeSprite.visible = active;
    }

    setInactive() {
        this.active = false;
        this.tabIcon.tint = 0x555555;
        this.toggleSprites(false);       
    }

    setActive() {
       // this.alert.visible = false;
        if (!this.active) {
            this.tabSetCallback(this);
            this.active = true; 
            this.tabIcon.tint = 0xDDDDDD;
            this.toggleSprites(true);
        }               
    }

    setContent(content) {
        this.content = content;
    }

    setAlert() {
        this.alert.visible = true;
    }
}