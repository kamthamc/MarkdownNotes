import * as React from 'react';
import {
    MarkdownContainerDiv,
    NotesTitleListContainerDiv,
    NotesListContainerDiv,
    NoteLabelContainer,
    LastUpdated,
    NoteTitle,
    NotesListHeader,
    NotesListHeaderTitle,
    NotesListHeaderActions,
    NotesListHeaderActionItem,
    MarkdownHeaderTitle,
    MarkdownHeader
} from './Styled';
import EmptyNotesList from "./EmptyNotesList";
import EmptySelection from "./EmptySelection";
import { MarkdownEditor } from "./MarkdownEditor";
import { PreviewPanel } from "./PreviewPanel";
import { Note } from "./typings";
import { getMarkdownHTML } from '../../Helpers/Markdown';


interface Props {
    toggleEditMode: ({}) => void,
    openNote: ({}) => void,
    updateNote: ({}) => void,
    addNewNote: () => void,
    loadNotes: () => void,
    notes: Array<string>,
    notesMap: {
        [id: string]: Note,
    },
    activeNoteId?: string,
    editMode: boolean,
}

class NotesList extends React.PureComponent<Props> {

    componentDidMount() {
        this.props.loadNotes();
    }

    addNewNote = () => {
        this.props.addNewNote();
    };

    openNote = (noteId: string) => {
        this.props.openNote({
            noteId,
        });
    };

    renderNoteMenu = (id: string) => {
        const { title, updatedTs }: Note = this.props.notesMap[id];
        return (
            <NoteLabelContainer key={id} onClick={() => this.openNote(id)}>
                <NoteTitle dangerouslySetInnerHTML={{ __html: getMarkdownHTML(title, true)}} />
                <LastUpdated>
                    {updatedTs}
                </LastUpdated>
            </NoteLabelContainer>
        )
    };

    updateNote = (note: Note) => {
      this.props.updateNote({
          note
      });
    };

    renderMarkdown = () => {
        if (this.props.activeNoteId) {
            const activeNote = this.props.notesMap[this.props.activeNoteId];
            if(activeNote.content.length === 0 && this.props.editMode === false) {
                this.props.toggleEditMode({ editMode: true });
            }
            const Panel = this.props.editMode ? MarkdownEditor : PreviewPanel;
            const headerPanel = this.props.editMode ?
                (
                    <MarkdownHeader>
                        <MarkdownHeaderTitle
                            dangerouslySetInnerHTML={{ __html: getMarkdownHTML(activeNote.title, true)}} />
                        <NotesListHeaderActions>
                            <NotesListHeaderActionItem
                                onClick={() => this.props.toggleEditMode({ editMode: false })}
                            >
                                Done
                            </NotesListHeaderActionItem>
                        </NotesListHeaderActions>
                    </MarkdownHeader>
                ) :
                (
                    <MarkdownHeader>
                        <MarkdownHeaderTitle dangerouslySetInnerHTML={{ __html: getMarkdownHTML(activeNote.title, true)}} />
                            <NotesListHeaderActions>
                            <NotesListHeaderActionItem
                                onClick={() => this.props.toggleEditMode({ editMode: true })}
                            >
                                Edit
                            </NotesListHeaderActionItem>
                        </NotesListHeaderActions>

                    </MarkdownHeader>
                );
            return (
                <>
                    { headerPanel }
                    <Panel note={activeNote} updateNote={this.updateNote} />
                </>
            );
        } else {
            return (
                <>
                    <MarkdownHeader />
                    <EmptySelection />
                </>
            );
        }
    };

    render() {
        return (
            <NotesListContainerDiv>
                <NotesTitleListContainerDiv>
                    <NotesListHeader>
                        <NotesListHeaderTitle>
                            Notes
                        </NotesListHeaderTitle>
                        <NotesListHeaderActions>
                            <NotesListHeaderActionItem
                                onClick={this.addNewNote}
                            >
                                Add
                            </NotesListHeaderActionItem>
                        </NotesListHeaderActions>
                    </NotesListHeader>
                    {
                        this.props.notes.map(this.renderNoteMenu)
                    }
                    {
                        this.props.notes.length === 0 &&
                        <EmptyNotesList />
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
