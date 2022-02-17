/// <reference types= "cypress" />
import SauceDemoPage from "../pageObject/SauceDemoPage";

const data=require('../fixtures/sauce-demo.json');

const standardUsername = data.standardUsername;
const lockedOutUsername = data.lockedOutUsername;
const problemUsername = data.problemUsername;
const performanceGlitchUsername = data.performanceGlitchUsername;
const password = data.password;

const sauceDemoPage = new SauceDemoPage();

let lowest = 0;
let highest= 0;
let containerCount = 0;

describe('Scenario 1', function (){
    before('Navigate to Sauce Demo', function () {
        cy.openUrl()
    })
    beforeEach('Preserve cookies', function (){
        cy.restoreLocalStorage()
        Cypress.Cookies.preserveOnce('session-username', 'standard_user');
    })
    afterEach(function (){
        cy.saveLocalStorage()
    })

    //SCENARIO 1
    it('should verify that user cannot login with a locked account', function () {
        cy.login(lockedOutUsername, password)
        sauceDemoPage.getLoginErrorMsg().then($el=>{
            expect($el.text()).to.eq("Epic sadface: Sorry, this user has been locked out.")
        })
        sauceDemoPage.getErrorIcon().click()
    });
    it('should verify that user can login with problem user', function () {
        cy.login(problemUsername, password)
        cy.url().should('include', 'inventory.html')
        cy.logout()
    });
    it.skip('should verify that user can login with performance glitch user', function () {
        cy.login(performanceGlitchUsername, password)
        cy.url().should('include', 'inventory.html')
        cy.logout()
    });
    it('should verify that user can login with standard user', function () {
        cy.login(standardUsername, password)
        cy.url().should('include', 'inventory.html')
        cy.logout()
    });

    //SCENARIO 2
    it('should verify that user can login with standard user', function () {
        cy.login(standardUsername, password)
        cy.url().should('include', 'inventory.html')
    });
    it('should validate number of items on the page', function () {
        sauceDemoPage.getInventoryItems().should('have.length', 6)
    });
    it('should verify that user can filter items by price(low to high)', function () {
        sauceDemoPage.getFilterDropdown().select(2)
        sauceDemoPage.getItemPrices().first().then($el=>{
            lowest = parseFloat($el.text().replace(/[$]/g, ''))
        })
        sauceDemoPage.getItemPrices().last().then($el=>{
            highest = parseFloat($el.text().replace(/[$]/g, ''))
        })
        sauceDemoPage.getItemPrices().each(($el, index, $list)=>{
            if(index!==0){
                expect(lowest).to.be.lessThan(parseFloat($el.text().replace(/[$]/g, '')))
            }
            if(index!==$list.length-1){
                expect(highest).to.be.greaterThan(parseFloat($el.text().replace(/[$]/g, '')))
            }
        })
    });

    //SCENARIO 3
    it('should verify that user can add items to cart', function () {
        data.product.forEach((itemName)=>{
            cy.pickItem(itemName)
        })
        sauceDemoPage.getShoppingCartBtn().click()
    });
    it('should validate number of items selected', function () {
        sauceDemoPage.getCartContainer().then($el=>{
            containerCount = $el.length;
        })
        sauceDemoPage.getCartNumber().then(($el)=>{
            expect(Number($el.text())).to.equal(containerCount)
        })
    });
    it('should verify that user can remove an item from cart', function () {
        sauceDemoPage.getRemoveBtn().first().click()
        sauceDemoPage.getCartContainer().then($el=>{
            expect($el.length).to.eq(containerCount-1);
        })
        sauceDemoPage.getCartContainer().contains(data.product[0])
            .should('not.exist')
    });
})
