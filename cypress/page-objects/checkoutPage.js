class checkoutPage {

    //section to declare the selctors 
    get appLogo() { return cy.get('.app_logo'); }
    get inventoryList() { return cy.get('.inventory_list'); }
    get productList() { return cy.get('.inventory_item_description'); }
    get shopingCartLink() { return cy.get('.shopping_cart_link'); }
    get checkoutBtn() { return cy.get('[data-test="checkout"]'); }
    get firstNameInput() { return cy.get('[data-test="firstName"]'); }
    get lastNameInput() { return cy.get('[data-test="lastName"]'); }
    get postCodeInput() { return cy.get('[data-test="postalCode"]'); }
    get continueBtn() { return cy.get('[data-test="continue"]'); }
    get productsPrice() { return cy.get('.inventory_item_price'); }
    get itemTotalPrice() { return cy.get('.summary_subtotal_label'); }
    get checkoutOverviewTitle() { return cy.get('.title'); }

    //xpath selectors in order to be able to select a specific button of a specific product (it can be improved in order to do not use xpath)
    get productByName() { return (productName) => cy.xpath(`//*[@class="inventory_item_name" and text()=\'${productName}\']/ancestor::div[@class="inventory_item_description"]//button`); }

    landingPageUrl = 'inventory';
    shoppingCartPageUrl = 'cart';
    checkoutOverviewUrl = 'checkout-step-two';

    //method to add a product by name into the cart
    addProductToCartByName(productName) {
        this.productByName(productName).click();
        this.checkRemoveButtonVisible(productName);
    }

    checkRemoveButtonVisible(productName) {
        this.productByName(productName).should('have.text', 'Remove');
    }

    selectShoppingCart() {
        this.shopingCartLink.click();
    }

    selectCheckoutButton() {
        this.checkoutBtn.click();
    }

    updateCheckoutForm(firstName, lastName, postCode) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.postCodeInput.type(postCode);
    }

    getAddedProductsPrice() {
        this.productsPrice.invoke('text').then((val) => {
            const allPrice = val.split('$');
            var results = allPrice.map((x) => +x);
            console.log(results);
            let total = 0;
            results.forEach((ele) => {
                total = total + ele;
            })
            return total;
        })
    }

    getItemTotal() {
        this.itemTotalPrice.invoke('text').then((val) => {
            const extractPrice = val.split('$');
            return parseInt(extractPrice[1]);
        })
    }

    isProductsPriceEqualWithItemTotal() {
        return (this.getAddedProductsPrice() == this.getItemTotal() ? true : false);
    }

}

export default new checkoutPage();