import Farm from './farm/farm';
import House from './house/house';
import Market from './market/market';
import Tower from './tower/tower';
import Cabin from './cabin/cabin';
    const classList = [Farm, House, Market, Tower, Cabin];
    
    export default {
        typeNames: classList.map(a => new a().type),
        classes: classList.reduce((acc, type) => {
            let classInstance = new type();
            acc[classInstance.type] = type;
            return acc;
        }, {})
    }
