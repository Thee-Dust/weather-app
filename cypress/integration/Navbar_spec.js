describe('NavBar', () => {
	let apiKey
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoFutureForecastFahrenheit(apiKey)
		cy.visit('http://localhost:3000')
		cy.searchOrlando()
		// cy.wait('@OCurrent')
		// cy.wait('@OLocation')
		// cy.wait('@OFuture')
	})
	
	it('Should display app name', () => {
		cy.get('.app-controls > a > h1').should('contain', 'The Duststorm')
	})

	it('Should have a field to search for a city',() => {
		Cypress.config('defaultCommandTimeout', 10000);
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('#custom-css-standard-input').type('New York').type('{enter}')
			.get('.current-forecast > :nth-child(1)').should('contain', 'New York')
	})

	it('Should change temp to °C from °F', () => {
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('#custom-css-standard-input').type('New York').type('{enter}')
			.get('.MuiTypography-root').should('contain', '°F')
		cy.interceptNYCurrentForecastMetric(apiKey)
		cy.interceptNYFutureForecastMetric(apiKey)
			.get('.PrivateSwitchBase-input-6').click()
			.get('.MuiTypography-root').should('contain','°C')
	})

	it('Should save searched cities', () => {
		cy.interceptNYCurrentForecastFahrenheit(apiKey)
		cy.interceptNYLocation(apiKey)
		cy.interceptNYFutureForecastFahrenheit(apiKey)
		cy.get('#custom-css-standard-input').type('New York').type('{enter}')
			.get('.saved-cities').eq(0).should('contain', 'New York')
	})
})