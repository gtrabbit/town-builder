import Message from '../campaign/message';
import EventResults from '../campaign/event-results';
import EventBox from '../campaign/new-campaign-log-ui';

const welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!']);

export default class EventManager {
    constructor(eventState, displayLayer) {
        this.eventArchive = eventState !== undefined ? eventState.archive : [];
        this.events = eventState !== undefined ? eventState.events : [];
        this.displayLayer = displayLayer;
        this.eventDisplay = new EventBox(this.displayLayer);
    }

    extractState() {
        return {
            events,
            eventArchive
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
        const completedEvents = [];
        for (let i = 0; i < this.events.length; i++) {
            let event = this.events[i];
            if (event.timer.modifyDuration() < 0){
                completedEvents.push(this.events.splice(i, 1)[0].resolve());
                i--;
            }
        }
        this.eventArchive[turnNumber] = completedEvents;
        this.eventDisplay.showEventResults(this.eventArchive, turnNumber);
    }
    
}