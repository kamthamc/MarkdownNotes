import * as React from 'react';
import {Note} from "../typings";
import {ChangeEvent} from "react";

interface Props {
    note: Note,
    updateNote: (note: Note) => void
}

const EmptyNotesList = (props: Props) => {
    const onChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
        const content = evt.target.value;
        const newNote = { ...props.note, content };
        props.updateNote(newNote);
    };
    return (
        <div>
            <textarea
                value={props.note.content}
                onChange={onChange}
                style={{ width: '100%', height: '100%' }}
                rows={10}
            />
        </div>
    );
};

export default EmptyNotesList;