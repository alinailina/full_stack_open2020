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

beforeEach(async () => {
  await Note.deleteMany({});

  const noteObjects = initialNotes
    .map(note => new Note(note));
  const promiseArray = noteObjects.map(note => note.save());
  await Promise.all(promiseArray);
});

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

test("a valid note can be added", async () => {
  const newNote = {
    content: "async/await simplifies making async calls",
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
    "async/await simplifies making async calls"
  );
});

test("note without content is not added", async () => {
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


test("a note can be deleted", async () => {
  const notesAtStart = await Note.find();
  const noteToDelete = notesAtStart[1];

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204);

  const notesAtEnd = await Note.find({});

  expect(notesAtEnd).toHaveLength(
    initialNotes.length - 1
  );

  const contents = notesAtEnd.map(r => r.content);

  expect(contents).not.toContain(noteToDelete.content);
});


afterAll(() => {
  mongoose.connection.close();
});