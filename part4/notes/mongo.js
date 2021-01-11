const mongoose = require("mongoose");
const logger = require("./utils/logger");

// Zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();

const url = process.env.MONGODB_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

// const note = new Note({
//   content: "Thanks for checking my app :)",
//   date: new Date(),
//   important: true,
// });

// note.save().then(result => {
//   console.log(note);
//   console.log("Note saved!");
//   mongoose.connection.close();
// });

// Objects are retrieved from the database with .find() method of the Note model.
Note.find().then((result) => {
  logger.info("All notes");
  result.forEach((note) => {
    logger.info(note);
  });
  mongoose.connection.close();
});

// The parameter of the method .find() is an object expressing search conditions.
Note.find({ important: true }).then((result) => {
  logger.info("Important notes");
  result.forEach((note) => {
    logger.info(note);
  });
  mongoose.connection.close();
});
// --> Prints only important notes
