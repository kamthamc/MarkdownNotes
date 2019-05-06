import * as React from 'react';
import { Note } from "../typings";
import { getMarkdownHTML } from '../../../Helpers/Markdown';

interface Props {
    note: Note
}

const PreviewPanel = (props: Props) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: getMarkdownHTML(props.note.content) }} />
    );
};

export default PreviewPanel;
