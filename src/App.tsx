import * as React from 'react';

import { NotesListContainer } from './Containers';
import { Route } from 'react-router';

const App = () => (
    <div>
        <Route path="/" component={NotesListContainer} />
    </div>
);

export default App;
