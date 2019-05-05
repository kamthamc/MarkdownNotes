import { put, takeLatest, select } from 'redux-saga/effects';

// @ts-ignore
import { v4 } from 'uuid';

import { ActionTypes } from '../Constants';

function* addNewNoteSaga(action: any) {
    try {
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_IN_PROGRESS
        });
        const ts = new Date().valueOf();
        const newNote = {
            content: '',
            title: ts,
            createTs: ts,
            updatedTs: ts,
            noteId: v4()
        };
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_COMPLETED,
            payload: {
                newNote,
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: ActionTypes.ADD_NEW_NOTE_FAILED,
            payload: {
                error: e.toString(),
            }
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
        // yield put({
        //     type: ActionTypes.OPEN_NOTE_IN_PROGRESS
        // });
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

const listSelector = (state: any) => state.notesList.list;


function* updateNoteSaga(action: any) {
    const { payload }: { payload: any } = action;
    const list = yield select(listSelector);
    try {
        let matchedIndex = -1;
        for(let index = 0; index < list.length; index += 1) {
            if(list[index].noteId === payload.note.noteId) {
                matchedIndex = index;
                break;
            }
        }
        if(matchedIndex !== -1) {
            const title = payload.note.content.split('\n')[0];
            yield put({
                type: ActionTypes.UPDATE_NOTE_COMPLETED,
                payload: {
                    noteIndex: matchedIndex,
                    note: { ...payload.note, title }
                }
            });
        } else {
            throw new Error('Note not found');
        }
    } catch (e) {
        yield put({
            type: ActionTypes.UPDATE_NOTE_FAILED,
            payload
        });
    }
}

export default function* sagas () {
    const { ADD_NEW_NOTE, DELETE_NOTE, OPEN_NOTE, UPDATE_NOTE } = ActionTypes;
    yield takeLatest(OPEN_NOTE, openNoteSaga);
    yield takeLatest(UPDATE_NOTE, updateNoteSaga);
    yield takeLatest(DELETE_NOTE, deleteNoteSaga);
    yield takeLatest(ADD_NEW_NOTE, addNewNoteSaga);
}
