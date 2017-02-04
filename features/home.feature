Feature: Searching flight
  As a user of Expedia.com
  I should search for flight from the landing page

  @search
  Scenario: Landing at the Expedia.com home
    Given That I entered Expedia.com
    Then I should should see Expedia.com logo

  @search
  Scenario: Getting multiple search tabs
    Given That I am at the home page
    Then I should have search tabs
