import { createSelector } from 'reselect';

const notesListState = (state: any) => state.notesList;

export const notesList = createSelector(notesListState, ({ list }) => list);
