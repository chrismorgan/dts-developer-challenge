# DTS Developer Technical Test

## Scenario
HMCTS requires a new system to be developed so caseworkers can keep track of their tasks. Your technical test is to develop that new system so caseworkers can efficiently manage their tasks.

### Backend API Service
The backend is able to:
- Create a task with the following properties:
  - Title
  - Description (optional field)
  - Status (as Open/Closed)
  - Due date/time
- Retrieve a task by ID
- Retrieve all tasks
- Update the status of a task
- Delete a task

The API is developed using OpenAPI to provide declarative design and allow for descriptions in the specification. It also has a documentation harness using Swagger which can also allow for testing the API manually. The API documentation is available on `http://localhost:4000/swagger-ui/index.html` when the server is started.
 - Smoke tests can be used when the service is up.

### Frontend Application
The frontend is able to:
- Create, view, update, and delete tasks
- Display tasks in a user-friendly interface
- Uses the govUK design system to render the pages consistently

### To use the Application
Docker required

- `cd hmcts-dev-test-backend` to access the backend code
- `docker compose up -d` to start the database
- `./gradlew build` to build the application
- `./gradlew bootRun` to run the server

In another terminal
- `cd hmcts-dev-test-frontend` to access the front end folder
- `yarn install` to pull in dependencies
- `yarn build` to check the build
- `yarn start` to run the application

Visit `http://localhost:3100/` in a browser
