import { combineReducers } from 'redux'

import { Reducer as NotesListReducer } from '../Containers';

export default combineReducers({
    notesList: NotesListReducer,
});
