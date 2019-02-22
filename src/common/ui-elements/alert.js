import {graphicalResources} from '../../main';

export default function() {
    const alertBackingTexture = graphicalResources.uiSheet.textures['red-circle'];
    const alertTexture = graphicalResources.uiSheet.textures['alert'];
    const alert = new PIXI.Container();
    const alertSprite = new PIXI.Sprite.from(alertTexture);        
    alertSprite.position.set(1,1);
    alert.visible = false;
    alertSprite.height = 24;
    alertSprite.width = 24;
    alert.position.set(12, 0);        
    const alertBacking = new PIXI.Sprite.from(alertBackingTexture);
    alertBacking.height = 26;
    alertBacking.width = 26;
    alert.addChild(alertBacking, alertSprite);
    return alert;
}