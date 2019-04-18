import { combineReducers } from 'redux'

import { Reducer as NotesListReducer } from '../Containers/NotesList';

export default combineReducers({
    notesList: NotesListReducer,
});
