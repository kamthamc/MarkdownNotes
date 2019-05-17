import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { MarkdownContainerDiv, NotesListContainerDiv, NotesTitleListContainerDiv, } from './Styled';
import EmptyNotesList from "./EmptyNotesList";
import EmptySelection from "./EmptySelection";
import { MarkdownEditor } from "./MarkdownEditor";
import { PreviewPanel } from "./PreviewPanel";
import { Note } from "./typings";
import { getMarkdownHTML } from '../../Helpers/Markdown';
import { ThemeProvider, withStyles  } from '@material-ui/styles';
// @ts-ignore
import { saveAs } from 'file-saver';


interface Props {
    toggleEditMode: ({}) => void,
    openNote: ({}) => void,
    updateNote: ({}) => void,
    deleteNote: ({}) => void,
    addNewNote: () => void,
    loadNotes: () => void,
    notes: Array<string>,
    notesMap: {
        [id: string]: Note,
    },
    activeNoteId?: string,
    editMode: boolean,
    theme: any,
}

class NotesList extends React.Component<Props> {

    childContextTypes = {
        theme: {},
    };
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

    downloadNote = (noteId: string | undefined) => {
        if ( noteId ) {
            const { content, title } = this.props.notesMap[noteId];
            const fileName = getMarkdownHTML(title, true);
            const file = new File([content], `${ fileName }.md`, { type: 'text/markdown;charset=utf-8' });
            saveAs(file);
        }
    }

    getMomentString(value: number | string) {
        const dt = new Date(value);
        return `${ dt.toLocaleDateString() } ${ dt.toLocaleTimeString() }`;
    }

    renderNoteMenu = (id: string) => {
        const { title, updatedTs }: Note = this.props.notesMap[id];
        return (
            <ListItem
                dense
                button
                key={ id }
                onClick={ () => this.openNote(id) }
                selected={ id === this.props.activeNoteId }
                divider
            >
                <ListItemText
                    primary={ getMarkdownHTML(title, true) }
                    secondary={ this.getMomentString(updatedTs) }
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => this.props.deleteNote({ noteId: id })}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    };

    updateNote = (note: Note) => {
        this.props.updateNote({
            note
        });
    };

    renderMarkdown = () => {
        if ( this.props.activeNoteId ) {
            const activeNote = this.props.notesMap[this.props.activeNoteId];
            if ( activeNote.content.length === 0 && this.props.editMode === false ) {
                this.props.toggleEditMode({ editMode: true });
            }
            const Panel = this.props.editMode ? MarkdownEditor : PreviewPanel;
            const headerPanel = this.props.editMode ?
                (
                  <IconButton
                    onClick={ () => this.props.toggleEditMode({ editMode: false }) }
                    color="inherit"
                  >
                      <CheckCircleIcon/>
                  </IconButton>
                ) :
                (
                  <IconButton
                    onClick={ () => this.props.toggleEditMode({ editMode: true }) }
                    color="inherit"
                  >
                      <EditIcon/>
                  </IconButton>
                );
            return (
                <>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography
                              style={ { flexGrow: 1 } }
                              variant="h6"
                              dangerouslySetInnerHTML={ { __html: getMarkdownHTML(activeNote.title, true) } }
                            />
                            <IconButton
                              onClick={ () => this.downloadNote(this.props.activeNoteId) }
                              color="inherit"
                            >
                                <CloudDownloadIcon />
                            </IconButton>
                            <IconButton
                              onClick={ () => this.props.deleteNote({ noteId: this.props.activeNoteId }) }
                              color="inherit"
                            >
                                <DeleteIcon/>
                            </IconButton>
                            { headerPanel }
                        </Toolbar>

                    </AppBar>
                    <Card>
                        <Panel note={ activeNote } updateNote={ this.updateNote }/>
                    </Card>
                </>
            );
        } else {
            return (
                <>
                    <AppBar position="static">
                        <Toolbar variant="dense"/>
                    </AppBar>
                    <Container maxWidth={ false }>
                        <EmptySelection/>
                    </Container>

                </>
            );
        }
    };

    render() {
        return (
            <NotesListContainerDiv>
                <NotesTitleListContainerDiv>
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <Typography
                                variant="h6"
                                style={ { flexGrow: 1 } }
                            >
                                Notes
                            </Typography>
                            <IconButton
                                onClick={ this.addNewNote }
                                color="inherit"
                            >
                                <AddIcon/>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <List component="nav">
                        {
                            this.props.notes.map(this.renderNoteMenu)
                        }

                        {
                            this.props.notes.length === 0 &&
                            <EmptyNotesList/>
                        }
                    </List>
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


export default withStyles({})(NotesList);
