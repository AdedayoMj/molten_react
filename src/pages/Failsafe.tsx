import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const Failsafe: React.FC = () => {
  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        color:'grey',
        height: '100vh',}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '90vw' }}>
        <Box sx={{ padding: '4rem', textAlign: 'center' }}>
        <Typography variant="h5">
          ...Oops, something happened
        </Typography>
        <Typography >
          contact support at <a
                  href={`mailto:contact@moltennile.com`}
                >
                  contact@moltennile.com
                </a>
        </Typography>
      </Box>
      </Box>
    </Box>
  );
};

export default Failsafe;
