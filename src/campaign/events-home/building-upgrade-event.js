import EventIndicator from '../../common/event-indicator';
import {eventCategories} from '../../core/constants';
import GameEvent from '../../campaign/game-event';

    export default class BuildingUpgradeEvent extends GameEvent{
        constructor (building, tile) {
            super(building.buildTime, eventCategories.development);
            this.indicator = EventIndicator('construction', tile);
        }

        resolve() {
            tile.grid.home.buildingManager.finishConstruction(building, tile);
            const content = building.completionMesg || 'your ' + building.type + ' has been upgraded!';
            indicator.remove();
            return this.createMessage('Upgrade complete!', [content]);            
        }
    }
