import {eventCategories} from '../../core/constants';
import GameEvent from '../game-event';

export default class CitizenConversionEvent extends GameEvent{
    constructor(startType, targetType, modifyPopulace, amount) {
        super(targetType.trainingTime, eventCategories.domestic);
        this.modifyPopulaceCallback = modifyPopulace;
        this.amount = amount || 1;
    }

    resolve() {
        let title, content;
        if (targetType.type === 'commoners'){
            title = 'Homecoming!';
            content = 'A former ' + startType.type + ' is welcomed home.';
        } else {
            title = 'Training Complete!';
            content = 'A former ' + startType.type + ' has completed their training and is now a ' + targetType.type; + '.';
        }

        this.modifyPopulaceCallback(targetType.type, this.amount);
        return this.createMessage(title, [content]);
    }
}
