describe('Currency Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('should display the currency form', () => {
    cy.get('.currency-form').should('be.visible');
  });

  it('should enter 100 in the fromAmount input', () => {
    cy.get('input[formcontrolname="fromAmount"]')
      .wait(5 * 1000)
      .clear()
      .type('100');
    cy.get('input[formcontrolname="fromAmount"]').should('have.value', '100');
  });

  it('should change the toCurrency to EUR', () => {
    cy.get('app-currency-dropdown[dropdownType="toCurrency"] mat-select')
      .click()
      .get('mat-option')
      .contains('EUR')
      .click();
    cy.get(
      'app-currency-dropdown[dropdownType="toCurrency"] mat-select'
    ).should('contain.text', 'EUR');
  });

  it('should click on the exchange icon to swap currencies', () => {
    cy.get('#exchange-icon').click();
    cy.get('app-currency-dropdown[dropdownType="toCurrency"]').should(
      'contain.text',
      'USD'
    );
    cy.get('app-currency-dropdown[dropdownType="fromCurrency"]').should(
      'contain.text',
      'RUB'
    );
  });
});
