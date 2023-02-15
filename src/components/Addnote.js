import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: ""})
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Add Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label"><b>Title</b></label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><b>Description</b></label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label"><b>Tag </b> </label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>

                <button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<2} type="submit" className="btn btn-primary" onClick={handleClick}>AddNote</button>
            </form>
        </div>
    )
}

export default AddNote
