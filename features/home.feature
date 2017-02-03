Feature: Searching flight
  As a user of Expedia.com
  I should use the landing page to search

  @search
  Scenario: Landing at the Expedia.com home
    Given I entered Expedia.com
    Then I should should see Expedia.com logo

  @search
  Scenario: Search tabs
    Given I am at the home page
    Then I should see search tabs
