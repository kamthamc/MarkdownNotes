import { ActionTypes } from '../Constants';

export const addNewNote = () => ({
    type: ActionTypes.ADD_NEW_NOTE,
});

export const loadNotes = () => ({
    type: ActionTypes.LOAD_NOTES,
});

export const deleteNote = (payload: any) => ({
    type: ActionTypes.DELETE_NOTE,
    payload
});

export const openNote = (payload: any) => ({
    type: ActionTypes.OPEN_NOTE,
    payload
});

export const updateNote = (payload: any) => ({
    type: ActionTypes.UPDATE_NOTE,
    payload
});


export const toggleEditMode = (payload: any) => ({
    type: ActionTypes.TOGGLE_EDIT_MODE,
    payload
});
