let projectData ={};
// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

const port = 7000;
const server=app.listen(port,listening);
function listening(){
    console.log('server runing');
    console.log(`runing on localhost: ${port}`);
}
// TODO-ROUTES!
// GET route

app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
  console.log('server runingprojectData');

}

// TODO-ROUTES!
app.post('/add', addweather);
  function addweather(req,res){
    console.log(req.body);
     projectData={
      temp: req.body.temp,
      date: req.body.date,
      content: req.body.content,

    }
    res.send(projectData);
    console.log(projectData);
}