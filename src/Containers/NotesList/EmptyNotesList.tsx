import * as React from 'react';
import { KeyboardEvent } from "react";

const EmptyNotesList = () => {
    const handleKeyUp = (evt: KeyboardEvent<HTMLDivElement>) => {
        if(evt.key === 'n') {
            evt.preventDefault();
            console.log('wohoo');
        }
    };

    return (
        <div onKeyUp={handleKeyUp}>
            type n to start a new note
        </div>
    );
};

export default EmptyNotesList;