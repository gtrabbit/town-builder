import EventIndicator from '../event-indicator';
import {eventCategories} from '../../common/constants';
import GameEvent from '../../campaign/game-event';

export default class ConstructionEvent extends GameEvent{
    constructor(building, tile, isUpgrade) {
        super(building.buildTime, eventCategories.development);
        this.isUpgrade = isUpgrade;
        this.building = building;
        this.tile = tile;
        this.indicator = EventIndicator('construction', tile); //subject to change if we get some more animations....
        this.content = isUpgrade ? (building.upgradeCompletionMsg || `Your ${building.type} has been upgraded.`) : building.completionMesg || 'your ' + building.type + ' has been completed!';
        this.title = isUpgrade ? "Upgrade complete!" : "Construction complete!";
    }

    resolve() {
        if (this.isUpgrade) {
            this.tile.grid.home.buildingManager.finishUpgrade(this.building, this.tile);
        } else {
            this.tile.grid.home.buildingManager.finishConstruction(this.building, this.tile);
        }
        
        this.indicator.remove();
        return this.createMessage(this.title, [this.content]);
    }
}
