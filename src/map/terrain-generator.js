import parseMountains from './mountain-processor';
import parseFields from './field-processor';
import {isCloseTo} from './map-utils';

export default {
	terrainTypes: [
		'field',
		'forest',
		'hills'
	],

	firstIteration(grid, homeStartPosition){
		grid.rows.forEach(row => {
			row.forEach(tile => {
				if (isCloseTo([tile.x, tile.y], [homeStartPosition[0], homeStartPosition[1]], 5)) {
					tile.setTerrain('field', false);
				} else {
					let roll = Math.random();
					if (roll < 0.42){
						tile.setTerrain('forest', false);
					} else if (roll > 0.84) {
						tile.setTerrain('hills', false);
					} else {
						tile.setTerrain('field', false);
					}
				}

			})
		});
		return grid;
	},

	generateTerrain(grid, homeStartPosition){
		let size = grid.height * grid.width;
		grid = this.firstIteration(grid, homeStartPosition);

		for (let x = 0; x < 5; x++){
			grid.rows.forEach((a)=>{
				a.forEach((tile)=>{
					let neighbors = tile.getNeighbors();
					let environs = {
						forest: 0,
						hills: 0,
						field: 0,
					};

					let hillVerticalGrowthPropensity = 0;

					neighbors.forEach(n=>{
						var neighborTile = grid.getTile(n[0], n[1]);
						neighborTile.hasOwnProperty('terrain') && environs[neighborTile.terrain.typeName]++;
						if (tile.x != neighborTile.x && neighborTile.terrain.typeName === 'hills' && tile.terrain.typeName === 'hills') {
							hillVerticalGrowthPropensity+= tile.y === neighborTile.y ? 3 : 1;
						}
					});
					if (environs.hills > 3 || (hillVerticalGrowthPropensity > 3 && x < 3)){
						tile.setTerrain('hills', false);
					} else if (x > 2 && tile.terrain.typeName === 'hills' && environs.forest > 2){
						tile.setTerrain('forest', false);
					} else if (environs.forest > 5){
						tile.setTerrain('forest', false);
					} else if (x > 2 && environs.field > 4 || x > 4){
						tile.setTerrain('field', false);
					}
				})
			})
		}
		this.smoothCorners(grid);
		if (this.validateMap(grid, size)) {
			this.processHills(grid);
			this.varyFields(grid, homeStartPosition);
			this.setAllTerrainSubtype(grid);
		} else {
			this.resetAll(grid);
			this.generateTerrain(grid, homeStartPosition);
		}
	},

	processHills(grid) {
		parseMountains(grid);
	},

	varyFields(grid, homeStartPosition) {
		parseFields(grid, homeStartPosition);
	},

	smoothCorners(grid) {
		for (let j = 0; j < 3; j++) {
			grid.rows.forEach(row => {
				row.forEach(tile => {
					let neighbors = tile.getNeighbors();
					let similarTiles = neighbors.reduce((a, b) => 
						grid.rows[b[0]][b[1]].terrain.typeName === tile.terrain.typeName 
							? a + 1
							: a + 0
					, 0);
					if (similarTiles < 4) {
						tile.setTerrain('field', false);
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
	}

}
	
	