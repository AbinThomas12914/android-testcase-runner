const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect } = require('chai');

// Import Page Objects
const HomePage = require('../../page-objects/HomePage');
const FlightSearchPage = require('../../page-objects/FlightSearchPage');
const SearchLocationPage = require('../../page-objects/SearchLocationPage');
const FlightSelectionPage = require('../../page-objects/FlightSelectionPage');
const TripReviewPage = require('../../page-objects/TripReviewPage');
const PopupPage = require('../../page-objects/PopupPage');
const LocationAccessPage = require('../../page-objects/LocationAccessPage');
const PermissionPopupPage = require('../../page-objects/PermissionPopupPage');

// Page Object instances
let homePage;
let flightSearchPage;
let searchLocationPage;
let flightSelectionPage;
let tripReviewPage;
let popupPage;
let locationAccessPage;
let permissionPopupPage;

Given(/^the mobile application is launched$/, async () => {
    // Initialize page objects
    homePage = new HomePage();
    flightSearchPage = new FlightSearchPage();
    searchLocationPage = new SearchLocationPage();
    flightSelectionPage = new FlightSelectionPage();
    tripReviewPage = new TripReviewPage();
    popupPage = new PopupPage();
    locationAccessPage = new LocationAccessPage();
    permissionPopupPage = new PermissionPopupPage();
    
    // Dismiss all initial popups (login screen and feedback)
    await homePage.dismissAllPopups();
    
    // Wait for home page to load
    await homePage.waitForHomePageLoad();
});

Given(/^I handle any initial popups$/, async () => {
    // This step is now handled in the "mobile application is launched" step
    // but keeping for backward compatibility
    console.log('ℹ️ Popups already handled during app launch');
});

Given(/^I am on the home page$/, async () => {
    // Verify we're on home page by checking if Flights tab exists
    await homePage.FLIGHTS_TAB.waitForDisplayed({ timeout:15000 });
    console.log('✅ Home page verified - Flights tab is displayed');
});

When(/^I click on the Flights tab$/, async () => {
    await homePage.clickFlightsTab();
});

When(/^I select "([^"]*)" trip type$/, async (tripType) => {
    if (tripType === 'One-way') {
        await flightSearchPage.clickOneWayTab();
    }
});

When(/^I set departure location to "([^"]*)"$/, async (location) => {
    await flightSearchPage.clickLeavingFromButton();
    await searchLocationPage.clearLeavingFrom();
    await searchLocationPage.enterLeavingFrom(location);
    
    if (location === 'Cochin') {
        await searchLocationPage.selectCochinLocation();
    }
});

When(/^I set destination location to "([^"]*)"$/, async (location) => {
    await flightSearchPage.tapGoingToField();
    await searchLocationPage.activateLocationInput();
    await searchLocationPage.clearGoingToInput();
    await searchLocationPage.enterGoingToLocation(location);
    
    if (location === 'Bengaluru') {
        await searchLocationPage.selectBengaluruFromList();
    }
});

When(/^I click the search button$/, async () => {
    await flightSearchPage.clickSearchButton();
});

Then(/^I should see available flights$/, async () => {
    // Wait for flight results to load
    await browser.pause(5000);
    // Add verification logic here based on your app's flight results elements
});

Given(/^I have search results displayed$/, async () => {
    // Assume we're already on flight results page
    await browser.pause(2000);
});

When(/^I select the first Air India flight$/, async () => {
    await flightSelectionPage.selectFirstAirIndiaFlight();
});

When(/^I proceed to checkout$/, async () => {
    await tripReviewPage.clickCheckoutButton();
});

Then(/^I should be on the booking page$/, async () => {
    // Add verification logic for booking page
    await browser.pause(2000);
});

Given(/^the app is starting$/, async () => {
    // App initialization
    await browser.pause(2000);
});

When(/^location access popup appears$/, async () => {
    // Check if location access popup is present
    await browser.pause(1000);
});

Then(/^I should close the location access popup$/, async () => {
    await locationAccessPage.closePopup();
});

When(/^permission popup appears$/, async () => {
    // Check if permission popup is present
    await browser.pause(1000);
});

Then(/^I should close the permission popup$/, async () => {
    await permissionPopupPage.closePopup();
});