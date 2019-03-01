import makeEventIndicator from '../event-indicator';
import GameEvent from '../game-event';
import {eventCategories} from '../../common/constants';

	export default class Expedition extends GameEvent {
		constructor(tile) {
			super(Math.floor(Math.sqrt(tile.getDanger())), eventCategories.military);
			this.militia = 0;
			this.militiaAvailable = tile.grid.home.population.militiaAvailable || 0;
			this.eventId = "ex-" + tile.UID || '99999';
			this.dangerValue = tile.getDanger() || 0;
			this.confirmed = false;
			this.tile = tile;
		}

		isValid() {
			return this.militia > 0;
		}

		determineResults() {
			let enemy = ((this.dangerValue*2) + ~~(Math.random() * this.dangerValue) ) * 2;
			let deaths = ~~(Math.max(enemy - this.militia*3, 0)/2);
			return {
				defeat: deaths > (this.militia / 2),
				deaths: Math.min(deaths, this.militia),
				tile: this.tile,
				type: this.type
			}
		}		

		adjustMilitia(value) {
			this.militia += value;
			this.militiaAvailable -= value;
			return this.militia ? this.calcWinPercentage() : null;
		}

		confirmExpedition() {
			if (this.isValid()) {
				this.tile.grid.home.modifyPopulace('militiaAvailable', -this.militia);
				this.tile.grid.game.addEvent(this);
				this.confirmed = true;
				this.tile.showOptions();
				this.indicator = makeEventIndicator('expedition', this.tile);
				
			} else {
				console.log('that will never work...');
			}
		}

		cancelExpedition() {
			this.tile.grid.home.modifyPopulace('militiaAvailable', this.militia);
			this.tile.grid.game.removeEvent(this.eventId);
			this.confirmed = false;
			this.clearIndicator();
		}

		clearIndicator() { 
			this.indicator.remove();
		}

		calcWinPercentage() {
			let baseDV = this.dangerValue;
			let DVrange = [baseDV*4, (baseDV*6)-1];
			let lossThresh = ~~(this.militia/2) + 1;
			let c = (this.militia*3) + (lossThresh * 2);
			let range = (DVrange[1] - DVrange[0])+1;
			let chances = Math.max(c - DVrange[0], -1) + 1;
			if (!chances){
				return 0;
			} else {
				return Math.min((chances / range).toFixed(2), 1);
			}
		}

		resolve() {
			let results = this.determineResults();
			this.tile.grid.home.modifyPopulace('militia', -results.deaths);
			this.tile.grid.home.modifyPopulace('militiaAvailable', this.militia);
			this.clearIndicator();
			if (!results.defeat){
				this.tile.convertToCivic();
			}
			let title = results.defeat ? "Defeat!" : "Victory!";
			let content = [`${results.deaths} militia were lost in the battle`];
			return this.createMessage(title, content);			
		}
	}


