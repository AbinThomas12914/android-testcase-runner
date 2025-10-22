Feature: Flight Booking
  As a user
  I want to search and book flights
  So that I can travel to my desired destination

  Background:
    Given the mobile application is launched
    And I handle any initial popups

  Scenario: Search for flights from Cochin to Bengaluru
    Given I am on the home page
    When I click on the Flights tab
    And I select "One-way" trip type
    And I set departure location to "Cochin"
    And I set destination location to "Bengaluru"
    And I click the search button
    Then I should see available flights

  Scenario: Select and book a flight
    Given I have search results displayed
    When I select the first Air India flight
    And I proceed to checkout
    Then I should be on the booking page

  Scenario: Handle app permissions and popups
    Given the app is starting
    When location access popup appears
    Then I should close the location access popup
    When permission popup appears
    Then I should close the permission popup