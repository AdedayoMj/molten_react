import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import Box from '@mui/material/Box';
//Pages
import { RoutesPage } from './Routes';

const theme = createTheme({
  palette: {
    primary: {
      main: '#073642',
    },
  },
});

//apollo client
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: 'white',

    boxSizing: 'border-box',
    width: '100%',
    minHeight: '100vh',
    overflow: 'auto',
  },
}));

export const App: React.FC = () => {
  const { classes } = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Box className={classes.root}>
            <RoutesPage />
          </Box>
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};
