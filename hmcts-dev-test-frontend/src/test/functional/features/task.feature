Feature: Home Functional test

    Scenario: The home page loads with task list
        When I go to '/'
        Then the page should include 'Task List' 