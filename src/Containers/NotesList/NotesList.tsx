import * as React from 'react';
import {
    MarkdownContainerDiv,
    NotesTitleListContainerDiv,
    NotesListContainerDiv,
    NoteLabelContainer,
    LastUpdated,
    NoteTitle
} from './Styled';
import EmptyNotesList from "./EmptyNotesList";

interface Note {
    title: string,
    content: string,
    createdTs: number,
    updatedTs: number,
    id: string,
}

interface Props {
    addNewNote: ({}) => void,
    notes: Array<string>,
    notesMap: {
        [id: string]: Note,
    },
    activeNoteId?: string,
    editMode: boolean,
}

class NotesList extends React.PureComponent<Props> {

    componentDidMount() {
        this.props.addNewNote({});
    }

    renderNoteMenu(id: string) {
        const {title, updatedTs}: Note = this.props.notesMap[id];
        return (
            <NoteLabelContainer key={id}>
                <NoteTitle>
                    {title}
                </NoteTitle>
                <LastUpdated>
                    {updatedTs}
                </LastUpdated>
            </NoteLabelContainer>
        )
    }

    renderMarkdown() {
        const Panel = this.props.editMode === true ? MarkdownEditor : PreviewPanel;
        if (this.props.activeNoteId) {
            const activeNote = this.props.notesMap[this.props.activeNoteId];
            return <Panel note={activeNote}/>;
        } else {
            return <EmptyNote />;
        }
    }

    render() {
        return (
            <NotesListContainerDiv>
                <NotesTitleListContainerDiv>
                    {
                        this.props.notes.map(this.renderNoteMenu)
                    }
                    {
                        this.props.notes.length === 0 && <EmptyNotesList />
                    }
                </NotesTitleListContainerDiv>
                <MarkdownContainerDiv>
                    {
                        this.renderMarkdown()
                    }
                </MarkdownContainerDiv>
            </NotesListContainerDiv>
        );
    }
}


export default NotesList;
