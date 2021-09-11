
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
Cypress.Commands.add('interceptNYCurrentForecastFahrenheit', (apiKey) => {
	cy.fixture('../fixtures/NewYorkCurrentForecastFahrenheit.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=imperial`, json).as('NYCurrentF')
	})
})

Cypress.Commands.add('interceptNYLocation', (apiKey) => {
	cy.fixture('../fixtures/NYLocation.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/geo/1.0/direct?q=New%20York&limit=1&appid=${apiKey}`, json).as('NYLocation')
	})
})

Cypress.Commands.add('interceptNYFutureForecastFahrenheit', (apiKey) => {
	cy.fixture('../fixtures/NewYorkFutureForecastFahrenheit.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=imperial`, json).as('NYFutureF')
	})
})

Cypress.Commands.add('interceptNYCurrentForecastMetric', (apiKey) => {
	cy.fixture('../fixtures/NewYorkCurrentForecastMetric.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`, json).as('NYCurrentC')
	})
})

Cypress.Commands.add('interceptNYFutureForecastMetric', (apiKey) => {
	cy.fixture('../fixtures/NewYorkFutureForecastMetric.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=metric`, json).as('NYFutureC')
	})
})

Cypress.Commands.add('interceptOrlandoCurrentForecastFahrenheit', (apiKey) => {
	cy.fixture('../fixtures/OrlandoCurrentForecastFahrenheit.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=${apiKey}&units=imperial`, json).as('OCurrent')
	})
})

Cypress.Commands.add('interceptOrlandoLocation', (apiKey) => {
	cy.fixture('../fixtures/OrlandoLocation.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/geo/1.0/direct?q=Orlando&limit=1&appid=${apiKey}`, json).as('OLocation')
	})
})

Cypress.Commands.add('interceptOrlandoFutureForecastFahrenheit', (apiKey) => {
	cy.fixture('../fixtures/OrlandoFutureForecastFahrenheit.json').then((json) => {
		cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=28.5383&lon=-81.3792&appid=${apiKey}&units=imperial`, json).as('OFuture')
	})
})

Cypress.Commands.add('searchOrlando', () => {
	cy.get('#custom-css-standard-input').type('New York').type('{enter}')
})