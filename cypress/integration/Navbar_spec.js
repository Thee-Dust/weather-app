import { cyan } from "@material-ui/core/colors"

describe('NavBar', () => {
	beforeEach(() => {
		cy.interceptCurrentForecastFahrenheit()
		cy.interceptLocation()
		cy.futureForecastFahrenheit()
		cy.interceptCurrentForecastMetric()
		cy.futureForecastMetric()
		cy.visit('http://localhost:3000')
	})

	it('Should display app name', () => {
		cy.get('.app-controls > h1').should('contain', 'The DustStorm')
	})

	it('Should have a feild to search for a city',() => {
		cy.get('.search-city > input').type('New York').type('{enter}')
			.get('.current-forecast > :nth-child(1)').contains('New York')
	})

	it('Should change temp to °C from °F', () => {
		cy.get('.MuiTypography-root').contains('°F')
			.get('.PrivateSwitchBase-input-4').click()
			.get('.MuiTypography-root').contains('°C')
	})

	it('Should save searched cities', () => {
		cy.get('.search-city > input').type('New York').type('{enter}')
			.get('.saved-cities').eq(0).contains('New York')
	})
})