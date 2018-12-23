
    const settings = {
        'easy': {
            startingResources: { 'food': 20, 'wood': 40, 'silver': 50, 'popGrowth': 0 },
            startingPopulation: { 'farmers': 2, 'militia': 2, 'militiaAvailable': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1 }   
        },
        'medium': {
            startingResources: {'food': 20, 'wood': 40, 'silver': 50, 'popGrowth': 0},
            startingPopulation: {'farmers': 2, 'militia': 2, 'militiaAvailable': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1}   
        },
        'hard': {
            startingResources: { 'food': 20, 'wood': 40, 'silver': 50, 'popGrowth': 0 },
            startingPopulation: { 'farmers': 2, 'militia': 2, 'militiaAvailable': 2, 'artisans': 1, 'commoners': 2, 'woodsmen': 1 }   
        } 
    }
    export default function(difficulty){
        return settings[difficulty];
    }
