"use strict";
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const knex = require("knex");
const { NODE_ENV, DB_URL } = require("./config");
const FoldersService = require("./folders/folders-service");
const NotesService = require("./notes/notes-service");
const app = express();

//----------Middlewares-------------------------
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

//-----------Folders Routes--------------------
const db = knex({
  client: "pg",
  connection: DB_URL,
});
//get all folders
app.get("/api/folders", async (req, res, next) => {
  try {
    const articles = await FoldersService.getAllFolders(db);
    res.status(200).send(articles);
  } catch (error) {
    next(error);
  }
});
//get one folder
app.get("/api/folders/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const article = await FoldersService.getFolderById(db, id);
    res.status(200).send(article);
  } catch (error) {
    next(error);
  }
});
//create a new folder
app.post("/api/folders/add-folder", async (req, res, next) => {
  const {id, name} = req.body;
  if(!name){return res.status(400).send('Name required')};
  const newFolder = {
    id,
    name
  };
  try {
    await FoldersService.insertFolder(db, newFolder);
    res.status(201).send("New folder created successfully");
  } catch (error) {
    next(error);
  }
});
//delete folder
app.delete('/api/folders/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    await FoldersService.deleteFolder(db, id);
    res.status(200).send('Folder deleted');
  } catch (error) {
    next(error);
  }
})
//update folder
app.put('/api/folders/:id', async (req, res, next) => {
  const {id} = req.params;
  const {name} = req.body;
  try {
    await FoldersService.updateFolder(db, id, {name});
    res.status(200).send('Folder updated successfully');
  } catch (error) {
    next(error);
  }
})
//-------------Notes Routes-------------------------
//get all notes
app.get('/api/notes', async (req, res, next) => {
  try {
    const notes = await NotesService.getAllNotes(db);
    res.status(200).send(notes);
  } catch (error) {
    next(error)
  }
})
//get one note
app.get('/api/notes/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const note = await NotesService.getNoteById(db, id);
    res.status(200).send(note);
  } catch (error) {
    next(error);
  }
})
//post a note
app.post('/api/notes/add-note', async (req, res, next) => {
  const {id, name, content, folder_id} = req.body;
  const newNote = {
    name,
    content,
    folder_id
  }
  try {
    await NotesService.insertNote(db, newNote);
    res.status(201).send('Note created');
  } catch (error) {
    next(error)
  }
})
//delete note
app.delete('/api/notes/:id', async (req, res, next) => {
  const {id} = req.params;
  try {
    await NotesService.deleteNote(db, id);
    res.status(200).send('Note deleted')
  } catch (error) {
    next(error)
  }
})
//update note
app.put('/api/notes/:id', async(req, res, next) => {
  const {id} = req.params;
  const {name, content, folder_id} = req.body;
  const updateFolder = {
    name,
    content,
    folder_id
  }
  try {
    await NotesService.updateNote(db, id, updateFolder);
    res.status(200).send('Note updated')
  } catch (error) {
    next(error)
  }
})





module.exports = app;
