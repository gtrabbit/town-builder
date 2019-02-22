import textureLegend from '../texture-legend';
import TextWrapper from '../text-wrapper';

export default class GraphicalSummary {
    constructor(updateSummary) {
        const updateKeys = Object.keys(updateSummary);
        this.icons = updateKeys.map(key => {
            const number = updateSummary[key];
            if (number === 0) return;
            const wrapper = new PIXI.Container();
            const icon = textureLegend(key.toLowerCase());
            icon.height = 36;
            icon.width = 36;
            const symbol = number > 0 ? 'up-arrow' : 'down-arrow';            
            const symbolSprite = textureLegend(symbol);
            symbolSprite.position.set(icon.width + 6, 0);
            const numberSprite = new TextWrapper(`x${Math.abs(number)}`);
            numberSprite.ui.position.set(symbolSprite.x + symbolSprite.width, 0);
            wrapper.addChild(icon, symbolSprite, numberSprite.ui);
            return wrapper;
        });
    }
}