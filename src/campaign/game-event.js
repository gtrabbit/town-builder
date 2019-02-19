import Timer from './timer';
import Message from './message';

export default class GameEvent {
    constructor(timerDuration, category) {
        this.timer = new Timer(timerDuration);
        this.category = category;
    }

    createMessage(title, content) {
        return new Message(title, content, this.category);
    }
}