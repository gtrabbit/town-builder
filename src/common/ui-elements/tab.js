import {graphicalResources} from '../../main';
import {typographyStyles} from '../../core/settings';
const textStyle = typographyStyles('basic', 'white');

export default class Tab {
    constructor(label, width, height) {
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
        let labelText = new PIXI.Text(label, textStyle);
        labelText.rotation = -1.5708;
        labelText.interactive = true;
        labelText.position.set(6, this.height - 12);
        this.container.addChild(labelText);
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
        this.toggleSprites();       
    }

    setActive() {
        if (!this.active) {
            this.tabSetCallback(this);
            this.active = true; 
            this.toggleSprites();
        }               
    }
}