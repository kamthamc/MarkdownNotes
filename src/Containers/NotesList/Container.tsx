import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import NotesList from './NotesList';
import { NotesListState } from './Reducers';
import { openNote, deleteNote, addNewNote } from './Actions';

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openNote: (payload: any) => dispatch(openNote(payload)),
    deleteNote: (payload: any) => dispatch(deleteNote(payload)),
    addNewNote: (payload: any) => dispatch(addNewNote(payload)),
});

const mapState = (state: { notesList: NotesListState }) => ({});

export default connect(
    mapState,
    mapDispatchToProps,
)(NotesList);
