Feature: User Navigation and Authentication Flow

  Scenario: Complete user journey from sign in to search location
    Given the user is on the sign in screen
    Then the "Sign in with Google" button should be available
    
    Given the permission popup is displayed
    When I click on the 'Allow' button
    Then the popup should be closed
    
    Given the user is on the home screen
    When the user clicks on the 'Stays' tab
    Then the Stays screen should be displayed
    
    Given the user is on the search location screen
    When the user clicks on the 'Going To' input field
    Then the input field should be focused
    
    Given the popup is displayed
    When the user clicks the 'X' button
    Then the popup should be closed

