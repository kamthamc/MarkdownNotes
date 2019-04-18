import { produce } from 'immer';
import { ActionTypes } from '../Constants';
import { RequestStatus } from '../../../Constants';

const initialState = {
    list: [],
    addNewNote: {
        status: RequestStatus.NONE,
        error: null,
    },
    deleteNote: {
        status: RequestStatus.NONE,
        error: null,
    }
};


const notesList = produce( (draft, action) => {
    switch (action.type) {

        case ActionTypes.ADD_NEW_NOTE:
            draft.addNewNote.status = RequestStatus.REQUESTED;
            draft.addNewNote.error = null;
            break;

        case ActionTypes.ADD_NEW_NOTE_IN_PROGRESS:
            draft.addNewNote.status = RequestStatus.IN_PROGRESS;
            break;

        case ActionTypes.ADD_NEW_NOTE_FAILED:
            draft.addNewNote.status = RequestStatus.FAILED;
            draft.addNewNote.error = action.payload.error;
            break;

        case ActionTypes.ADD_NEW_NOTE_COMPLETED:
            draft.addNewNote.status = RequestStatus.COMPLETED;
            draft.list.push(draft.payload.newNote);
            break;

        case ActionTypes.DELETE_NOTE:
            draft.deleteNote.status = RequestStatus.REQUESTED;
            break;

        case ActionTypes.DELETE_NOTE_IN_PROGRESS:
            draft.deleteNote.status = RequestStatus.IN_PROGRESS;
            break;

        case ActionTypes.DELETE_NOTE_FAILED:
            draft.deleteNote.status = RequestStatus.FAILED;
            draft.deleteNote.error = action.payload.error;
            break;

        case ActionTypes.DELETE_NOTE_COMPLETED:
            draft.deleteNote.status = RequestStatus.COMPLETED;
            draft.list.splice(action.payload.index,  1);
            break;

        case ActionTypes.OPEN_NOTE:
            draft.openNote.status = RequestStatus.REQUESTED;
            break;

        case ActionTypes.OPEN_NOTE_IN_PROGRESS:
            draft.openNote.status = RequestStatus.IN_PROGRESS;
            break;

        case ActionTypes.OPEN_NOTE_FAILED:
            draft.openNote.status = RequestStatus.FAILED;
            draft.openNote.error = action.payload.error;
            break;

        case ActionTypes.OPEN_NOTE_COMPLETED:
            draft.openNote.status = RequestStatus.COMPLETED;
            break;

    }
}, initialState);

export default notesList;
