describe('Current Forecast', () => {
	let apiKey;
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoFutureForecastFahrenheit(apiKey)
		cy.visit('http://localhost:3000')
		cy.searchOrlando()
	})

	it('Should display current time and place', () => {
		cy.get('.current-forecast > :nth-child(1)').should('contain', '4:51 PM in Orlando')
	})

	it('Should display current temp', () => {
		cy.get('.current-forecast > h1').should('contain', '80°')
	})

	
})