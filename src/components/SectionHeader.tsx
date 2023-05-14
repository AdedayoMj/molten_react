import React from 'react';
import DividerScrollDown from '../components/DividerScrollDown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  imageUrl: string;
  pageName?: string;
};
const Sectionheader: React.FC<Props> = ({ imageUrl, pageName }) => {
  return (
    <Box sx={{ marginBottom: '4em' }}>
      <Box>
        <img
          height={200}
          width={'100%'}
          style={{ objectFit: 'cover', backgroundPosition: 'center' }}
          src={imageUrl}
          alt={pageName}
        />
      </Box>
      <Box sx={{ mt: -1 }}>
        <DividerScrollDown />
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginTop: '2rem', textAlign: 'center' }}
      >
        {pageName}
      </Typography>
    </Box>
  );
};

export default Sectionheader;
