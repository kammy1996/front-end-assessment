# TRISTAR Front End Skills Assessment

## Introduction
Thank you for taking the time to complete this assessment. It is important to know that this is not a pass/fail assessment. We will use this tool to evaluate your level of expertiece in front end development. Do not get discouraged if you are unable to complete all of the tasks.

## Instructions
### Requirements
This assessment requires that you have a computer with the following software:
* Git (git-scm.com)
* NodeJS (nodejs.com)
* NPM (Node Package Manager) This is installed with Node

### Completing the assessment
The assessment is bundled as a zipped folder containing a working local git repository.
1. Unzip the folder to a new location on your local machine.
2. Make a new branch from Master. Feel free to name this branch whatever makes sense to you.
3. From the unzipped folder, run the command    
`npm install`    
This step requires an internet connection and will download all necessary third-party packages.
4. Complete the tasks in the assessment.
5. Make commits whenever you feel appropriate with comments.
6. When you are finished:
    1. Merge your branch into the Master branch.
    2. Delete the `node_modules` and `dist` folders.
    3. Zip the folder.
    4. Return it to your TRISTAR contact.

### Running the server
From the root of the assessment folder, run the command    
`npm run start`     
This will start the NodeJS server that serves as the back end for this assessment. The server will listen on http://localhost:3000

### Running the tests
From the root of the assessment folder, run the command    
`npm test`     
This will execute all of the included unit tests.

## Tasks
### General JavaScript
`src/helpers/article.js` contains functions to help format article data for display. Implement the following:
* `getTitlesById()`
  * Accepts an array of article objects. Each article contains the following properties:
    * id
    * title
    * author
    * body
  * Should return an array of objects containing the following properties:
    * id
    * text - should contain the title property

### API communication
`src/services/article.js` contains the service functions used for accessing and updating information from the server. Use the fetch API to implement the following:
* `getAllArticles()`
  * Fetches an array of articles from the server.
  * Should return a promise that resolves to the JavaScript array.
  * Should return a rejecting promise if the server does not respond with an okay status code.
* `postNewArticle(article)`     
  * Writes a new article to the server.
  * Must use an HTTP POST request.
  * Must declare that the data sent will be in JSON format.
  * Should return a promise that resolves if the server returns an okay status code and rejects if it does not.
  * Should return a rejecting promise if the article is missing or is missing any parts (Title, Author, or Body).
* `updateArticle(article)`
  * Updates an existing article.
  * Must use an HTTP PUT request.
  * Must declare that the data sent will be in JSON format.
  * Should return a promise that resolves if the server returns an okay status code and rejects if it does not.
  * Should return a rejecting promise if the article is missing, empty, or is missing the id.
* `deleteArticle(articleId)`
  * Deletes an existing article.
  * Should return a promise that resolves if the server returns an okay status code and rejects if it does not.
  * Should return a rejecting promise if the article ID is not supplied.

### CSS
Vue components each have a `<style>` section that handles the CSS for the component. If the `<style>` tag contains a `scoped` attribute, then styles defined in that section will not apply to other areas of the page.     
For the purposes of the next few tasks, each distinct section of the page (Title List, Full Article, New Article, etc.) is a "Tile".
* Add a border with rounded corners to all of the tiles.
* Add styles necessary to display different numbers of tiles per line based on screen width.
  * < 760px - 1 tile per line
  * < 1000px - 2 tiles per line
  * \>= 1000px - 3 tiles per line

### Vue Components
This section is intended to test your knowledge and understanding of Vue with minimal guidance.
* Create a new Vue component that allows you to edit an existing article.
* Add a button to the FullArticle component that opens this new component.
* When the edit component is open, it should replace the FullArticle component.
* Should contain a button to submit the changes which will update the back end and switch back to the FullArticle component.
* Should contain a button to cancel the changes, which will switch back to the FullArticle component without submitting the changes.