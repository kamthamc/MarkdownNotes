import * as React from 'react';

import { NotesListContainer } from './Containers';
import { Route } from 'react-router';

const App = () => (
    <div>
        Wow
        <NotesListContainer />
        <Route path="/" exact component={NotesListContainer} />
    </div>
);

export default App;
