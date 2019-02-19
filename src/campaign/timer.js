
    export default class Timer {
        constructor(duration){
            this.duration = duration;
        }

        modifyDuration(amount){
            this.duration = amount ? this.duration + amount : this.duration - 1;
            return this.duration;
        }

        checkDuration(){
            return this.duration;
        }
    }
