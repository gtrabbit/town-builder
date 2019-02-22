
    export default class DefenseManager {
        constructor(home) {
            this.home = home;
            this.baseDefense = 0;
            this.defenseModifier = 0;
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
        
        getTotalDefense(territory) {
            const tileDefenses = territory.reduce((a, b) => a + b.getDefense(), 0);
            return tileDefenses + this.getDefenseModifier();
        }

        determineLosses(territory, def){ //more here some day, obviously			
            const totalDanger = this.findPerimeterDanger(territory);
           // console.log("total danger", totalDanger);
            let adjustedDanger = totalDanger - this.getTotalDefense(territory);
            territory.forEach(tile => {

            });
            console.log("adjustedDanger:", adjustedDanger);
		}

		findPerimeterDanger(territory){
			const surroundingSquares = {};
			territory.forEach(a=>{
				let individualDanger = 0;
				a.getNeighborTiles().forEach(a=>{
					if (a && a.type === 'wilds') {
						surroundingSquares[a.UID] = a.getDanger();
						individualDanger += a.getDanger();
					}	
                });               
				a.setThreatLevel(individualDanger);
			})
			let total = 0;
			for (let key in surroundingSquares){
				total += surroundingSquares[key];
            }
			return total;
		}

    }
