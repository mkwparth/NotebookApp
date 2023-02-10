import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import noteContext from '../context/notes/noteContext';
import Notes from './Notes';
import Addnote from './Addnote';

export const Home = () => {
    const context = useContext(noteContext);
    const {notes,setNotes}=context;
    
    return (
        <div className='my-3'>
   
            <Notes/>


        </div>
    )
}