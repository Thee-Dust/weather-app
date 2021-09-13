describe('Current Forecast', () => {
	let apiKey;
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
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

	it('Should display current weather condtion', () => {
		cy.get('.current-forecast > :nth-child(3)').should('contain', 'Broken clouds')
	})

	it('Should display feels like temp', () => {
		cy.get('.current-forecast > :nth-child(4)').should('contain', '85°')
	})

	it('Should show picture of weather condtion', () => {
		cy.get('.current-icon').should('have.attr', 'src', 'http://openweathermap.org/img/wn/04n@2x.png')
	})
})