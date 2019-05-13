import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider, styled } from '@material-ui/styles';

import { NotesListContainer } from './Containers';
import { Route } from 'react-router';

const ContainerDiv = styled('div')({
  height: '100%',
});

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
});

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#322f36'
        },
        secondary: {
            main: '#fff'
        }
    },
});

const App = () => (
    <ThemeProvider theme={darkTheme}>
        <ContainerDiv>
            <CssBaseline />
            <Container maxWidth={false} style={{ height: '100%', padding: 0 }}>
                <Typography component="div" style={{ height: '100%' }}>
                    <Route path="/" component={NotesListContainer} />
                </Typography>
            </Container>
        </ContainerDiv>
    </ThemeProvider>
);

export default App;
