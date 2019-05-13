import { createSelector } from 'reselect';
import { Note } from '../typings';

const notesListState = (state: any) => state.notesList;

export const listSelector = createSelector(notesListState, ({ list }) => list);
export const notesMapSelector = createSelector(listSelector, notesList => {
    const map: { [key: string]: Note } = {};
    for(let index = 0; index < notesList.length; index += 1) {
        const note = notesList[index];
        map[note.noteId] = note;
    }
    return map;
});
export const notesListSelector = createSelector(
    notesMapSelector,
    map => {
        return Object
            .keys(map)
            .sort((noteId1, noteId2) => map[noteId2].updatedTs - map[noteId1].updatedTs);
    }
);

export const activeNoteIdSelector = createSelector(notesListState, ({ openNote: { noteId } }) => noteId);
export const editModeSelector = createSelector(notesListState, ({ openNote: { editMode } }) => editMode);
