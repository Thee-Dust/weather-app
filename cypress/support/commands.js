const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('interceptNYCurrentForecastFahrenheit', () => {
	cy.fixture('NewYorkCurrentForecastFahrenheit.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather`, json)
	})
})

Cypress.Commands.add('interceptNYLocation', () => {
	cy.fixture('NYLocation.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/geo/1.0/direct`, json)
	})
})

Cypress.Commands.add('interceptNYFutureForecastFahrenheit', () => {
	cy.fixture('NewYorkFutureForecastFahrenheit.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall`, json)
	})
})

Cypress.Commands.add('interceptNYCurrentForecastMetric', () => {
	cy.fixture('NewYorkCurrentForecastMetric.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather`, json)
	})
})

Cypress.Commands.add('interceptNYFutureForecastMetric', () => {
	cy.fixture('NewYorkFutureForecastMetric.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall`, json)
	})
})

Cypress.Commands.add('interceptOrlandoCurrentForecastFahrenheit', () => {
	cy.fixture('OrlandoCurrentForecastFahrenheit.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather`, json)
	})
})

Cypress.Commands.add('interceptOrlandoLocation', () => {
	cy.fixture('OrlandoLocation.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/geo/1.0/direct`, json)
	})
})

Cypress.Commands.add('interceptOrlandoFutureForecastFahrenheit', () => {
	cy.fixture('OrlandoFutureForecastFahrenheit.json').then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall`, json)
	})
})