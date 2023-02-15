import React, { useContext, useEffect, useRef,useState } from 'react'

import noteContext from '../context/notes/noteContext';
import AddNote from './Addnote';
import Noteitem from './Noteitem';
const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes ,editNote} = context;
    useEffect(() => {
        getNotes();
        //eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refclose = useRef(null);
    const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" })
    const updateNote = (currentnote) => {
        ref.current.click();
        setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
    }
    const handleClick = (e) => {
        
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label"><b>Title</b></label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label"><b>Description</b></label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label"><b>Tag </b> </label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>

                             
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<2} type="button" onClick={handleClick} className="btn btn-primary"  >Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3 '>
                <h2>Your Note</h2>
                <div className="container mx-1">

                {notes.length === 0 && "No notes available"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                    })
                }
            </div>
        </>
    )
}

export default Notes
