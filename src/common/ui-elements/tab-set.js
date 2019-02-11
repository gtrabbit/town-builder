export default class TabSet {
    constructor(tabs) {
        this.tabs = tabs;
        this.registerTabs(this.tabs);
    }

    registerTabs(tabs) {
        tabs.forEach(tab => {
            tab.registerWithTabSet(this.handleTabClick.bind(this));
        });
    }

    handleTabClick(tab) {
        this.tabs.forEach(element => {
            if (element.active) element.setInactive();
        });
    }
}