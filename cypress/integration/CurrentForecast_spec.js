describe('Current Forecast', () => {
	beforeEach(() => {
		cy.interceptOrlandoCurrentForecastFahrenheit()
		cy.interceptOrlandoFutureForecastFahrenheit()
		cy.visit('http://localhost:3000')
	})

	it('Should display current time and place', () => {
		cy.get('.current-forecast > :nth-child(1)').contains('11:50 PM in Orlando')
	})

	it('Should display current temp', () => {
		cy.get('.current-forecast > h3').contains('80°')
	})
})