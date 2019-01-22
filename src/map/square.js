import makeTileUI from './base-tile-ui';
import Terrain from './terrain';

	export default class Square {
		constructor(x, y, grid, terrain){

			this.x = x;
			this.y = y;
			this.UID = "" + x + y;
			this.grid = grid;
			this.maxWidth = grid.width;
			this.maxHeight = grid.height;
			this.neighbors = this.setNeighbors(x, y);
			this.isExplored = false;
			this.squareSize = grid.squareSize;
			this.fontStyle = grid.game.basicFontStyle;
			if (typeof terrain === 'string') {
				this.setTerrain(terrain, false);
			} else {
				this.terrain = terrain;
			}
		}

		getNeighbors(){
			return this.neighbors;
		}

		getSpriteId() {
			return this.terrain.getSpriteId();
		}

		getNeighborTiles() {
			let neighbors = [];
			for (let j = this.y-1; j <= this.y+1; j++){
				for (let k = this.x-1; k <= this.x+1; k++){
					if (j >= 0 && j < this.maxHeight //within y bounds
						&& k >= 0 && k < this.maxWidth //within x bounds
						&& !(this.y === j && this.x === k)){ //not self
						neighbors.push(this.grid.getTile(k, j));
					} else {
						neighbors.push(null);
					}
				}
			}
			return neighbors;
		}

		makeUI(){			
			this.ui = makeTileUI(this);
			this.setListener();
			return this.ui;
		}

		setListener(){

		}

		setTerrain(terrainTypeName, setSubtype = true) {
			//if no change, return.
			if (this.terrain && terrainTypeName === this.terrain.typeName) return; 
			//if the type is changing, and the sprite has already been set, then we
			//need to re-evaluate each neighbor to see if it also needs changed.
			let isReplacement = (this.terrain && this.terrain.spriteName);
			this.terrain = new Terrain(this, terrainTypeName);
			if (setSubtype) this.setTerrainSubtype();
			if (isReplacement) {
				this.getNeighborTiles().forEach(tile => {
					tile && tile.setSprite();
				})
			}
		}

		setSecondaryTerrainType(typeName) {
			this.terrain.setSecondaryTerrainType(typeName);
		}

		setSecondaryTerrainSubtype(terrainSubtypeModel) {
			this.terrain.setSecondaryTerrainSubtype(terrainSubtypeModel);
		}

		getSecondaryTerrainSpriteId() {
			return this.terrain.getSecondaryTerrainSpriteId();
		}

		setSprite() {
			if (!this.terrain.canSetSprite()) {
				this.terrain.setSubtype();
			} else {
				this.terrain.setSprite();
			}
		}

		setTerrainSubtype() {
			this.terrain.setSubtype();
		}

		setTerrainSubtypeName(name) {
			this.terrain.setSubtypeName(name);
		}

		//here so that calling this does not throw undefined error when not called on a derived type
		takeTurn() {
			
		}

		getSpritePosition(){
			return {
				x: this.ui.x,
				y: this.ui.y
			}
		}

		getDanger(){
			return 0;
		}

		setNeighbors(x, y){
			let neighbors = [];
			for (let j = x-1; j <= x+1; j++){
				for (let k = y-1; k <= y+1; k++){
					if (j >= 0 && j < this.maxWidth){
						if (k >= 0 && k < this.maxHeight){
							if (!(x === j && y === k)){
								neighbors.push([j, k]);
							}
						}
					}
				}
			}
			return neighbors;	
		}
	}
