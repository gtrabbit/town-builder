import Game from './core/game';
import * as PIXI from 'pixi.js';
import makeSettings from './core/settings';
import './styles/styles.scss';
import overworldTilesetJSON from '../assets/frames.json';
import overworldTileset from '../assets/overworld-tiles.png';

load();

function load() {
	loadSprites();
}


function startup(resources){
	
	const screenHeight = 800;
	const screenWidth = 900;
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
	
	//have a UI element to decide this, or load from a DB
	const isNewGame = true;
	let state = {};

	if (isNewGame){
		const settings = makeSettings('medium');
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

	const thisGame = new Game(state, screenWidth, screenHeight, stage, renderer, animationHook)

	thisGame.setStage();
	thisGame.update();
}

function loadSprites() {
	const baseTexture = PIXI.BaseTexture.fromImage(overworldTileset);
	var sheet = new PIXI.Spritesheet(baseTexture, overworldTilesetJSON);
	sheet.parse((textures) => {
		PIXI.mySpritesheet = sheet;
		startup(sheet);
	});
}
