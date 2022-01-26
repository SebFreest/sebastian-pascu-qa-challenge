import { Given, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../page-objects/loginPage";


Given(/^I am on the Sauce Demo login page$/, function () {
    loginPage.navigateToBaseUrl();
});

Given(/^I am login as User: "([^"]*)" and Password: "([^"]*)"$/, function (username, password) {
    loginPage.login(username, password);
});

Then(/^I should see the error messages displayed$/, function () {
    loginPage.loginErrorMessage.should('be.visible');
    loginPage.loginErrorMessage.should('have.text', loginPage.loginErrorMessageText);
});