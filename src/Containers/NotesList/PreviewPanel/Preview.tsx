import * as React from 'react';
import { Note } from "../typings";

interface Props {
    note: Note
}

const PreviewPanel = (props: Props) => {
    return (
        <div>
            {props.note.content}
        </div>
    );
};

export default PreviewPanel;