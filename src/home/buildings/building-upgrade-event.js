import Timer from 'events/Timer';
import Message from 'events/message';
import EventIndicator from 'ui/events/eventIndicator';
    export default function (building, tile, isUpgrade) {
        const timer = new Timer('buildingUpgrade', building.buildTime);
        const indicator = EventIndicator('construction', tile);
        const resolve = () => {            
            tile.grid.home.buildingManager.finishConstruction(building, tile);
            const content = building.completionMesg || 'your ' + building.type + ' has been upgraded!';
            indicator.remove();
            return new Message('Upgrade complete!', [content]);
        }



        return {timer, resolve, indicator};
    }
