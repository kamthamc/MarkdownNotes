import { produce } from 'immer';
import { ActionTypes } from '../Constants';
import { RequestStatus } from '../../../Constants';

export interface NotesListState {
    list: Array<{}>
    addNewNote: {
        status: RequestStatus,
        error: string | null,
    },
    deleteNote: {
        status: RequestStatus,
        error: string | null,
    },
    openNote: {
        status: RequestStatus,
        error: string | null,
        noteId: string | null,
        editMode: boolean
    },
    updateNote: {
        status: RequestStatus,
        error: string | null,
    }
}

const initialState: NotesListState = {
    list: [],
    addNewNote: {
        status: RequestStatus.NONE,
        error: null,
    },
    deleteNote: {
        status: RequestStatus.NONE,
        error: null,
    },
    openNote: {
        status: RequestStatus.NONE,
        error: null,
        noteId: null,
        editMode: false,
    },
    updateNote: {
        status: RequestStatus.NONE,
        error: null,
    }
};


const notesList = produce( (draft: NotesListState, action) => {
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
            draft.list.push(action.payload.newNote);
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
            draft.openNote.editMode = false;
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
            draft.openNote.noteId = action.payload.noteId;
            break;

        case ActionTypes.UPDATE_NOTE:
            draft.updateNote.status = RequestStatus.REQUESTED;
            break;

        case ActionTypes.UPDATE_NOTE_IN_PROGRESS:
            draft.updateNote.status = RequestStatus.IN_PROGRESS;
            break;

        case ActionTypes.UPDATE_NOTE_FAILED:
            draft.updateNote.status = RequestStatus.FAILED;
            draft.updateNote.error = action.payload.error;
            break;

        case ActionTypes.UPDATE_NOTE_COMPLETED:
            draft.updateNote.status = RequestStatus.COMPLETED;
            draft.list[action.payload.noteIndex] = action.payload.note;
            break;

        case ActionTypes.TOGGLE_EDIT_MODE:
            draft.openNote.editMode = action.payload.editMode;
            break;

        case ActionTypes.SET_NOTES:
            draft.list = action.payload.notes;
    }
}, initialState);

export default notesList;
