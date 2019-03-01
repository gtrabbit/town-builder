import Square from '../map/square';
import Expedition from '../campaign/events-expedition/expedition';
import MakeExpeditionUIWindow from '../campaign/events-expedition/expedition-ui'; //but this should be called via the expedition, not the tile
import DangerHanlder from './danger-handler';

	export default class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
				this.type = "wilds";
				this.expedition = {};
				this.map = this.grid.game.map;
				this.dangerHandler = new DangerHanlder(this.getNeighborTiles, growthRate);
			}

			getDanger(){
				return this.dangerHandler.getDanger();
			}

			takeTurn(turnNumber){
				this.terrain.setProps();
				if (!this.expedition.confirmed){
					this.expedition = {};
				}
				const terrainModifier = this.terrain.dangerModifier;
				this.dangerHandler.incrementDanger(terrainModifier);
				this.render();
			}

			setListener(){
				if (!this.isExplored) {
					this.ui.addEventListener('click', function() { console.log(this)}.bind(this))
				} else {
					this.ui.addEventListener('click', this.showOptions.bind(this), true);
				}
			}
		
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				this.grid.game.infoWindow.openWith(MakeExpeditionUIWindow(this.expedition, this), this);				
			}

			convertToCivic(){
				this.grid.convertTileToCivic(this);
			}

			markAsExplored(){
				if (this.isExplored) {
					return;
				}
				this.isExplored = true;
				this.setListener();
				this.render();
			}

			render(){ 
				if (this.isExplored) {
					this.ui.illumine(false);
					this.ui.enableInteraction();
				} else {
					this.ui.dim();
				}	
			}
		}
