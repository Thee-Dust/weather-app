describe('Landing Page', () => {
	let apiKey
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoFutureForecastFahrenheit(apiKey)
		cy.visit('http://localhost:3000')
	})

	it('Should have app name', () => {
		cy.get('.home > h1').should('contain', 'The Duststorm')
	})

	it('Should be able to search for locations', () => {
		cy.get('#custom-css-standard-input').type('Orlando').type('{enter}')
	})
})