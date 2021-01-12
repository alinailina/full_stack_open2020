const router = require("express").Router();
// const logger = require("../utils/logger");

const Note = require("../models/note");

// router.get("/", (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   })
//     .catch((error) => {
//       logger.error(error);
//       response.status(400).send();
//       // --> 400 Bad request
//     });
// });

router.get("/", async (request, response, next) => {
  try {
    const notes = await Note.find({});
    response.json(notes);
  }
  catch(exception) {
    next(exception);
  }
});

// router.get("/:id", (request, response) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//         // --> 404 Not found
//       }
//     })
//     .catch((error) => {
//       logger.error(error);
//       response.status(400).send({ error: "Malformatted id" });
//       // --> 400 Bad request
//     });
// });

router.get("/:id", async (request, response, next) => {
  try{
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch(exception) {
    next(exception);
  }
});

// router.post("/", (request, response) => {
//   const body = request.body;

//   if (body.content === undefined) {
//     return response.status(400).json({
//       // --> 400 Bad request
//       error: "Content missing",
//     });
//   }
//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   note.save().then((savedNote) => {
//     response.json(savedNote);
//   }).catch((error) => {
//     logger.error(error);
//     response.status(400).send({ error: "Error saving note" });
//     // --> 400 Bad request
//   });
// });

router.post("/", async (request, response, next) => {
  try {
    const body = request.body;

    if (body.content === undefined) {
      return response.status(400).json({
        error: "Content missing",
      });
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    });

    const savedNote = await note.save();
    response.json(savedNote);
  } catch(exception) {
    next(exception);
  }
});

// router.put("/:id", (request, response) => {
//   const body = request.body;

//   if (body.content === undefined) {
//     return response.status(400).json({
//       error: "Content missing",
//       // --> 400 Bad request
//     });
//   }

//   const updatedNote = {
//     content: body.content,
//     important: body.important || false,
//   };

//   Note.findByIdAndUpdate(request.params.id, updatedNote, { new: true })
//     // ---> By default, the updatedNote parameter receives the original document without the modifications. Optional { new: true } parameter causes the event handler to be called with the new modified document instead of the original.
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => {
//       logger.error(error);
//       response.status(400).send({ error: "Error updating note" });
//       // --> 400 Bad request
//     });
// });

// router.delete("/:id", (request, response) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then((result) => {
//       response.status(204).end();
//       // --> 204 No Content
//     })
//     .catch((error) => {
//       logger.error(error);
//       response.status(400).send({ error: "Error deleting note" });
//       // --> 400 Bad request
//     });
// });

router.delete("/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = router;