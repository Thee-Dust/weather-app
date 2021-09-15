
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
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=imperial`, { fixture: 'NewYorkCurrentFahrenheit' }).as('NYCurrentF')
})

Cypress.Commands.add('interceptNYLocation', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/geo/1.0/direct?q=New%20York&limit=1&appid=${apiKey}`, { fixture: 'NYLocation' }).as('NYLocation')
})

Cypress.Commands.add('interceptNYFutureForecastFahrenheit', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=imperial`, { fixture: 'NewYorkFutureForecastFahrenheit' }).as('NYFutureF')
})

Cypress.Commands.add('interceptNYCurrentForecastMetric', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=${apiKey}&units=metric`, { fixture: 'NewYorkCurrentForecastMetric' }).as('NYCurrentC')
})

Cypress.Commands.add('interceptNYFutureForecastMetric', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=40.7143&lon=-74.006&appid=${apiKey}&units=metric`, { fixture: 'NewYorkCurrentForecastMetric' }).as('NYFutureC')
})

Cypress.Commands.add('interceptOrlandoCurrentForecastFahrenheit', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/weather?q=Orlando&appid=${apiKey}&units=imperial`, { fixture: 'OrlandoCurrentForecastFahrenheit' }).as('OCurrent')
})

Cypress.Commands.add('interceptOrlandoLocation', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/geo/1.0/direct?q=Orlando&limit=1&appid=${apiKey}`, { fixture: 'OrlandoLocation' }).as('OLocation')
})

Cypress.Commands.add('interceptOrlandoFutureForecastFahrenheit', (apiKey) => {
	cy.intercept('GET', `https://api.openweathermap.org/data/2.5/onecall?lat=28.5383&lon=-81.3792&appid=${apiKey}&units=imperial`, { fixture: 'OrlandoFutureForecastFahrenheit' }).as('OFuture')
})

Cypress.Commands.add('searchOrlando', () => {
	cy.get('#custom-css-standard-input').type('Orlando').type('{enter}')
})