import express from 'express';
const lookup = require('./lookup');
const bodyParser = require('body-parser');
import * as firebase from 'firebase/app';
import firebaseConfig from './config/firebase';
const app = express();
const port = process.env.PORT || 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.initializeApp(firebaseConfig);


// define a route handler for the default home page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.use('/lookup', lookup);


// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
