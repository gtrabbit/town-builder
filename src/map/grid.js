import Home from 'home/Home';
import Terrain from 'core/Terrain';
import TileFactory from 'tiles/tileFactory';


export default class Grid{
	constructor(game, savedGrid){
		this.height = game.state.height;
		this.width = game.state.width;
		this.growthRate = game.state.growthRate;
		this.game = game;
		this.squareSize = game.squareSize;
		if (!savedGrid){
			this.rows = [];
			this.buildMap();
		} else {
			this.rows = savedGrid.rows;
			this.home = new Home(this, savedGrid.home.resources, savedGrid.home.population, savedGrid.home.popGrowth, savedGrid.home.territory);
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

	makeAField(){
		let x = ~~(this.width / 2) - 1;
		let y = ~~(this.height / 2) - 1;
		let tile = this.getTile(x, y);
		tile.terrain = 'field';
		tile.getNeighbors().forEach(a=>{
			let b = this.getTile(a[0], a[1])
			b.terrain = 'field';
			if (Math.random() > 0.2){
				b.getNeighbors().forEach(a=>{
					tile = this.getTile(a[0], a[1]);
					tile.terrain = 'field';
					if (Math.random() > 0.3){
						tile.getNeighbors().forEach(a=>{
							if (Math.random() > 0.6) this.getTile(a[0], a[1]).terrain = 'field';
						})
					}
				})
			}
		})
		return [x, y];
	}

	getTile(x, y){
		return this.rows[x][y];
	}

	convertTile(targetType, x, y, terrain){
		const newTile = TileFactory(targetType, x, y, this, terrain, this.growthRate);
		this.replaceTile(x, y, newTile);
		return newTile;
	}

	//coords of old tile x, y + new tile
	replaceTile(x, y, tile){
		this.game.pleaseSortTiles = true;
		const oldTile = this.rows[x].splice(y, 1, tile)[0];
		if (oldTile.hasOwnProperty('ui')){
			oldTile.ui.parent.destroy({children: true});
		}
		tile.makeUI();
		this.game.tileLayer.addChild(tile.ui.parent);
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
		Terrain.generateTerrain(this.rows);
		this.homeStart = this.makeAField();
		this.home = new Home(this, this.game.startingResources, this.game.startingPopulation);			
	}
}
