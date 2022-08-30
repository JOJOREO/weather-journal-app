// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express");


// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { response } = require("express");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;


const server = app.listen(port,listening);

function listening(){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
}

//step 2

app.get('/getAll', sendData);

function sendData (request, response) {
    console.log("sevrer on")
  response.send(projectData);
};

// app.post('/postAll', addAnimal);

// function addAnimal (req,res){
//     console.log("post on");
//     projectData={
//         // temperatue : req.body.temperature,
//         // date : req.body.date,
//         // user_response : req.body.user_reponse
//     };
//     // projectData.push(req.body);
//     //console.log(projectData);
//     console.log("i got  a request");
//     projectData.push(req.body);
//     console.log(req.body);
//     res.end();

//     // res.send(projectData);
// };

app.post("/postAll",async function (req,res){
const body = await req.body;
projectData = body;
//console.log(projectData);
res.send(projectData);
});

app.get("/home",async (req,res)=>{
    console.log(projectData);
    res.send(projectData);
})

