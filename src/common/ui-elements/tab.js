import {graphicalResources} from '../../main';

export default class Tab {
    constructor(label, iconTexture, width, height) {
        this.container = new PIXI.Container();
        let darkTexture = graphicalResources.windowSheet.textures.blockConcaveDark;
        let lightTexture = graphicalResources.windowSheet.textures.blockConvex;
        this.active = false;
        this.inactiveSprite = new PIXI.Sprite(darkTexture);
        this.inactiveSprite.tint = 0x555555; 
        this.activeSprite = new PIXI.Sprite(lightTexture);
        this.activeSprite.name = label + "-active";
        this.inactiveSprite.name = label + '-inactive';
        this.height = height;
        this.width = width; 
        this.initSprites([this.activeSprite, this.inactiveSprite]);
        this.container.interactive = true;
        this.container.on('click', this.setActive.bind(this))
        
        //replace with icons...
        let tabIcon = new PIXI.Sprite.from(iconTexture);        
        tabIcon.position.set(8, this.height / 3);
        tabIcon.tint = 0x555555;
        tabIcon.interactive = true;
        tabIcon.name = label + "-sprite";
        this.tabIcon = tabIcon;
        this.container.addChild(tabIcon);
    }

    initSprites(sprites) {
        sprites.forEach(element => {
            element.height = this.height;
            element.width = this.width;            
            this.container.addChild(element);
        });
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

    toggleSprites() {
        this.container.swapChildren(this.activeSprite, this.inactiveSprite);
    }

    setInactive() {
        this.active = false;
        this.tabIcon.tint = 0x555555;
        this.toggleSprites();       
    }

    setActive() {
        if (!this.active) {
            this.tabSetCallback(this);
            this.active = true; 
            this.tabIcon.tint = 0xDDDDDD;
            this.toggleSprites();
        }               
    }

    setContent(content) {
        this.content = content;
    }
}