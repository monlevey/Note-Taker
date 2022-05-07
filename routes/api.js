// dependencies
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { v4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const dbPath = path.join(__dirname, '..', 'db', 'db.json');

/**
*
* @returns {Array} */

function getNotes(){
    return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

function saveNotesToDb(notes) {
    fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf8');
}

// Routes
router.get('/api/notes', (req, res) => {
    res.json(getNotes());
    console.log('router for api got');
});

router.post('/api/notes', (req, res) => {
    // create new note

    console.log(req.body);
    // generate an id for new note
    const title = req.body.title;
    const text = req.body.text;

    const newNote = {
        id: v4(), 
        title: title,
        text: text,
    }

    // save the new note to the end of the existing array of notes
    const notes = getNotes();

    notes.push(newNote);

    saveNotesToDb(notes);

    res.json({
        data: 'ok',
    });

})
// delete one of the individual notes
router.delete('/api/notes/:id', (req, res) => {
    
    // get all the notes 
    const notes = getNotes();
    // read the note id to delete
    // const id = req.body.id;

    // create new array without the note with matching params id
   const resultNotes = notes.filter((note) => {
    return note.id !== req.params.id
    
   });

    // save to db as new array of notes
    saveNotesToDb(resultNotes);

    res.json({
        data: 'ok',
    })
})

module.exports = router;