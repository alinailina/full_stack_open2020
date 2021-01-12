const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Note = require("../models/note");

const initialNotes = [
  {
    content: "Anything that can go wrong, will go wrong",
    date: new Date(),
    important: false,
  },
  {
    content: "Everything that can work, will work",
    date: new Date(),
    important: true,
  },
];

// beforeEach(async () => {
//   await Note.deleteMany({});
//   let noteObject = new Note(initialNotes[0]);
//   await noteObject.save();
//   noteObject = new Note(initialNotes[1]);
//   await noteObject.save();
// });

beforeEach(async () => {
  await Note.deleteMany({});

  for (let note of initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }
});

describe("if notes", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(initialNotes.length);
  });

  test("the first note describes Murphy's law", async () => {
    const response = await api.get("/api/notes");

    expect(response.body[0].content).toBe("Anything that can go wrong, will go wrong");
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map(response => response.content);
    expect(contents).toContain(
      "Everything that can work, will work"
    );
  });
});

describe("viewing a specific note", () => {
  test("succeeds with a valid id", async () => {
    const notesAtStart = await api.get("/api/notes");
    const noteToView = notesAtStart.body[0];

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView));

    expect(resultNote.body).toEqual(processedNoteToView);
  });

  test("fails with statuscode 404 if note does not exist", async () => {
    const nonExistingId = async () => {
      const note = new Note({ content: "Temporary note", date: new Date() });
      await note.save();
      await note.remove();
      return note.id;
    };

    const validNonexistingId = await nonExistingId();
    // console.log(validNonexistingId);
    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "1234567890";

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400);
  });
});

describe ("creating new notes", () => {
  test("succeeds with valid data", async () => {
    const newNote = {
      content: "New note",
      important: true,
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/notes");

    const contents = response.body.map(response => response.content);

    expect(response.body).toHaveLength(initialNotes.length + 1);
    expect(contents).toContain(
      "New note"
    );
  });

  test("fails with status code 400 if data is invaild", async () => {
    const newNote = {
      important: true
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(400);

    const response = await api.get("/api/notes");

    expect(response.body).toHaveLength(initialNotes.length);
  });
});

describe ("deleting a note", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const notesAtStart = await Note.find({});
    const noteToDelete = notesAtStart[1];

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204);

    const notesAtEnd = await Note.find({});

    expect(notesAtEnd).toHaveLength(
      initialNotes.length - 1
    );

    const contents = notesAtEnd.map(response => response.content);

    expect(contents).not.toContain(noteToDelete.content);
  });
});

afterAll(() => {
  mongoose.connection.close();
});