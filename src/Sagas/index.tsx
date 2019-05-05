import { fork, all } from 'redux-saga/effects';

import { NotesList } from '../Containers';

export default function* sagas() {
    yield all([
        fork(NotesList),
    ]);
}
