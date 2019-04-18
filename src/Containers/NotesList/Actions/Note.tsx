import { ActionTypes } from '../Constants';

export const addNewNote = (payload: any) => ({
    type: ActionTypes.ADD_NEW_NOTE,
    payload
});

export const deleteNote = (payload: any) => ({
    type: ActionTypes.DELETE_NOTE,
    payload
});

export const openNote = (payload: any) => ({
    type: ActionTypes.OPEN_NOTE,
    payload
});
