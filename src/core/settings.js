
    const difficultySettings = {
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
    };

    export const displaySettings = {
        displayHeight: 600,
        displayWidth: 800
    }

    export function typographyStyles(type, color = 'black') {
        switch(type) {
            default:
                return {
                    fontFamily: 'Georgia',
                    fontSize: '10pt',
                    wordWrap: true,
                    wordWrapWidth: 230,
                    padding: 10,
                    fill: color
                }
        }
    }

    export default function(difficulty){
        return {
            ...difficultySettings[difficulty],
            ...displaySettings,
            ...typographyStyles
        };
    }
    
