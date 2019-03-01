import LossModel from './loss-model';

    export default class DefenseManager {
        constructor(home, difficulty) {
            this.home = home;
            this.baseDefense = 0;
            this.defenseModifier = 0;
            this.individualTileThreats = {};
            this.currentTotalDanger = 0;
            this.dangerZone = 10;
            this.lossChance = difficulty.lossChance;
        }

        getDefense() {
            return this.baseDefense;
        }

        modifyDefenseModifier(newValue) {
            this.defenseModifier += newValue;
            return this.getDefenseModifier();
        }

        getDefenseModifier() {
            return this.defenseModifier;
        }
        
        getTotalDefense(territory, populationDefenseBonus) {
            const tileDefenses = territory.reduce((a, b) => a + b.getDefense(), 0);
            return tileDefenses + this.getDefenseModifier() + populationDefenseBonus;
        }

        determineLosses(populationDefenseBonus) { //more here some day, obviously			
            const tileLosses = [];
            let citizenLosses = 0;
            const territory = this.home.getTerritory();
            this.findPerimeterDanger(territory, populationDefenseBonus);
            let adjustedDanger = Math.max(this.currentTotalDanger - this.getTotalDefense(territory, populationDefenseBonus), 0);
            console.log(adjustedDanger);
            let scaleBackAsLossesStack = 0;
            if (adjustedDanger > this.dangerZone / 2) {
                for (let key in this.individualTileThreats) {
                    const value = this.individualTileThreats[key] - scaleBackAsLossesStack;
                    if (value > this.dangerZone) {
                        const specificLossChance = value - this.dangerZone;
                        const citizenLoss = this.rollForIndividualLoss(specificLossChance, scaleBackAsLossesStack);
                        if (citizenLoss) {
                            citizenLosses++;
                            scaleBackAsLossesStack++;
                        }
                        let tileLoss = this.rollForIndividualLoss(specificLossChance, scaleBackAsLossesStack);
                        if (tileLoss) {
                            tileLosses.push(key);
                            scaleBackAsLossesStack++;
                        }                        
                    }
                }
            }
            const lossModel = new LossModel(tileLosses, citizenLosses);
            return lossModel;
        }

        rollForIndividualLoss(specificLossChance, scaleBackOffset) {
            return ((Math.random() * specificLossChance) * this.lossChance) - scaleBackOffset > this.dangerZone;
        }
        
        getPopulationDefenseOffsetPerIndividualTile(populationDefenseBonus, territoryCount) {
            return Math.max(1, Math.round(populationDefenseBonus / territoryCount));
        }

		findPerimeterDanger(territory, populationDefenseBonus) {
            this.individualTileThreats = {};
            const surroundingSquares = {};
            const individualTileOffsetBasedOnPopulationBonus = this.getPopulationDefenseOffsetPerIndividualTile(populationDefenseBonus, territory.length);
			territory.forEach(a=>{
				let individualDanger = 0;
				a.getNeighborTiles().forEach(a=>{
					if (a && a.type === 'wilds') {
						surroundingSquares[a.UID] = a.getDanger();
						individualDanger += a.getDanger();
					}	
                });               
                a.setThreatLevel(individualDanger);
                this.individualTileThreats[a.UID] = Math.max(a.getCurrentThreat() - individualTileOffsetBasedOnPopulationBonus, 0);
			})
			let total = 0;
			for (let key in surroundingSquares){
				total += surroundingSquares[key];
            }
			this.currentTotalDanger = total;
		}

    }
