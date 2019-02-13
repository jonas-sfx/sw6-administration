const productStreamPage = require('administration/page-objects/module/sw-product-stream.page-object.js');

module.exports = {
    '@tags': ['product', 'product-stream-delete', 'product-stream', 'delete'],
    '@disabled': !global.flags.isActive('next739'),
    before: (browser, done) => {
        global.AdminFixtureService.create('product-stream').then(() => {
            done();
        });
    },
    'navigate to product stream module': (browser) => {
        browser
            .openMainMenuEntry({
                mainMenuPath: '#/sw/product/index',
                menuTitle: 'Product',
                index: 1,
                subMenuItemPath: '#/sw/stream/index',
                subMenuTitle: 'Product streams'
            });
    },
    'check if new product stream exists in overview': (browser) => {
        const page = productStreamPage(browser);

        browser
            .waitForElementPresent('.sw-button__content')
            .assert.urlContains('#/sw/product/stream/index')
            .expect.element(page.elements.smartBarHeader).to.have.text.that.contains('Product streams');
        browser.expect.element(`${page.elements.gridRow}--0`).to.have.text.that.contains(global.AdminFixtureService.basicFixture.name);
    },
    'verify product stream details': (browser) => {
        const page = productStreamPage(browser);

        browser
            .waitForElementPresent('.sw-sidebar__navigation .sw-sidebar-navigation-item')
            .click('.sw-sidebar__navigation .sw-sidebar-navigation-item')
            .waitForElementVisible(`${page.elements.gridRow}--0 ${page.elements.contextMenuButton}`)
            .click(`${page.elements.gridRow}--0 ${page.elements.contextMenuButton}`)
            .waitForElementVisible(page.elements.contextMenu)
            .click(`${page.elements.contextMenu} .sw-context-menu-item__text`)
            .waitForElementNotPresent(page.elements.loader)
            .expect.element(page.elements.smartBarHeader).to.have.text.that.contains(global.AdminFixtureService.basicFixture.name);
    },
    'delete product stream': (browser) => {
        const page = productStreamPage(browser);

        browser
            .openMainMenuEntry({
                mainMenuPath: '#/sw/product/index',
                menuTitle: 'Product',
                index: 1,
                subMenuItemPath: '#/sw/stream/index',
                subMenuTitle: 'Product streams'
            })
            .expect.element(page.elements.smartBarAmount).to.have.text.that.contains('(1)');

        page.deleteProductStream(global.AdminFixtureService.basicFixture.name);

        browser
            .waitForElementNotPresent(page.elements.loader)
            .expect.element(page.elements.smartBarAmount).to.have.text.that.contains('(1)');
    },
    after: (browser) => {
        browser.end();
    }
};
