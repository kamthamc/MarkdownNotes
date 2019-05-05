import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from './Themes/Default';

import { NotesListContainer } from './Containers';
import { Route } from 'react-router';

const Container = styled('div')`
  height: 100%;
`;

const App = () => (
    <ThemeProvider theme={defaultTheme}>
        <Container>
            <Route path="/" component={NotesListContainer} />
        </Container>
    </ThemeProvider>
);

export default App;
