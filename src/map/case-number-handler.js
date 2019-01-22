export default class CaseNumberHandler {
    constructor() {
        this.NoneMissing = 0;
        this.TopLeftMissing = 1;
        this.TopRightMissing = 2;
        this.AllTopMissing = 3;
        this.BottomLeftMissing = 4;
        this.AllLeftMissing = 5;
        this.TopRightAndBottomLeftMissing = 6;
        this.AllLeftAndAllTopMissing = 7;
        this.BottomRightMissing = 8;
        this.TopLeftAndBottomRightMissing = 9;
        this.AllRightMissing = 10;
        this.AllRightAndAllTopMissing = 11;
        this.AllBottomMissing = 12;
        this.AllLeftAndAllBottomMissing = 13;
        this.AllRightAndAllBottomMissing = 14;
        this.Isolated = 15;
    }


    onlyHasCornersMissing(caseNumber) {
        return caseNumber === this.TopLeftMissing
            || caseNumber === this.TopRightMissing
            || caseNumber === this.BottomLeftMissing
            || caseNumber === this.BottomRightMissing
            || caseNumber === this.TopLeftAndBottomRightMissing
            || caseNumber === this.TopRightAndBottomLeftMissing;
    }

    hasBreakingBorderOnTop(caseNumber) {
        return caseNumber === 3
            || caseNumber === 7
            || caseNumber === 11;
    }

    hasBreakingBorderOnBottom(caseNumber) {
        return caseNumber === 12
            || caseNumber === 13
            || caseNumber === 14;
    }
}