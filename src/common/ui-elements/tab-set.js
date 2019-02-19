export default class TabSet {
    constructor(tabs) {
        this.tabs = tabs;
        this.registerTabs(this.tabs);
        this.activeTab = null;
    }

    registerTabs(tabs) {
        tabs.forEach(tab => {
            tab.registerWithTabSet(this.handleTabClick.bind(this));
        });
    }

    setActiveTab(tab) {
        this.currentContent = tab.content;
        console.log(this.currentContent);
    }

    handleTabClick(tab) {
        this.setActiveTab(tab);
        this.tabs.forEach(element => {
            if (element.active) element.setInactive();
        });
    }
}