import Square from './square';
import makeBuildingUIWindow from '../home/buildings/common/begin-construction-ui';

	export default class Civic extends Square {
		constructor(x, y, grid, terrain){
			super(x, y, grid, terrain);
			this.building = null;
			this.type = 'civic';
			this.currentThreat = 0;
			this.isExplored = true;
			this.ongoingConstruction = false;
			this.home = grid.home;
		}

		getDefense() {
			const buildingModifier = this.building ? this.building.getBenefits('defense') : 0;
			const terrainModifier = this.terrain.defenseBonus;
			return terrainModifier + buildingModifier;
		}

		setThreatLevel(value) {
			this.threatLevel = value;
		}

		getCurrentThreat() {
			return Math.max(this.threatLevel - this.getDefense(), 0);
		}

		build(building){
			if (this.canBuild(building)){
				this.ongoingConstruction = true;
				this.home.startConstruction(building, this);
				return true;
			} 
			return false;
		}

		//pays the price if possible and returns true, otherwise returns false
		canBuild(buildingType, level = 0){
			return this.home.extractCost(this.home.getBuildingCost(buildingType, level));
		}

		upgrade(buildingType, level) {
			if (this.canBuild(buildingType, level)){
				this.ongoingConstruction = true;
				this.home.startConstruction(buildingType, this, level, true); 
				return true;
			}
			return false;
		}

		finishConstruction(building){
			return this.setBuilding(building);
		}

		finishUpgrade(building) {
			return this.setBuilding(building);
		}

		setBuilding(building) {
			const formerBuilding = this.building;
			this.ongoingConstruction = false;
			this.building = building;
			this.setSecondaryTerrainSubtype('field');
			this.setTerrainSubtypeName('field');
			this.setTerrainNoValidation('field', 'field');
			return formerBuilding;
		}

		showOptions(){
			console.log(this);
			if (this.ongoingConstruction) {
				console.log("show an ongoing construction window");
			} else if (!this.building) {
				this.grid.game.infoWindow.openWith(
					makeBuildingUIWindow(this, this.home.getBuildingsAvailableToBuild()), this); 
			} else {
				this.building.openUI(this.grid.game.infoWindowLayer);
			}
			
		}

		setListener(){
			this.ui.addEventListener('click', this.showOptions.bind(this), true);
		}
		
		takeTurn(){
			this.terrain.setProps()
			this.render();
			if (this.building) {
				this.building.takeTurn();
			}
		}

		render(){
			this.getNeighbors().forEach(a=>{
				let tile = this.grid.getTile(a[0], a[1]);
				if (tile.type === 'wilds') {
					tile.markAsExplored();
					this.isOnEdgeOfTown = true;
				}
			});
			if (this.ui) {
				this.ui.illumine(true);
				this.ui.setTintForTileByCurrentThreat(this.getCurrentThreat());
			}
		}
	}

	



