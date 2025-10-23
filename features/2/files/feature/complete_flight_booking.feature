Feature: End-to-End Hotel Booking Flow
  Scenario: User searches for a hotel, selects a room, and completes the booking
    Given the user is on the sign-in screen
    Then the 'Sign in with Google' button should be visible

    Given the popup is displayed
    When the user clicks the 'X' button
    Then the popup should be closed

    Given the location access popup is displayed
    When the user clicks on "Enable location access"
    Then the popup should close

    Given the location permission popup is displayed
    When the user clicks on the 'Deny' button
    Then the popup should be closed

    Given the user is on the home screen
    When the user clicks on the 'Stays' text
    Then the user should be navigated to the Stays section

    Given the user is on the search location screen
    When the user clicks on the 'Going To' input field
    Then the input field should be focused

    Given the user is on the location search screen
    When the user taps on the 'Search' field
    Then the location input field should be activated

    Given the user is on the search location screen
    When the user clears the search input field
    And the user types "Kochi" into the search input field
    Then the search input field should contain "Kochi"

    Given the user is on the location search screen
    When the user clicks on 'Cochin (COK - Cochin Intl.)' from the suggestions
    Then the location should be selected

    Given the user is on the search form screen
    When the user clicks on the search button
    Then the search results should be displayed

    Given the user is on the hotel search results page
    When the user clicks on the first hotel in the list
    Then the hotel details page should be displayed

    Given the user is on the property details page
    When the user clicks on the 'Select a room' button
    Then the room selection process should initiate

    Given the user is on the room selection page
    When the user selects the "Room, 2 Twin Beds, Non Smoking" option
    Then the room details should be displayed

    Given the user is on the room selection page
    When the user clicks on the 'Reserve' button for a room with "2 Twin Beds"
    Then the reservation process should start

    Given the user is on the room selection screen
    When the user clicks on the "Reserve Room, 2 Twin Beds, Non Smoking" button
    Then the reservation process should proceed

    Given the user is on the payment page
    When the user clicks on 'Pay now' button
    Then the booking should be completed

