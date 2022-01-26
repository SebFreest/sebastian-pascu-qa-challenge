Feature: Feature name

    Using the following URL https://www.saucedemo.com please write an end to end test for the  following flows:
    Using standard_user, select two random items from “PRODUCTS” page, add them to cart  and proceed to checkout.
    At the “Checkout overview” page, validate that “item  total” price is equal to the price of items added on the “PRODUCTS” page.
    Write a test as  well for the locked_out_user

    Background:
        Given I am on the Sauce Demo login page

    Scenario: Verify item total price is correct in the shopping cart
        When I am login as User: "standard_user" and Password: "secret_sauce"
        Then I am on Sauce Demo landing page
        When I add to the cart the product with name "Sauce Labs Backpack"
        And I add to the cart the product with name "Sauce Labs Onesie"
        And I select shopping cart icon
        And I am on the Shopping Cart page
        When I proceed to checkout
        And I fill in the checkout details: "Sebastian", "Pascu", "123451"
        And I select continue
        When I am on Checkout Overview page
        Then I should see item total price equal to the price of items added to the cart

    Scenario: Verify locked user is not able to login
        When I am login as User: "locked_out_user" and Password: "secret_sauce"
        Then I should see the error messages displayed
        