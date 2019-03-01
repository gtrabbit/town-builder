export default class DangerHandler {
    constructor(getNeighborTiles, growthRate) {
        this.getNeighborTiles = getNeighborTiles;
        this.growthRate = growthRate;
        this.dangerValue = 1;
    }

    getDanger() {
        return this.dangerValue;
    }

    incrementDanger(dangerModifier) {
        let chance = 1;        

        this.getNeighborTiles().forEach((a) => {
            chance += a.getDanger();	
            });
        chance += dangerModifier;

        if (chance > (Math.random() * this.growthRate * 5)){
            this.dangerValue++;
        } 
    }
}