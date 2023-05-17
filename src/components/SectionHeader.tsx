import React, { useState } from 'react';
import DividerScrollDown from '../components/DividerScrollDown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

type Props = {
  imageUrl: string;
  pageName?: string;
};

const Sectionheader: React.FC<Props> = ({ imageUrl, pageName }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Box sx={{ marginBottom: '4em', position: 'relative' }}>
      {!imageError && imageUrl ? (
        <img
          height={200}
          width={'100%'}
          style={{
            objectFit: 'cover',
            backgroundPosition: 'center',
          }}
          src={imageUrl}
          alt={pageName}
          onError={handleImageError}
        />
      ) : (
        <Box
          sx={{
            height: 180,
            width: '100%',
            backgroundColor: '#f5f5f5', // Placeholder background color
          }}
        ></Box>
      )}

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
