//is a shallow clone, obviously

    export default function(a){
        const clone = {};
        for (let key in a){
            clone[key] = a[key];
        }
        return clone;
    }
