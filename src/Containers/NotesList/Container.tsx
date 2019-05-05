import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import NotesList from './NotesList';

import {activeNoteIdSelector, editModeSelector, notesListSelector, notesMapSelector} from './Selectors';

import { openNote, deleteNote, addNewNote, updateNote } from './Actions';
import {toggleEditMode} from "./Actions/Note";

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openNote: (payload: any) => dispatch(openNote(payload)),
    updateNote: (payload: any) => dispatch(updateNote(payload)),
    deleteNote: (payload: any) => dispatch(deleteNote(payload)),
    addNewNote: () => dispatch(addNewNote()),
    toggleEditMode: (payload: any) => dispatch(toggleEditMode(payload)),
});

const mapState = (state: any) => ({
    notes: notesListSelector(state),
    notesMap: notesMapSelector(state),
    activeNoteId: activeNoteIdSelector(state),
    editMode: editModeSelector(state),
});

export default connect(
    mapState,
    mapDispatchToProps,
)(NotesList);
