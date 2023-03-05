//entry point for the backend application, we will register our express app here
//package.json - keeps track of dependencies and registers our custom scripts

require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts");

//mongoose is an object data modelling(odm) library - wraps mongodb with an extra layer and allows methods read & write databse documents
//& gives us a way to declare models and schemas to ensure a more strict data structure
const mongoose = require("mongoose");

const app = express(); //invokes a function that creates an express app

//middleware - any code that executes between apps getting a request on the server and it sending a response
//we generally use the use() method to use middlewares
//next is a function which runs at the end of the middleware in order to move on to the next middleware
app.use(express.json()); //it looks to any request and checks if it has some body to it & if it does, it attaches it to the request object so that we can access it in request habdler
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//grabs all of the different routes that we have attached to the router & uses them
app.use("/api/workouts", workoutRoutes); // api/workouts is the initial path, all the routes in workoutRoutes will now become realtive to this

//connect to database
mongoose
  .connect(process.env.MONGO_URL)
  //listen to requests once we've connected to the database
  .then(() => {
    //listen our requests in a certain port number
    app.listen(process.env.PORT, () => {
      console.log("Local Server Started on localhost:4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
