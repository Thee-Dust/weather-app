describe('Future Forecast', () => {
	let apiKey;
	beforeEach(() => {
		apiKey = Cypress.env('CYPRESS_APIKEY')
		cy.interceptOrlandoLocation(apiKey)
		cy.interceptOrlandoCurrentForecastFahrenheit(apiKey)
		cy.interceptOrlandoFutureForecastFahrenheit(apiKey)
		cy.visit('http://localhost:3000')
		cy.searchOrlando()
	})

	it('Should be able to see hourly weather', () => {
		cy.get('.hourly-forecast-container > :nth-child(1)')
			.should('contain', 'Now')
			.should('contain', '80°')
			.find('img')
			.should('have.attr', 'src', 'http://openweathermap.org/img/wn/04n@2x.png')
	})
	
	it('Should be able to see daily weather', () => {
		cy.wait(100)
		cy.get('.future-controls > :nth-child(2)').click()
			.get('.daily-forecast-container > :nth-child(1)')
			.should('contain', 'Today')
			.should('contain', 'Low of 77°')
			.should('contain', 'High of 94°')
			.find('img')
			.should('have.attr', 'src', 'http://openweathermap.org/img/wn/04d@2x.png')
	})
})