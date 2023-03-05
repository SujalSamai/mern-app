//mongoose allows us to create schemas and models, mongodb in itself is schema-less
// A Mongoose model is a wrapper of the Mongoose schema. A Mongoose schema defines the document's properties, default values, types of data, validators, etc. In contrast, a Mongoose model provides an interface for the database to create, query, update, delete records, and so on.
const mongoose = require("mongoose");

//schema basically defines how the document structure inside the db will be
const Schema = mongoose.Schema;

//schema takes two arguments, one is the structure of the object that will be saved in the db, second one is another object
//here second obj is timestamps, which automatically saves the time at which the object is created
const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    reps: { type: Number, required: true },
    load: { type: Number, required: true },
  },
  { timestamps: true }
);

//model applies the schemas to a particular model & we use it to interact with the collection of that name

module.exports = mongoose.model("Workout", workoutSchema);
