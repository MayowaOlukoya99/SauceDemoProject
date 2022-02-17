class SauceDemoPage {
    getUsernameField(){
        return cy.get('[data-test="username"]')
    }
    getPasswordField(){
        return cy.get('[data-test="password"]')
    }
    getLoginBtn(){
        return cy.get('[data-test="login-button"]')
    }
    getLoginErrorMsg(){
        return cy.get('.error-message-container')
    }
    getErrorIcon(){
        return cy.get('.error-button')
    }
    getMenuIcon(){
        return cy.get('#react-burger-menu-btn')
    }
    getLogoutBtn(){
        return cy.get('#logout_sidebar_link')
    }
    getInventoryItems(){
        return cy.get('.inventory_item')
    }
    getItemPrices(){
        return cy.get('.inventory_item_price')
    }
    getFilterDropdown()
    {
        return cy.get('select[data-test="product_sort_container"]')
    }
    getAddCartBtn(){
        return cy.get('button.btn_inventory')
    }
    getCartContainer()
    {
        return cy.get(".cart_item")
    }
    getCartNumber()
    {
        return cy.get(".shopping_cart_badge")
    }
    getRemoveBtn()
    {
        return cy.get(".item_pricebar button")
    }
    getShoppingCartBtn()
    {
        return cy.get('#shopping_cart_container > a', {timeout:10000})
    }
}
export default SauceDemoPage;