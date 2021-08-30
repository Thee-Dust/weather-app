import { cyan } from "@material-ui/core/colors"

describe('NavBar', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('Should display app name', () => {
		cy.get('.app-controls > h1').should('contain', 'The DustStorm')
	})

	it('Should have a feild to search for a city',() => {
		cy.get('.search-city > input').type('New York')
			.get('.current-forecast > p').eq(0).contain('New York')
	})

	it('Should change temp to °C from °F', () => {
		cy.get('.temp-switch-label > span').eq(1).contain('°F')
			.get('temp-switch').click()
			.get('.temp-switch-label > span').eq(1).contain('°C')
	})

	it('Should save searched cities', () => {
		cy.get('.search-city > input').type('New York')
			.get('.saved-cities').eq(0).contains('New York')
	})
})