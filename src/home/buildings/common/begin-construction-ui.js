import fromCamelCase from '../../../common/utils/from-camel-case';
import {typographyStyles as styles} from '../../../core/settings';
import textFlash from '../../../common/animations/text-flash';
import textPop from '../../../common/animations/text-pop';

const style = styles.basic;


    export default function(tile, buildings){
        let buildingCosts = buildings.reduce((result, b) => {
            result[b.getTypeName()] = b.getCosts(0);
            return result;
        }, {});

        const labels = [];

        return {
            onDismiss: function(){ //this is bound to tile
                //do something?
            },

            init: function(){
                const assignListeners = (buyBuildingType) => {
                    buyBuildingType.on('pointerover', highlight.bind(buyBuildingType));
                    buyBuildingType.on('pointerout', unhighlight.bind(buyBuildingType));
                    buyBuildingType.on('click', purchase.bind(this));
                }

                const messageContainer = new PIXI.Container();
                const heading =         new PIXI.Text("Available Buildings:               Costs:", style);
                const headSubtitle =    new PIXI.Text("wood / silver", style);

                let index = 0;
                for (let key in buildingCosts) {
                    if (buildingCosts.hasOwnProperty(key)) {
                        let buildingTypeName = fromCamelCase(key, true);
                        let costWrapper = new PIXI.Container();
                        let buildingName =  new PIXI.Text(buildingTypeName, style);
                        buildingName.position.x = 5;
                        let spacing = 100 - buildingTypeName.length * 0.8;
                        const woodCostString = "" + buildingCosts[key].wood;
                        let woodCost = new PIXI.Text(`${-buildingCosts[key].wood}`, style);
                        
                        woodCost.position.x = spacing;                        
                        let slash = new PIXI.Text("/", style);
                        slash.position.x = spacing + woodCostString.length + 10;
                        let silverCost = new PIXI.Text(`${-buildingCosts[key].silver}`, style);
                        silverCost.position.x = spacing + 20;
                        costWrapper.addChild(buildingName, silverCost, slash, woodCost);
                        costWrapper.name = key + "-wrapper";
                        let buyBuildingType =  new PIXI.Text("-- Buy", style);
                        buyBuildingType.name = key;
                        costWrapper.position.set(5, 60 + (index * 18));
                        buyBuildingType.position.set(205, 60 + (index * 18));
                        buyBuildingType.interactive = true;
                        buyBuildingType.buttonMode = true;
                        assignListeners(buyBuildingType);
                        messageContainer.addChild(buyBuildingType, costWrapper);
                        labels.push(costWrapper);
                        index++;
                    }
                }
                
                heading.position.set(7, 15);
                headSubtitle.position.set(135, 35);
                messageContainer.addChild(heading, headSubtitle);

                function purchase(e) {
                    if (tile.build(e.target.name)){
                        this.close();
                    } else {
                        warn(e.target.name + '-wrapper');
                    }
                }
                
                function highlight(e) {
                    textPop(e.target, 1);                    
                }

                function unhighlight(e) {
                    textPop(e.currentTarget, 0);
                }

                function warn(labelName) {
                    let label = labels.find(a => a.name === labelName);
                    label.children.forEach((a, i) => { if ( i > 0) textFlash('black', 'red', a)});
                }

                return messageContainer;
            }
        }
    }
