import Timer from './timer';
import GameEvent from './game-event';
import GraphicalSummary from '../common/ui-elements/graphical-summary';

    export default class Message extends GameEvent {
        constructor(title, contents, category, updateObject) {
            super(0, category);
            if (updateObject) {
                this.graphicalSummary = new GraphicalSummary(updateObject);
            }
            this.title = title;
            this.contents = contents;
            this.timer = new Timer(0);
        }

        resolve() {
            return this;
        }
    }
