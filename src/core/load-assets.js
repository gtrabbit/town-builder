import overworldTilesetJSON from '../../assets/frames.json';
import overworldTileset from '../../assets/overworld-tiles.png';
import uiWindow from '../../assets/_sheet_window_02.png';
import uiWindowJSON from '../../assets/ui-window-frames.json';
import parchment from '../../assets/background-parchment.jpg';
import arrow from '../../assets/arrow_118.png';
import farmer from '../../assets/farmer.png';
import summaryIcon from '../../assets/summary-icon.png';
import clashIcon from '../../assets/clash-icon.png';
import resourceIcon from '../../assets/resource-icon.png';
import newsIcon from '../../assets/news-icon.png';
import bar from '../../assets/bar.png';

//ToDo: package all these misc icons into a sheet

export default function loadGraphics(startupCallback, graphicalResources) {
    
    //load individual
    graphicalResources.misc = {
        arrow,
        parchment,
        clashIcon,
        resourceIcon,
        newsIcon,
        bar,
        summaryIcon
    };

    graphicalResources.citizens = {
        farmer
    };

    //load spriteSheets
    let resourcesReady = 0;
	const tilesBaseTexture = PIXI.BaseTexture.fromImage(overworldTileset);
	tilesBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
	const tilesSheet = new PIXI.Spritesheet(tilesBaseTexture, overworldTilesetJSON);

	const windowBaseTexture = PIXI.BaseTexture.fromImage(uiWindow);
	windowBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	const windowSheet = new PIXI.Spritesheet(windowBaseTexture, uiWindowJSON);
	const resourceSheets = [
		{name: "windowSheet", resource: windowSheet},
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