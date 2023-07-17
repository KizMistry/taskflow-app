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
- Create a Procfile to specify the command that Heroku should use to start your app
- Make sure code is production-ready by running any necessary build or compilation steps, and ensuring that all dependencies are properly installed
- Push code to the main branch of the GitHub repository to trigger a deployment to Heroku
- Monitor the deployment logs in the Heroku dashboard to ensure that the app is starting up correctly and there are no errors. 

The live link can be found here - https://taste-of-india.herokuapp.com/


## Credits 

CSS styles have been taken from Code Institutes Moments walkthrough project

### Content 

- All icons used are from [Font Awesome](https://fontawesome.com/)

### Media

- All images used are from [Pexels](https://www.pexels.com)
