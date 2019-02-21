import TabOrganizer from '../ui-elements/tab-content-organizer';
import TextWrapper from '../../common/text-wrapper';

export default class TabSet {
    constructor(tabs, textArea) {
        this.tabs = tabs;
        this.registerTabs(this.tabs);
        this.activeTab = null;
        this.tabOrganizer = new TabOrganizer(tabs);
        this.contentContainer = textArea;
    }

    registerTabs(tabs) {
        tabs.forEach(tab => {
            tab.registerWithTabSet(this.handleTabClick.bind(this));
        });
    }

    setActiveTab(tab) {
        this.contentContainer.removeChildren();
        const content = this.content[tab.category];
        let yPos = 0;
        content.forEach((message, index) => {
            yPos += 24;
            const wrapper = new PIXI.Container();
            const title = new TextWrapper(message.title);
            title.ui.position.set(0, yPos);
            const sentences = message.contents.map(c => new TextWrapper(c));
            wrapper.addChild(title.ui);            
            sentences.forEach((s,i) => {
                yPos += 16;
                wrapper.addChild(s.ui);
                s.ui.position.set(16, yPos);
            });
            this.contentContainer.addChild(wrapper);
        });
    }

    handleTabClick(tab) {
        this.setActiveTab(tab);
        this.tabs.forEach(element => {
            if (element.active) element.setInactive();
        });
    }

    updateContent(content) {
        const organizedContent = this.tabOrganizer.categorize(content);
        let activeKey = 0;
        for (const key in organizedContent) {
            if (organizedContent.hasOwnProperty(key)) {
                const element = organizedContent[key];
                if (element.length > 0) {
                    this.tabs.find(tab => tab.category === key).setAlert()
                    if (activeKey === 0) activeKey = key;
                }
            }
        }
        this.content = organizedContent;
        if (activeKey !== 0) this.tabs.find(tab => tab.category === activeKey).setActive();

    }
}