import Timer from './timer';
import GameEvent from './game-event';

    export default class Message extends GameEvent {
        constructor(title, contents, category) {
            super(0, category);
            this.title = title;
            this.contents = contents;
            this.timer = new Timer(0);
        }

        resolve() {
            return this;
        }
    }
