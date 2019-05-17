import { put, takeLatest, select, delay } from 'redux-saga/effects';

import { v4 } from 'uuid';

import { ActionTypes } from '../Constants';
import { Note } from '../typings';


const storageKeyPrefix = 'RMN';

const notesKey = `${storageKeyPrefix}.notes`;

const listSelector = (state: any) => state.notesList.list;
const openNoteSelector = (state: any) => state.notesList.openNote;

function* addNewNoteSaga() {
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
        yield delay(500);
        yield put({
            type: ActionTypes.SAVE_NOTES
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
        const list = yield select(listSelector);
        const openNote = yield select(openNoteSelector);
        let index = 0;
        for ( index; index < list.length; index += 1 ) {
            if ( list[index].noteId === payload.noteId ) {
                break;
            }
        }
        if (index >= list.length || list.length === 0 ) {
             throw new Error('Invalid Index');
        }
        if ( openNote.noteId === payload.noteId ) {
            yield put({
                type: ActionTypes.OPEN_NOTE_COMPLETED,
                payload: {
                    noteId: null,
                }
            })
        }
        yield put({
            type: ActionTypes.DELETE_NOTE_COMPLETED,
            payload: {
                index,
            }
        });
        yield delay(500);
        yield put({
            type: ActionTypes.SAVE_NOTES
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
                    note: { ...payload.note, title, updatedTs: new Date().valueOf() }
                }
            });
            yield delay(500);
            yield put({
                type: ActionTypes.SAVE_NOTES
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

function* loadNotesFromLocalStorage() {
    const notes = window.localStorage.getItem(notesKey);
    if ( notes ) {
        try {
            const parsedNotes: Array<Note> = JSON.parse(notes);
            if ( parsedNotes.length ) {
                yield put({
                    type: ActionTypes.SET_NOTES,
                    payload: {
                        notes: parsedNotes,
                    }
                });
            }
        } catch ( e ) {
            console.error(e);
        }
    }
}

function* saveNotesToLocalStorage() {
    try {
        const notes = yield select(listSelector);
        window.localStorage.setItem(notesKey, JSON.stringify(notes));
    } catch ( e ) {
        console.error(e);
    }
}

export default function* sagas () {

    const { ADD_NEW_NOTE, DELETE_NOTE, OPEN_NOTE, UPDATE_NOTE, LOAD_NOTES, SAVE_NOTES } = ActionTypes;
    yield takeLatest(OPEN_NOTE, openNoteSaga);
    yield takeLatest(UPDATE_NOTE, updateNoteSaga);
    yield takeLatest(DELETE_NOTE, deleteNoteSaga);
    yield takeLatest(ADD_NEW_NOTE, addNewNoteSaga);
    yield takeLatest(LOAD_NOTES, loadNotesFromLocalStorage);
    yield takeLatest(SAVE_NOTES, saveNotesToLocalStorage);
}
