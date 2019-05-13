import * as React from 'react';
import { ChangeEvent } from 'react';
import { Note } from "../typings";
import TextField from '@material-ui/core/TextField';


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
        <TextField
            type="textarea"
            multiline
            rows="10"
            placeholder="Notes"
            fullWidth
            autoFocus
            value={props.note.content}
            onChange={onChange}
            margin="none"
            variant="filled"
        />
    );
};

export default EmptyNotesList;
