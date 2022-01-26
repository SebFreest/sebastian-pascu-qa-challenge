import { expect } from "chai";
import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
import checkoutPage from "../../page-objects/checkoutPage";


Then(/^I am on Sauce Demo landing page$/, function () {
    cy.url().should('contain', checkoutPage.landingPageUrl);
    checkoutPage.appLogo.should('be.visible');
    checkoutPage.inventoryList.should('be.visible');
});

When(/^I add to the cart the product with name "([^"]*)"$/, function (productName) {
    checkoutPage.addProductToCartByName(productName);
});

When(/^I select shopping cart icon$/, function () {
    checkoutPage.selectShoppingCart();
});

Then(/^I am on the Shopping Cart page$/, function () {
    cy.url().should('contain', checkoutPage.shoppingCartPageUrl);
});

When(/^I proceed to checkout$/, function () {
    checkoutPage.selectCheckoutButton();
});

When(/^I fill in the checkout details: "([^"]*)", "([^"]*)", "([^"]*)"$/, function (firstName, lastName, postCode) {
    checkoutPage.updateCheckoutForm(firstName, lastName, postCode);
});

When(/^I select continue$/, function () {
    checkoutPage.continueBtn.click();
});

When(/^I am on Checkout Overview page$/, function () {
    cy.url().should('contain', checkoutPage.checkoutOverviewUrl);
    checkoutPage.checkoutOverviewTitle.should('be.visible').should('have.text', 'Checkout: Overview');
});

Then(/^I should see item total price equal to the price of items added to the cart$/, function () {
    const isCorrectPrice = checkoutPage.isProductsPriceEqualWithItemTotal();
    expect(isCorrectPrice).to.equal(true);
});
