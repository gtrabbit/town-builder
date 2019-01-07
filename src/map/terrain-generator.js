import {assignTerrainSubtype} from './terrain-subtype-selector';
import parseMountains from './mountain-processor';

export default {
	terrainTypes: [
		'field',
		'forest',
		'hills'
	],


	generateTerrain(grid){
		let size = grid.height * grid.width;
		grid = this.firstIteration(grid);

		for (let x = 0; x < 5; x++){
			grid.rows.forEach((a,j)=>{
				a.forEach((b,k)=>{
					let neighbors = b.getNeighbors();
					let environs = {
						forest: 0,
						hills: 0,
						field: 0,
					}
					neighbors.forEach(n=>{
						var neighborTile = grid.getTile(n[0], n[1]);
						neighborTile.hasOwnProperty('terrain') && environs[neighborTile.terrain.typeName]++;
						
					});
					if (environs.hills > 3){
						b.setTerrain('hills', false);
					} else if (x > 2 && b.terrain.typeName === 'hills' && environs.forest > 2){
						b.setTerrain('forest', false);
					} else if (environs.forest > 5){
						b.setTerrain('forest', false);
					} else if (x > 2 && environs.field > 4 || x > 4){
						b.setTerrain('field', false);
					}
				})
			})
		}
		
		if (this.validateMap(grid, size)) {
			this.processHills(grid);
			this.setAllTerrainSubtype(grid);
		} else {
			this.resetAll(grid);
			this.generateTerrain(grid);
		}
	},

	processHills(grid) {
		parseMountains(grid);
	},

	smoothCorners(grid) {
		for (let j = 0; j < 3; j++) {
			grid.forEach(row => {
				row.forEach(tile => {
					let neighbors = tile.getNeighbors();
					let similarTiles = neighbors.reduce((a, b) => 
						grid[b[0]][b[1]].terrain.typeName === tile.terrain.typeName 
							? a + 1
							: a + 0
					, 0);
					if (similarTiles < 4) {
						tile.setTerrain('field');
					}
				});
			});
		}
	},

	validateMap(grid, size) {
		let environs = {
						forest: 0,
						hills: 0,
						field: 0,
					}
		grid.rows.forEach(a=>{
			a.forEach(b=>{
				environs[b.terrain.typeName]++;
			})
		})

		return !(environs.forest < size/7 || environs.hills < size/9)
	},

	setAllTerrainSubtype(grid) {
		grid.rows.forEach(row => {
			row.forEach(tile => {
				tile.setSprite();				
			})
		});
	},

	resetAll(grid){
		console.log('infinite loop?')
		grid.rows.forEach(a=>{
			a.forEach(b=>{
				this.resetTile(b);
			})
		})
	},

	resetTile(tile){
		tile.terrain.typeName = null;
	},

	firstIteration(grid){
		grid.rows.forEach(row => {
			row.forEach(tile => {
				let roll = Math.random();
				if (roll < 0.4){
					tile.setTerrain('forest', false);
				} else if (roll > 0.87) {
					tile.setTerrain('hills', false);
				} else {
					tile.setTerrain('field', false);
				}
			})
		});
		return grid;
	}
}
	
	