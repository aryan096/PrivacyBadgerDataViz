
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This is the project layout:

### src:
- App.js contains the "home" page content
- viz.js is the vizualization page
- Routes.js has the routes for home page and viz page
- Index.js is component that renders the routes

### server.js:
- Backend
- It contains the POST and GET request for the file upload
- Posts file to data folder

### data:
- Folder inside src that contains the uploaded .json file by user, all files uploaded will be named 'data.json' (should probably not do this)
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

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
