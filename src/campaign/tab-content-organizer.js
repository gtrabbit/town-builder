
export default class TabContentOrganizer {
    constructor(tabsetConfig) {
        this.categories = tabsetConfig.tabConfigs.map(config => config.category);
        this.content = {};
    }

    categorize(contentItem) {
        this.categories.forEach(key => {
            this.content[key] = [];
        });
        contentItem.forEach(e => {
            this.content[e.category].push(e);
        });
        return this.content;
    }
}