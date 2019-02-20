import Message from '../campaign/message';
import EventBox from './campaign-log-ui';
import {eventCategories} from '../common/constants';
import TabsetConfig from '../common/ui-elements/tabset-config';
import {graphicalResources} from '../main';

const welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!'], eventCategories.summary);

export default class EventManager {
    constructor(eventState, displayLayer) {
        this.eventArchive = eventState !== undefined ? eventState.archive : [];
        this.events = eventState !== undefined ? eventState.events : [];
        this.displayLayer = displayLayer;
        var tabConfigs = [
            {icon: graphicalResources.uiSheet.textures['quil.png'], category: eventCategories.event},
            {icon: graphicalResources.uiSheet.textures['sword.png'], category: eventCategories.military},
            {icon: graphicalResources.uiSheet.textures['hammer.png'], category: eventCategories.development},            
            {icon: graphicalResources.uiSheet.textures['potion.png'], category: eventCategories.domestic}
        ];
        var tabsetConfig = new TabsetConfig(tabConfigs, 64, 32);
        this.eventDisplay = new EventBox(this.displayLayer, this.previousEvents, this.nextEvents, tabsetConfig);
        this.currentTurnNumber = 0;
        this.viewingTurnNumber = 0;
    }

    extractState() {
        return {
            events,
            eventArchive
        }
    }

    previousEvents(event) {
        if (this.viewingTurnNumber > 0) {
            this.viewingTurnNumber--;
            this.eventDisplay.showEventResults(this.eventArchive, this.viewingTurnNumber, this.viewingTurnNumber === this.currentTurnNumber);
        }        
    }

    nextEvents(event) {
        if (this.viewingTurnNumber < this.currentTurnNumber) {
            this.viewingTurnNumber++;
            this.eventDisplay.showEventResults(this.eventArchive, this.viewingTurnNumber, this.viewingTurnNumber === this.currentTurnNumber);
        }   
    }

    addEvent(event) {
        this.events.push(event);
        return this.event;
    }

    removeEvent(eventId){
        return this.events.splice(
            this.events.findIndex(a => a.eventId === eventId), 1)[0];
    }

    update(turnNumber) {
        this.currentTurnNumber = turnNumber;
        this.viewingTurnNumber = turnNumber;
        const completedEvents = [];
        for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            if (event.timer.modifyDuration() < 0){
                completedEvents.push(this.events.splice(i, 1)[0].resolve());
                i--;
            }
        }
        this.eventArchive[turnNumber] = completedEvents;
        this.eventDisplay.showEventResults(this.eventArchive[turnNumber], turnNumber, true);
    }
    
}