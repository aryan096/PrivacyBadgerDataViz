
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is the project layout:

###src:
- App.js contains the "home" page content
- viz.js is the vizualization page
- Routes.js has the routes for home page and viz page
- Index.js is component that renders the routes

###server.js is the backend. 
- It contains the post request for the file upload.
- Posts file to data folder

###data folder:
- Contains the uploaded json file by user. 
- TODO add errors etc when user uploads a file that is not a .josn file



## Project setup

In the project directory, you can run:

```
npm install
```

### To begin development, run

```
npm start
```

### To begin server.js, run

```
nodemon server.js
```

Open [http://localhost:8081](http://localhost:8081) to view it in the browser.

The page will reload if you make edits.
