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

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
            dark: '#002884',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const App = () => (
    <ThemeProvider theme={theme}>
        <ContainerDiv>
            <CssBaseline />
            <Container maxWidth={false} style={{ height: '100%' }}>
                <Typography component="div" style={{ height: '100%' }}>
                    <Route path="/" component={NotesListContainer} />
                </Typography>
            </Container>
        </ContainerDiv>
    </ThemeProvider>
);

export default App;
