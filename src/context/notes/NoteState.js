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
                "_id": "63dd487ea621250793548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
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
                "_id": "63dd487ea621250793548950",
                "user": "63d918f8619c8274159963a4",
                "title": "Mohan Life",
                "description": " , running ,sweating repeatok ",
                "tag": "life-motivation",
                "date": "2023-02-03T17:46:38.353Z",
                "__v": 0
            },

        ]
    const [notes, setNotes] = useState(notesIntial)
    return (
        <noteContext.Provider value={{ notes , setNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;