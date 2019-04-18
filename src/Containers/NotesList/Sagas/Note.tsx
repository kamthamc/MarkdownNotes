import { put, takeLatest } from 'redux-saga/effects';

// @ts-ignore
import v5 from 'uuid/v5';

import { ActionTypes } from '../Constants';

function* addNewNoteSaga(action: any) {
    const { payload }: { payload: any } = action;
    try {
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_IN_PROGRESS
        });
        const ts = new Date().valueOf();
        const newNote = {
            note: 'Get Started',
            createTs: ts,
            modifiedTs: ts,
            noteId: v5()
        };
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_COMPLETED,
            payload: {
                note: newNote,
            }
        });
    } catch (e) {
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_FAILED,
            payload
        });
    }
}

function* deleteNoteSaga(action: any) {
    const { payload }: { payload: any } = action;
    try {
        yield put({
            type: ActionTypes.DELETE_NOTE_IN_PROGRESS
        });
        if ((payload.list.length < payload.index) || (payload.list[payload.index].noteId !== payload.noteId)) {
             throw new Error('Invalid Index');
        }
        yield put({
            type: ActionTypes.DELETE_NOTE_COMPLETED,
            payload
        });
    } catch (e) {
        yield put({
            type: ActionTypes.DELETE_NOTE_FAILED,
            payload: {
                error: e.description
            }
        });
    }
}

function* openNoteSaga(action: any) {
    const { payload }: { payload: any } = action;
    try {
        yield put({
            type: ActionTypes.OPEN_NOTE_IN_PROGRESS
        });
        if ((payload.list.length < payload.index) || (payload.list[payload.index].noteId !== payload.noteId)) {
            throw new Error('Invalid Index');
        }
        yield put({
            type: ActionTypes.OPEN_NOTE_COMPLETED,
            payload
        });
    } catch (e) {
        yield put({
            type: ActionTypes.OPEN_NOTE_FAILED,
            payload
        });
    }
}


export default function* sagas () {
    const { ADD_NEW_NOTE, DELETE_NOTE, OPEN_NOTE } = ActionTypes;
    yield takeLatest(OPEN_NOTE, openNoteSaga);
    yield takeLatest(DELETE_NOTE, deleteNoteSaga);
    yield takeLatest(ADD_NEW_NOTE, addNewNoteSaga);
}
