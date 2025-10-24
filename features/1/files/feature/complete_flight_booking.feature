Feature: End-to-End Flight Booking Process

  Scenario: User completes flight search and proceeds to checkout
    Given the popup is displayed
    When the user clicks the 'X' button
    Then the popup should be closed

    Given the location access prompt is displayed
    When the user taps on "Not now"
    Then the prompt should be dismissed

    Given the user is on the home screen
    When the user clicks on the 'Flights' tab
    Then the flight search options should be displayed

    Given the user is on the flight search form
    When the user clicks on the 'One-way' tab
    Then the 'One-way' tab should be selected

    Given the user is on the flight search form
    When the user clicks on the 'Leaving From Button'
    Then the 'Leaving From' input field should be focused

    Given the user is on the search screen
    When the user taps on the 'Leaving From' field
    Then the location input field should be activated

    Given the user is on the search page
    When the user clears the "Leaving From" input field
    And the user enters "Cochin" into the "Leaving From" input field
    Then the "Leaving From" field should display "Cochin"

    Given the user is on the location search screen
    When the user sees the list of locations
    Then the user clicks on the non-focusable 'Cochin (COK - Cochin Intl.)' element

    Given the user is on the flight search form
    When the user taps on the 'Going To' field
    Then the location input field should be activated

    Given the user is on the search screen
    When the user taps on the 'Going to' label
    Then the location input field should be activated

    Given the user is on the search location screen
    When the user clears the "Going to" input field
    And the user enters "Bengaluru" into the "Going to" input field
    Then the "Going to" input field should contain "Bengaluru"

    Given the user is on the location search screen
    When the user clicks on the non-focusable 'Bengaluru (BLR - Kempegowda Intl.)' element
    Then the Bengaluru location should be selected

    Given the user is on the flight search page
    When the user clicks on the search button
    Then the search results should be displayed

    Given the user is on the flight selection screen
    When the user selects the first flight containing 'Air India' in the description
    Then the flight details should be displayed

    Given the user is on the flight selection page
    When the user clicks on the first 'Select' button
    Then the user should be navigated to the next step

    Given the user is on the trip review page
    When the user clicks on the 'Check out' button
    Then the checkout process should initiate

