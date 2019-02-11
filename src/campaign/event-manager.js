import SetupEventsBox from '../campaign/campaign-log-ui';
import Message from '../campaign/message';
import EventResults from '../campaign/event-results';

const welcomeMessage = new Message('Welcome!', ['Hello, and welcome to the game!']);

export default class EventManager {
    constructor(eventState) {
        this.eventArchive = eventState !== undefined ? eventState.archive : [];
        this.events = eventState !== undefined ? eventState.events : [];
        console.log(this.events);
        this.display = SetupEventsBox(this.events, welcomeMessage);
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
        EventResults(this.eventArchive[turnNumber], turnNumber);
    }
    
}