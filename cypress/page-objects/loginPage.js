class LoginPage {

    //section to declare the selectors

    get usernameInput() { return cy.get('[data-test="username"]'); }
    get passwordInput() { return cy.get('[data-test="password"]'); }
    get loginButton() { return cy.get('[data-test="login-button"]'); }
    get loginErrorMessage() { return cy.get('[data-test="error"]'); }


    loginErrorMessageText = 'Epic sadface: Sorry, this user has been locked out.';

    //method for loading the homepage, baseUrl defined in config file
    navigateToBaseUrl() {
        cy.visit('/');
    }

    //generic login method
    login(username, password) {
        this.usernameInput.type(username);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new LoginPage();