const { Router } = require('express');
const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');




// ROUTE 1 : Get all the note using : GET "/api/notes/getuser". Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json([notes])

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }




    // res.json(["notes"]);

});
// ROUTE 2 : Add a new Note using : POST "/api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {


        const { title, description, tag } = req.body;

        // if there are error return bad request and the errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json([savedNote])
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }


});

// ROUTE 3 : Update excisting note using : PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    // Create a Newnote Object
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    // find the note and update it
    let note = await Note.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })



})

// ROUTE 4 : Deltete excisting note using : DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;

    // find the note to be delete and delete it
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }
        // Allow deletion only user owns this note.
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note Has been deleted", note: note })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error ");
    }
    

})


module.exports = router 