import {typographyStyles as styles} from '../core/settings';
import Pop from './animations/pop';


const defaultStyle = styles('basic');

export default class TextWrapper {
    constructor(text, style) {
        this.style = style || defaultStyle;
        this.ui = new PIXI.Text(text, this.style);
        this._text = text;        
    }

    set text(newText) {
        this._tex = newText;
        this.ui.text = newText;
    }

    get text() {
        return this._text;
    }

    pops() {
        this.popper = new Pop(this);
        return this;   
    }
}