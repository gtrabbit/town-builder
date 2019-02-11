import Grid from '../map/grid';
import MapUI from '../map/map-ui';
import InfoWindow from '../common/info-window/info-window';
import makeTextBox from '../common/info-window/textbox';
import EventManager from '../campaign/event-manager';

	export default class Game{
		constructor(state, screenWidth, screenHeight, stage, renderer, animationHook){

			//=========PIXI essentials===========//
			this.stage = stage;
			this.renderer = renderer;
			this.animationHook = animationHook;
			this.screenWidth = screenWidth;
			this.screenHeight = screenHeight;

			//===========Constants============//
			
			this.squareSize = 28; //basically arbitrary, but trying to find what looks good with current sprite resolution

			//=========Display Layers=============//
			this.overlays = new PIXI.Container();
			this.campaignLogLayer = new PIXI.Container();
			this.floatLayer = new PIXI.Container();
			this.tileLayer = new PIXI.Container();
			this.buildingLayer = new PIXI.Container();
			this.map = MapUI(state.width, state.height, this.squareSize, screenWidth, screenHeight);
			this.floatLayer.name = 'floatLayer';
			this.campaignLogLayer.name = 'campaignLogLayer';
			this.overlays.name = 'overlays';
			this.map.name = 'map';
			this.tileLayer.name = 'tileLayer';
			this.buildingLayer.name = 'buildingLayer';

			//============State=================//
			this.state = {
				growthRate: state.growthRate,
				width: state.width,
				height: state.height,
				turns: state.turns || 0,
				eventState: state.eventState || {}				
			};
			this.startingResources = state.startingResources;
			this.startingPopulation = state.startingPopulation;

// we extractState() from grid, so this is not techincally part of state, since grid has logic and the state should only be data
			this.grid = !state.grid ? new Grid(this) : new Grid(this, state.grid);
			this.home = this.grid.home;
			
			//pass what comes in from the constructor (not game.state), because we are checking on undefined (not empty object)
			this.eventManager = new EventManager(state.eventState, this.campaignLogLayer);

			//============Logic/Function============///
			
			this.makeTextBox = makeTextBox;
			this.infoWindow = InfoWindow(this.overlays, this.animationHook);

			//================ Flags ==============//
			this.pleaseSortTiles;

		} //ending the constructor

		//methods...

		extractState(){
			return {
				gameState: this.state,
				campaignState: this.eventManager.extractState(),
				gridState: this.grid.extractState()
			}
		}

		showEventResults(){
			const completedEvents = [];
			for (let i = 0; i < this.state.events.length; i++) {
				let event = this.state.events[i];
				if (event.timer.modifyDuration() < 0){
					completedEvents.push(this.state.events.splice(i, 1)[0].resolve());
					i--;
				}
			}
			this.state.eventArchive[this.state.turns] = completedEvents;
			EventResults(this.state.eventArchive[this.state.turns], this.state.turns);
		}

		addEvent(event){
			let processedEvent = this.eventManager.addEvent(event);
			return processedEvent;			
		}

		removeEvent(eventId){
			return this.eventManager.removeEvent(eventId);			
		}

		setStage(){
			this.stage.addChild(this.map, this.overlays, this.campaignLogLayer);
			this.map.addChild(this.tileLayer, this.buildingLayer, this.floatLayer);
			for (let rowNumber = this.grid.rows.length-1; rowNumber >= 0; rowNumber--){
				for (let colNum = this.grid.rows[rowNumber].length-1; colNum >= 0; colNum--){
					let tileUI = this.grid.getTile(rowNumber, colNum).makeUI();
					this.tileLayer.addChildAt(tileUI.getContainer(), 0);
				}
			}
			this.stageIsSet = true;
			this.home.init(this.grid.homeStart, this.grid.homeStart.map(a=>a+2));
		}

		update(){
			this.infoWindow.close(); 
			this.state.turns++;
			this.grid.home.update(this.state.turns);
			this.grid.update(this.state.turns);
			this.eventManager.update(this.state.turns);
			// if (this.pleaseSortTiles) {
			// 	//commenting this out for now since tiles are not overlapping. Will consider putting it back if needed.
			// //	this.map.sortTiles(this.tileLayer);
			// 	this.pleaseSortTiles = false;
			// }			
		}
	}
