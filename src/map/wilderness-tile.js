import Square from '../map/square';
import Expedition from '../campaign/events-expedition/expedition';
import MakeExpeditionUIWindow from '../home/defense/expedition-ui'; //but this should be called via the expedition, not the tile
	export default class Wilds extends Square{
			constructor(x, y, grid, terrain, growthRate){
				super(x, y, grid, terrain);
				this.dangerValue = 1;
				this.growthRate = growthRate;
				this.type = "wilds";
				this.expedition = {};
				this.map = this.grid.game.map;
			}

			getDanger(){
				return this.dangerValue;
			}

			setDanger(value){
				this.dangerValue = value;
			}

			takeTurn(turnNumber){
				const someKindaDifficultyConstant = 10;
				if (!this.expedition.confirmed){
					this.expedition = {};
				}
				let chance = 1;
				let value = 1;
				this.getNeighbors().forEach((a) => {
					let square = this.grid.getTile(a[0], a[1]);
					chance += square.getDanger();	
					})
				if (this.terrain.typeName === 'hills') chance * 6;
				if (this.terrain.typeName === 'forest') chance * 4;
				if (chance > (Math.random() * (this.growthRate * 5)) + (someKindaDifficultyConstant - (turnNumber / 10))){
					this.setDanger(this.getDanger() + value);
				} 
				this.render();
			}

			setListener(){
				if (!this.isExplored) {
					this.ui.addEventListener('click', function() { console.log(this)}.bind(this))
				} else {
					this.ui.addEventListener('click', this.showOptions.bind(this), true);
				}
			}
		//should not be controlling the window's behavior within the tile!
			showOptions(){
				if (!this.expedition.hasOwnProperty('confirmed') && !this.expedition.confirmed){
					this.expedition = new Expedition(this)
				}
				this.grid.game.infoWindow.openWith(MakeExpeditionUIWindow(this.expedition, this), this);				
			}

			convertMe(){
				this.grid.convertTile('civic', this.x, this.y, this.terrain);
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
					this.ui.illumine();
					this.ui.enableInteraction();
				} else {
					this.ui.dim();
				}	
			}
		}
