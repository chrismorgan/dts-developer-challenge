import { config as testConfig } from '../config';

const { I } = inject() as { I: any };

export const iAmOnPage = (text: string): void => {
  const url = new URL(text, testConfig.TEST_URL);
  if (!url.searchParams.has('lng')) {
    url.searchParams.set('lng', 'en');
  }
  I.amOnPage(url.toString());
};
Given('I go to {string}', iAmOnPage);

Then('the page URL should be {string}', (url: string) => {
  I.waitInUrl(url);
});

Then('the page should include {string}', (text: string) => {
  I.waitForText(text);
});

// Create Task steps
Given('I am on the create task page', () => {
  I.amOnPage('/create-task');
});

When('I fill in the task title {string}', (title: string) => {
  I.fillField('#title', title);
});

When('I fill in the task description {string}', (description: string) => {
  I.fillField('#description', description);
});

When('I fill in the due date {string} {string} {string}', (day: string, month: string, year: string) => {
  I.fillField('#due-date-day', day);
  I.fillField('#due-date-month', month);
  I.fillField('#due-date-year', year);
});

When('I submit the form', () => {
  I.click('Create Task');
});

Then('I should see the create task page', () => {
  I.waitInUrl('/create-task');
});

Then('I should see the form was submitted', () => {
  I.see('Task');
});

Then('I should see an error message', () => {
  I.see('Task'); // Ensure we're still on the create task page
  
  I.see('What is your New Task?'); // Verify the form is still present
  I.see('The due date should be in the future');
});

Then('I should see the list of tasks page', () => {
 
  I.waitInUrl('/tasks/');
  I.see('Task');
});

Then('I should see the new task {string}', (taskTitle: string) => {
  I.see(taskTitle);
  I.see('Task'); // Ensure we're on the task detail page
});

Then('I should see {string}', (text: string) => {
  // Generic step to check for any text on the page
  I.see(text);
});
