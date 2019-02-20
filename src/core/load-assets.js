import overworldTilesetJSON from '../../assets/frames.json';
import overworldTileset from '../../assets/overworld-tiles.png';
import uiSheet from '../../assets/new-ui-spritesheet.png';
import uiSheetJSON from '../../assets/new-ui-spritesheet.json';

//ToDo: package all these misc icons into a sheet

export default function loadAssets(startupCallback, graphicalResources) {


    //load spriteSheets
    let resourcesReady = 0;
	const tilesBaseTexture = PIXI.BaseTexture.fromImage(overworldTileset);
	tilesBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
	const tilesSheet = new PIXI.Spritesheet(tilesBaseTexture, overworldTilesetJSON);

	const uiBaseTexture = PIXI.BaseTexture.fromImage(uiSheet);
	uiBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	const uiSpriteSheet = new PIXI.Spritesheet(uiBaseTexture, uiSheetJSON);
	const resourceSheets = [
		{name: "uiSheet", resource: uiSpriteSheet},
		{name: "tileSheet", resource: tilesSheet}
	];
	resourceSheets.forEach(res => {
		res.resource.parse(texture => {
			graphicalResources[res.name] = res.resource;
			resourcesReady++;
			if (resourcesReady === resourceSheets.length) {
				startupCallback({});
			}
		})
	});
}