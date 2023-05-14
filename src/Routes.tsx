import { Route, Routes } from 'react-router';

import React from 'react';

import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { makeStyles } from 'tss-react/mui';

//Pages
import SiteHeader from './components/SiteHeader';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import ErrorPage from './pages/ErrorPage';
import ContactUs from './pages/ContactUs';
import ProjectPage from './pages/Project';
import ServicePage from './pages/ServicePage';
import { FAILCHECK } from './hooks/useFetch';
import Failsafe from './pages/Failsafe';
import Footer from './components/Footer';

const useStyles = makeStyles()((theme) => ({
  settings: {
    margin: '0 2rem 2rem 2rem',
  },

  footer: { marginTop: 'auto' },
}));

export const RoutesPage: React.FC = () => {
  const { classes } = useStyles();
  const { loading, error, data } = useQuery(FAILCHECK);

  return (
    <Box>
      {loading ? (
        ''
      ) : !data ||
        (!data.home &&
          !data.projects &&
          !data.services &&
          !data.companyAddress) ||
        error ? (
        <Failsafe />
      ) : (
        <Box>
        <Box className={classes.settings}>
          <Box>
            <SiteHeader />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Box>
         
        </Box>
         <Box className={classes.footer}>
         <Footer />
       </Box>
       </Box>
      )}
    </Box>
  );
};
