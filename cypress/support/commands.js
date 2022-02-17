/// <reference types= "cypress" />
import SauceDemoPage from "../pageObject/SauceDemoPage";

const sauceDemoPage = new SauceDemoPage();

Cypress.Commands.add('openUrl', ()=>{
    cy.visit(Cypress.env('url'))
})

Cypress.Commands.add('login', (username, password)=>{
    sauceDemoPage.getUsernameField().clear().type(username)
    sauceDemoPage.getPasswordField().clear().type(password, {log:false})
    sauceDemoPage.getLoginBtn().click()
})

Cypress.Commands.add('logout', ()=>{
    sauceDemoPage.getMenuIcon().should('be.visible').click()
    sauceDemoPage.getLogoutBtn().should('be.visible').click()
})

Cypress.Commands.add('pickItem', (itemName)=>{
    sauceDemoPage.getInventoryItems().each(($el, index, $list)=>{
        const item = $el.text()
        if(item.includes(itemName))
        {
            sauceDemoPage.getAddCartBtn().eq(index).click()
        }
    })
})