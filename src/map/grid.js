import Home from '../home/home';
import TerrainGenerator from './terrain-generator';
import TileFactory from './tile-factory';


export default class Grid{
	constructor(game, savedGrid){
		this.height = game.state.height;
		this.width = game.state.width;
		this.homeStart = [~~(this.width / 2) - 1, ~~(this.height / 2) - 1];
		this.growthRate = game.state.difficulty.growthRate;
		this.game = game;
		this.squareSize = game.squareSize;
		if (!savedGrid){
			this.rows = [];
			this.buildMap();
		} else {
			this.rows = savedGrid.rows;
			this.home = new Home(this, this.game.settings, savedGrid.home);
		}

		this.game.map.homeLocation = this.homeStart;
		this.game.map.zoomToLocation(this.homeStart);
	}

	extractState(){
		return {
			home: this.home.extractState(),
			rows: this.rows
		}
	}

	getTile(x, y){
		return this.rows[x][y];
	}

	convertTileToCivic(tile){
		const newTile = TileFactory('civic', tile.x, tile.y, this, tile.terrain, this.growthRate);
		this.home.addTileToTerritory(newTile);
		this.replaceTile(newTile.x, newTile.y, newTile);
		return newTile;
	}

	//coords of old tile x, y + new tile
	replaceTile(x, y, tile){
		const oldTile = this.rows[x].splice(y, 1, tile)[0];
		if (oldTile.hasOwnProperty('ui')){
			oldTile.ui.destroy();
		}
		tile.setTerrainSubtype();
		tile.makeUI();
		this.game.tileLayer.addChild(tile.ui.getContainer());
		tile.render();
	}

	update(turnNumber){
		for (let col in this.rows){
			for (let square in this.rows[col]){
				this.rows[col][square].takeTurn(turnNumber);
			}
		}
	} 

	buildMap(){
		for (let x = 0; x < this.width; x++){
			let col = [];
			this.rows.push(col)
			for (let y = 0; y < this.height; y++){
				let square = TileFactory('wilds', x, y, this, 'field', this.growthRate);
				col.push(square);
			}	
		}
		TerrainGenerator.generateTerrain(this, this.homeStart);
		this.home = new Home(this, this.game.settings);			
	}
}
