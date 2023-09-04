# TaskFlow
 
Welcome to TaskFlow! TaskFlow is a powerful task management application that empowers users to efficiently organize and track their projects and tasks. With TaskFlow, you can easily create projects, add tasks with customizable statuses and priorities, and stay on top of your workflow. TaskFlow provides a seamless experience to help you stay organized and productive. This readme guide will walk you through the key features and functionalities of TaskFlow, enabling you to make the most out of this versatile task management tool. Let's get started!

## Features 

### Existing Features

- __Navigation Bar__

  - Featured on all pages, the full responsive navigation bar includes links to the Home/Projects, Tasks, Create Project, Sign Up / Sign In section. Identical in each page to allow for easy navigation.
  - The navigation bar is responsive and will collapse into a hamburger menu when used on medium and small screens.
  - This section will allow the user to easily navigate from page to page across all devices without having to revert back to the previous page via the ‘back’ button. 

![Nav Bar](/static/assets/nav-bar.png)

- __The Landing Page__

  - The landing page instructs users to sign in/up to access the app if not already signed in.
  - Signed in users are presented with a list of all their current projects.
  - User can find specific project via the search bar filter.

![Landing Page](/static/assets/landing-page.png)

- __The Users Task Page__

  - The Tasks page list all the users tasks in a corresponding 'ToDo', 'In Progress', 'Completed' section. 

![Users Task Page](/static/assets/tasks-page.png)

- __Sign In/Up Section__

  - This section will allow the user to sign in/up to TaskFlow.
  - This gives the user access to the application.

![Sign In/Up](/static/assets/sign-in.png)

- __Create / Edit / Delete Project__ 

  - The user can start a project by completing the Create Project form.
  - The user can edit the projects name and description.
  - The user can delete their project, this will also delete any tasks attached to the project.

![Create Project](/static/assets/project-create.png)

- __Create / Edit/ Delete Task__

  - The user can add a task to their project and set the status and priority.
  - The user can edit the tasks name, description, status, priority.
  - The user can delete their tasks.

![Create Task](/static/assets/task-create.png)

- __Project Page__

  - This page shows the projects data.
  - The user can see tasks related to the selected project. 

![Project Page](/static/assets/project-page.png)

- __Task Page__

  - This page shows the selected task in more detail.

![Task Page](/static/assets/task-page.png)

### Future Feature Ideas

- __Profile Page__

  - User profile page to display profile info and ability to update user info

- __Filter Tasks__

  - User can filter Tasks by task name, description, priority

- __Follow Other Users__

  - Follow users you may know

- __Add Other Users to Projects__

  - Other users can be added to your project

- __Assign Tasks to Users in Project__

  - Tasks can be assigned to users part of the project

- __Add Notes to Projects/Tasks__

  - A notes section where user can add notes to a task or project

- __File Uploads__

  - Ability to add files to a task or project

## Design

React bootstrap was used as a structure which I could then build upon. This enabled a HTML foundation which could then be designed to suit the theme of the application.
(*The current layout and style is not the final design.*)

## Testing 

The TaskFlow app's current iteration works as intended.
All sections were tested; Some of the main testing points included:

| Test       | Expected           | Passed  |
| :------------- |:-------------:| :-----:|
| User clicks all navigation links on home page     | Taken to corresponding page | ✅ |
| User logs in / registers | Nav links change and access to projects/tasks becomes available | ✅ |
| User clicks 'Create Project'| Directed to create project page | ✅ |
| User completes create project form and submits (valid data) | Project created and redirected to Project page with project info | ✅ |
| User completes project form and submits (invalid data)| Error / Invalid messages | ✅ |
| User clicks edit project button | Directed to edit project page with prepopulated form | ✅ |
| User updates project (valid data) | Project details updated successfully and redirected to previous page | ✅ |
| User updates project (invalid data) | Error / Invalid messages | ✅ |
| User clicks delete icon on project page | Project is deleted and redirected to landing page | ✅ |
| User clicks 'Add Task'| Directed to create task page | ✅ |
| User completes create task form and submits (valid data) | Task created and redirected to previous page | ✅ |
| User completes task form and submits (invalid data)| Error / Invalid messages | ✅ |
| User clicks edit task button | Directed to edit task page with prepopulated form | ✅ |
| User updates task (valid data) | Task details updated successfully and redirected to related project page | ✅ |
| User updates task (invalid data) | Error / Invalid messages | ✅ |
| User clicks delete icon on task page | Task is deleted and redirected to landing page | ✅ |
| User clicks project card | Directed to the Project page | ✅ |
| User clicks task card | Directed to the Task page | ✅ |
| User types in the search bar on landing page | Project cards are filtered to match search | ✅ |
| User clicks sign out | User is signed out and directed to the logged out home page | ✅ |


The website was shared with family and friends to test the apps usage.

### Validator Testing 

- HTML
  - No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Ftaskflow-2023-b9a3557ae482.herokuapp.com%2F)
- CSS
  - No errors were found when passing CSS through the official [(Jigsaw) validator](http://jigsaw.w3.org/css-validator/validator?lang=en&profile=css3svg&uri=https%3A%2F%2Ftaskflow-2023-b9a3557ae482.herokuapp.com%2F&usermedium=all&vextwarning=&warning=1)
- JS
  - No errors were found when passing files through JSHint
  - 3 warning for unused variables

### Unfixed Bugs

- There are no known bugs at this stage of the projects conception


## Deployment

The process of deploying TaskFlow to GitHub is detailed below: 

- Create a new app on Heroku and connect it to GitHub account
- Enable Automatic Deploys to automatically deploy code to Heroku whenever changes are pushed to the main branch of the GitHub repository
- Set up the required environment variables in the Heroku app settings (such as your database connection string or any API keys)
- Create a Procfile to specify the command that Heroku should use to start the app
- Make sure code is production-ready by running any necessary build or compilation steps, and ensuring that all dependencies are properly installed
- Push code to the main branch of the GitHub repository to trigger a deployment to Heroku
- Monitor the deployment logs in the Heroku dashboard to ensure that the app is starting up correctly and there are no errors.

- ### Configuring Front-End React App

To connect the front-end React app with the Django API, these steps were taken:

1. **Heroku Configuration:**
   - Go to Heroku and select your DRF API project on the dashboard.

2. **Set Config Vars:**
   - Add a new config var named `CLIENT_ORIGIN` and set it to the URL of the deployed React application.
   - Add another config var named `CLIENT_ORIGIN_DEV` and set it to the Gitpod preview link (without a trailing slash).
   - Gitpod preview URLs may change, so if needed, the `CLIENT_ORIGIN_DEV` was updated.

3. **Install Axios:**
   - Install the Axios library in Gitpod workspace using the following command:
     ```
     npm install axios
     ```

4. **Create Axios Defaults:**
   - Create a folder named `api` and created an `axiosDefaults` file inside it.

5. **Configure Axios:**
   - Inside `axiosDefaults`:
     - Import Axios.
     - Define the `baseURL` as the unique URL of the deployed API.
     - Set the `content-type` header to `multipart/form-data` to handle image and text requests.
     - Set `withCredentials` to `true` to avoid CORS errors when sending cookies.

6. **Import Axios Configuration:**
   - Import the Axios configuration into the `App.js` file in the React app.

These steps ensure that the TaskFlow app can send requests to the Django TaskFlow API and receive responses correctly.


The live link can be found here - https://taskflow-2023-b9a3557ae482.herokuapp.com/

## Libraries Used for Front-End

1. **React:** The core library for building user interfaces.

2. **ReactDOM:** Used for rendering React components in the DOM.

3. **React Router:** Employed for handling routing and navigation within TaskFlow's single-page application.

4. **Axios:** This library facilitated making HTTP requests from the TaskFlow Front-End React application to the Back-End TaskFlow API.

5. **Bootstrap:** Utilized as a CSS framework for styling and ensuring a responsive design in the TaskFlow application.


## Reusable Components

### Asset Component

**Purpose:** The `Asset` component is used to display assets such as images along with optional loading spinners and messages.

**Props:**
- `spinner` (boolean): If `true`, displays a loading spinner while the asset is loading.
- `src` (string): The source URL of the asset.
- `message` (string): A message to display below the asset.

**Component Uses:**

The `Asset` component is used in various parts of the application to handle the display of assets. Here are a few examples:

- Project Page: https://github.com/KizMistry/taskflow-app/blob/980b08dfa303fe2ad152f96cae9ac84984d91731/src/pages/projects/ProjectPage.js#L6
- Tasks Page: https://github.com/KizMistry/taskflow-app/blob/main/src/pages/tasks/Tasks.js#L7
- Projects Page: https://github.com/KizMistry/taskflow-app/blob/main/src/pages/projects/ProjectsPage.js#L15
- Task Create Form https://github.com/KizMistry/taskflow-app/blob/main/src/pages/tasks/TaskCreateForm.js#L187

**Benefits:**

- Promotes code reusability by handling asset display and loading states in a consistent way.
- Enhances user experience by providing loading indicators when assets are being fetched.

### Avatar Component

**Purpose:** The `Avatar` component is used to display user avatars with optional text.

**Props:**
- `src` (string, required): The source URL of the avatar image.
- `height` (number, default: 45): The height of the avatar image.
- `text` (string): Text to display alongside the avatar.

**Component Uses:**

The `Avatar` component is to be used to display the user's avatar in various parts of the application. Instances this will be integrated eventually are:

Profile Page, NavBar Component, Note Component, Note Create Form.

**Benefits:**

- Encourages code reusability by providing a consistent way to display user avatars.
- Allows customization of avatar height and the display of optional text.

### NavBar Component

**Purpose:** The `NavBar` component serves as the application's navigation bar, providing links to various sections of the application and user authentication options.

**Component Uses:**

The NavBar component is a fundamental part of the application's layout and navigation. It consists of the following elements:

- Logo: Displays the application logo and links to the homepage.
- Navigation Links: Depending on whether a user is logged in or not, it displays links to different sections of the application.

**Benefits:**

- Encourages consistent navigation and user experience throughout the application.
- Provides an easy way to handle user authentication actions, such as sign-in and sign-out.
- Adapts to different screen sizes with responsive design using Bootstrap components.

### OptionDropdown Component

**Purpose:** The `OptionDropdown` component provides a customizable dropdown menu with options like "Edit" and "Delete" typically used for actions related to a specific item, such as a project or task.

**Props:**
- `handleEdit` (function, required): A callback function to handle the "Edit" action when selected from the dropdown.
- `handleDelete` (function, required): A callback function to handle the "Delete" action when selected from the dropdown.

The OptionDropdown component is designed to be used within other components to provide actions for that item.

**Component Uses:**
The OptionDropdown component has been used on:

Project component: https://github.com/KizMistry/taskflow-app/blob/9f718b63bee00d1383398612863504d23a46ea51/src/pages/projects/Project.js#L7

Task Page: https://github.com/KizMistry/taskflow-app/blob/9f718b63bee00d1383398612863504d23a46ea51/src/pages/tasks/TaskPage.js#L14

**Benefits:**

- Promotes code reusability by encapsulating the dropdown menu logic.
- Simplifies the implementation of common actions like editing and deleting items.
- Enhances the user interface by providing a consistent and visually appealing way to access actions.

### Project Component

**Purpose:** The `Project` component is used to display project details in a card format. It is used to present project information, including title, description, and the number of associated tasks and notes. Additionally, it provides options for editing and deleting projects when applicable.

**Props:**

- `id`: The unique identifier for the project.
- `owner` (string, required): The username of the project owner.
- `tasks_count` (number, required): The count of tasks associated with the project.
- `notes_count` (number, required): The count of notes associated with the project.
- `title` (string, required): The title of the project.
- `description` (string): The description of the project.
- `updated_at` (string): The timestamp indicating when the project was last updated.
- `projectPage` (boolean): A flag indicating whether the component is displayed on the project page.

**Component Uses:**
The Project component is composed of the following elements:

- Card: Renders the project information within a card container.
- Media: Arranges elements in a media format, allowing flexible content placement.
- Link: Provides a link to the project's details page.
- OptionDropdown: A reusable component for displaying edit and delete options based on user ownership.

**Benefits:**

- Encourages code reusability by encapsulating project card rendering logic.
- Enhances consistency in displaying project details across the application.
- Provides a user-friendly interface for managing projects, including editing and deletion options.

### Task Component

**Purpose:** The `Task` component is used to display individual task details in a card format. It is typically used to present task information, including the task name, description, and priority. This component also provides a link to the task's details page.

**Props:**

- `task` (object, required): An object containing task details, including `id`, `task`, `description`, and `task_priority`.

**Component Uses:**
The Task component is composed of the following elements:

- Card: Renders the task information within a card container.
- Link: Provides a link to the task's details page.

**Benefits:**

- Encourages code reusability by encapsulating task card rendering logic.
- Ensures a consistent layout for displaying task details across the application.
- Provides an easy navigation link to the task's details for enhanced user experience.

## Credits 

CSS styles have been taken from Code Institutes Moments walkthrough project
Some code used may have been recycled from Code Institutes Moments walkthrough project

### Content 

- All icons used are from [Font Awesome](https://fontawesome.com/)

### Media

- All images used are from [Pexels](https://www.pexels.com)
