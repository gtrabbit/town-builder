
export default class TabContentOrganizer {
    constructor(tabs) {
        this.categories = tabs.map(config => config.category);
        this.content = {};
    }

    categorize(contentItems) {
        this.categories.forEach(key => {
            this.content[key] = [];
        });
        contentItems.forEach(e => {
            this.content[e.category].push(e);
        });
        return this.content;
    }
}