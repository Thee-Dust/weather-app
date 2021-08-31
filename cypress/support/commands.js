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
Cypress.Commands.add('interceptNyCurrentForecastFahrenheit', () => {
	cy.fixture('../fixtures/NewYorkCurrentForecastFahrenheit.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=imperial`, json)
	})
})

Cypress.Commands.add('interceptLocation', () => {
	cy.fixture('../fixtures/location.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/geo/1.0/direct?q=New%20York&limit=1&appid=${apiKey}`,json)
	})
})

Cypress.Commands.add('interceptNYfutureForecastFahrenheit', () => {
	cy.fixture('../fixtures/NewYorkFutureForecastFahrenheit.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=imperial`, json)
	})
})

Cypress.Commands.add('interceptNYCurrentForecastMetric', () => {
	cy.fixture('../fixtures/NewYorkCurrentForecastMetric.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`, json)
	})
})

Cypress.Commands.add('interceptNYFutureForecastMetric', () => {
	cy.fixture('../fixtures/NewYorkFutureForecastMetric.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=metric`, json)
	})
})

Cypress.Commands.add('interceptOrlandoCurrentForecastFahrenheit', () => {
	cy.fixture('../fixtures/OrlandoCurrentForecastFahrenheit.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=${apiKey}&units=imperial`, json)
	})
})

Cypress.Commands.add('interceptNYfutureForecastFahrenheit', () => {
	cy.fixture('../fixtures/OrlandoFutureForecastFahrenheit.json')
	.then(json => {
		cy.intercept(`http://api.openweathermap.org/data/2.5/onecall?lat=28.5383&lon=-81.3792&appid=${apiKey}&units=imperial`, json)
	})
})