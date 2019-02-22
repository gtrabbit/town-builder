import Game from './core/game';
import * as PIXI from 'pixi.js';
import makeSettings from './core/settings';
import './styles/styles.scss';
import loadAssets from './core/load-assets';

export var graphicalResources = {};

load();

function load() {
	loadAssets(startup, graphicalResources);
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
		{backgroundColor: 0x111111});
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
	thisGame.update(); //this increments by one day at the beginning, which I might not want to do. Was necessary at some point, but should look into going without it.
}



