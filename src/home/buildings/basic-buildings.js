import Farm from './farm';
import House from './house';
import Market from './market';
import Tower from './tower';
import Cabin from './cabin';
    const classList = [Farm, House, Market, Tower, Cabin];
    
    export default {
        typeNames: classList.map(a => new a().type),
        classes: classList.reduce((acc, type) => {
            let classInstance = new type();
            acc[classInstance.type] = type;
            return acc;
        }, {})
    }
