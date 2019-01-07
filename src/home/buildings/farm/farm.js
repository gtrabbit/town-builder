import farmUI from './farm-ui';
import Building from '../building-base';

    const typeName = 'farm';
    
    export default class Farm extends Building {
        constructor(tile, level){
            super(tile, level, typeName);
            this.benefits = this.setBenefits();
            this.type = typeName;
            this.displayName = 'farm';
            this.buildTime = 3;
            this.buildingYield = 1;
            this.currentLoad = 0;
            this.capacity = 3;
            if (tile) { //if we pass a tile, then we know this is an actual implementation and should build the UI
                this.ui = new farmUI(tile, level);  
            }
        }

        static getCosts(level) {
            const costs = [
                {wood: -30, silver: -15},
                {wood: -30, silver: -20},
                {wood: -40, silver: -25},
                {wood: -60, silver: -30},
                {wood: -80, silver: -40}
            ];
            return level !== undefined 
                ? costs[level]
                : costs;
        }

        static isAvailable(state) {
            return true;
        }

        static getTypeName() {
            return typeName;
        }

        typeUse() {
            this.currentLoad++;
        }

        levelUp(level) {
            this.capacity = 3 + level;
            this.buildingYield = Math.round(1 + (level / 3));
        }

        setBenefits() {
            this.benefits = {};
            return this.benefits;
        }

        reset() {
            this.currentLoad = 0;
        }

    }
