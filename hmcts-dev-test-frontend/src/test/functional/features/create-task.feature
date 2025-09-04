Feature: Create Task

    Scenario: User can create a task with minimal information and see error handling
        Given I am on the create task page
        When I fill in the task title "Minimal Task"
        And I fill in the due date "1" "1" "2025"
        And I submit the form
        Then I should see the create task page
        And I should see "The due date should be in the future"

    Scenario: User can create a task
        Given I am on the create task page
        When I fill in the task title "Future Task"
        And I fill in the task description "This task is due in the future"
        And I fill in the due date "31" "12" "2025"
        And I submit the form
        Then I should see the list of tasks page
        And I should see the new task "Future Task"
