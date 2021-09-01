describe('NavBar', () => {
	beforeEach(() => {
		cy.interceptOrlandoCurrentForecastFahrenheit()
		cy.interceptOrlandoLocation()
		cy.interceptOrlandoFutureForecastFahrenheit()
		cy.visit('http://localhost:3000')
	})

	it('Should display app name', () => {
		cy.get('.app-controls > h1').should('contain', 'The DustStorm')
	})

	it('Should have a feild to search for a city',() => {
		cy.get('.search-city > input').type('New York').type('{enter}')
		cy.interceptNYCurrentForecastFahrenheit()
		cy.interceptNYLocation()
		cy.interceptNYFutureForecastFahrenheit()
		cy.get('.current-forecast > :nth-child(1)').contains('New York')
	})

	it('Should change temp to °C from °F', () => {
		cy.get('.search-city > input').type('New York').type('{enter}')
		cy.interceptNYCurrentForecastFahrenheit()
		cy.interceptNYLocation()
		cy.interceptNYFutureForecastFahrenheit()
		.get('.MuiTypography-root').contains('°F')
		.get('.PrivateSwitchBase-input-4').click()
		cy.interceptNYCurrentForecastMetric()
		cy.interceptNYFutureForecastMetric()
			.get('.MuiTypography-root').contains('°C')
	})

	it('Should save searched cities', () => {
		cy.get('.search-city > input').type('New York').type('{enter}')
		cy.interceptNYCurrentForecastFahrenheit()
		cy.interceptNYLocation()
		cy.interceptNYFutureForecastFahrenheit()
			.get('.saved-cities').eq(0).contains('New York')
	})
})