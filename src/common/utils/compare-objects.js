//used when updating resources/population totals
//ignores the militia available property


    export default function(a, b){
        let results = {};
        for (let key in b){
            let change = b[key] - a[key];
            if (key !== 'militiaAvailable' && key !== 'popGrowth' && change !== 0) results[key] = change;
        }
        return results;
    }
