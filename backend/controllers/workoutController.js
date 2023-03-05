const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); //.sort is sorting our workout docs in descending order due to -1
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exists" });
  }
  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(400).json({ error: "No such workout exists" });
  }
  res.status(200).json(workout);
};

//add a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //checking which fields are left empty by the user
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");
  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill all the input fields", emptyFields });
  }

  //add doc to db
  try {
    const workout = await Workout.create({ title, load, reps }); // this is an async function
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exists" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "No such workout exists" });
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout exists" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      //this helps in updating as user will pass the updated object themselves
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout exists" });
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
