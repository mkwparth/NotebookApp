import { useState } from "react"
import noteContext from "./noteContext"
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesIntial = []
    const [notes, setNotes] = useState(notesIntial)

    //get all notes 
    const getNotes = async () => { 
        //API Call
        const url = "http://localhost:5000/api/notes/fetchallnotes"

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token') 
            }
 
        });
        const json = await response.json();
        console.log(json[0]) 
        setNotes(json[0])
    }
    //AddNote 
    const addNote = async (title, description, tag) => { 
        //API Call
        const url = `${host}/api/notes/addnote`
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkOTE4Zjg2MTljODI3NDE1OTk2M2E0In0sImlhdCI6MTY3NjI5ODg0M30.zSehKUMK__p2Q4EkLfx017zzc30hqbw2Z9bm04LQW6s"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token') 

            },

            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setNotes(notes.concat(note)) 
  
    }

    //deleteNote
    const deleteNote = async (id) => {
        console.log("DELETING Note with ID" + id);
        const url = `${host}/api/notes/deletenote/${id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token') 

            }
        });
        const json = await response.json();
        console.log(json);
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote)   
    }

    // updateNote
    const editNote = async (id, title, description, tag) => {
        //API Call
        const url = `${host}/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token') 

            },

            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);


        let newNotes=JSON.parse(JSON.stringify(notes));

        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
             
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag; 
                break;
            }

        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;