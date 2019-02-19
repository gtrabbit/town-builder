import EventIndicator from '../event-indicator';
import {eventCategories} from '../../core/constants';
import GameEvent from '../../campaign/game-event';

export default class ConstructionEvent extends GameEvent{
    constructor(building, tile, isUpgrade) {
        super(building.buildTime, eventCategories.development);
        this.indicator = EventIndicator('construction', tile); //subject to change if we get some more animations....
        this.content = isUpgrade ? (building.upgradeCompletionMsg || `Your ${building.type} has been upgraded.`) : building.completionMesg || 'your ' + building.type + ' has been completed!';
        this.title = isUpgrade ? "Upgrade complete!" : "Construction complete!";
    }

    resolve() {
        if (isUpgrade) {
            tile.grid.home.buildingManager.finishUpgrade(building, tile);
        } else {
            tile.grid.home.buildingManager.finishConstruction(building, tile);
        }
        
        indicator.remove();
        return this.createMessage(this.title, [this.content]);
    }
}
