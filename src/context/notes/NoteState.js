import { useState } from "react"
import noteContext from "./noteContext"
const NoteState = (props) => {
    const notesIntial =
        [
            {
                "_id": "63dd487da621250793548948",
                "user": "63d918f8619c8274159963a4",
                "title": "Parth's Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:37.540Z",
                "__v": 0
            },
            {
                "_id": "63dd487da62125079354894a",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:37.748Z",
                "__v": 0
            },
            {
                "_id": "63dd487da62125079354894c",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:37.941Z",
                "__v": 0
            },
            {
                "_id": "63dd487ea621250793548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
                "__v": 0
            },
            {
                "_id": "63dd487ea629250793548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
                "__v": 0
            },
            {
                "_id": "63dd487ea621250993548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
                "__v": 0
            },
            {
                "_id": "63dd487ea621259793548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
                "__v": 0
            },

        ]
    const [notes, setNotes] = useState(notesIntial)

    //AddNote 
    const addNote = (title, description, tag) => {
        console.log("Adding A new NOte")
        // TODO :API call
        const note = {
            "_id": "63dd487ea621239793548950",
            "user": "63d918f8619c8274159063a4",
            "title":  title,
            "description": description,
            "tag": tag,
            "date": "2023-02-03T17:46:38.353Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    //deleteNote
    const deleteNote = () => {

    }

    // updateNote
    const updateNote = () => {

    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;