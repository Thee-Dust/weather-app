describe('NavBar', () => {
	let apiKey
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoFutureForecastFahrenheit(apiKey)
		cy.visit('http://localhost:3000')
	})
	
	it('Should display app name', () => {
		cy.get('.app-controls > h1').should('contain', 'The DustStorm')
	})

	it('Should have a field to search for a city',() => {
		Cypress.config('defaultCommandTimeout', 10000);
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('.search-city > input').type('New York').type('{enter}')
			// .get('.current-forecast > :nth-child(1)').contains('New York')
	})

	it('Should change temp to °C from °F', () => {
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('.search-city > input').type('New York').type('{enter}')
		.get('.MuiTypography-root').contains('°F')
		cy.interceptNYCurrentForecastMetric(apiKey)
		cy.interceptNYFutureForecastMetric(apiKey)
		.get('.PrivateSwitchBase-input-4').click()
		.get('.MuiTypography-root').contains('°C')
	})

	it('Should save searched cities', () => {
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('.search-city > input').type('New York').type('{enter}')
			.get('.saved-cities').eq(0).contains('New York')
	})
})