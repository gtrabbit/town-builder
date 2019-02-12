import Game from './core/game';
import * as PIXI from 'pixi.js';
import makeSettings from './core/settings';
import './styles/styles.scss';
import overworldTilesetJSON from '../assets/frames.json';
import overworldTileset from '../assets/overworld-tiles.png';
import uiWindow from '../assets/_sheet_window_02.png';
import uiWindowJSON from '../assets/ui-window-frames.json';
import uiBackground from '../assets/background-parchment.jpg';
import blackArrow from '../assets/arrow_118.png';

export const graphicalResources = {misc: {}};

load();

function load() {
	loadSprites();
}

function startup(resources){

	//have a UI element to decide this, or load from a DB
	const isNewGame = true;
	let state = {};
	let settings = {};
	if (isNewGame){
		settings = makeSettings('medium');
		state = {
			width: 55,
			growthRate: 5,
			height: 55,
			startingResources: settings.startingResources,
			startingPopulation: settings.startingPopulation
		}
		
	} else {
		//xhr to get the game state
		// then state = {something else...}
	}
	
	const screenHeight = settings.displayHeight;
	const screenWidth = settings.displayWidth;
	const app = new PIXI.Application(
		screenWidth,
		screenHeight,
		{backgroundColor: 0x111111})
	const renderer = app.renderer;
	app.view.className = "application"
	document.body.appendChild(app.view);
	const stage = app.stage;
	stage.name = 'stage';
	const animationHook = app.ticker;

	//fix this eventually, obviously
	document.getElementById('grow').addEventListener('click', function(){
		thisGame.update();
	})
	document.getElementById('log').addEventListener('click', function(){
		console.log(thisGame)
	})
	


	const thisGame = new Game(state, screenWidth, screenHeight, stage, renderer, animationHook)

	thisGame.setStage();
	thisGame.update();
}

function loadSprites() {
	let resourcesReady = 0;
	const tilesBaseTexture = PIXI.BaseTexture.fromImage(overworldTileset);
	tilesBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST
	const tilesSheet = new PIXI.Spritesheet(tilesBaseTexture, overworldTilesetJSON);

	const windowBaseTexture = PIXI.BaseTexture.fromImage(uiWindow);
	windowBaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
	const windowSheet = new PIXI.Spritesheet(windowBaseTexture, uiWindowJSON);
	
	graphicalResources.misc.arrow = blackArrow;
	graphicalResources.misc.parchment = uiBackground;
	const resourceSheets = [
		{name: "windowSheet", resource: windowSheet},
		{name: "tileSheet", resource: tilesSheet}
	];
	resourceSheets.forEach(res => {
		res.resource.parse(texture => {
			graphicalResources[res.name] = res.resource;
			resourcesReady++;
			if (resourcesReady === resourceSheets.length) {
				startup({});
			}
		})
	});
}


