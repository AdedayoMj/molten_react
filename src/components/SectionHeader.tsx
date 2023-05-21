import React, { useState } from 'react';
import DividerScrollDown from '../components/DividerScrollDown';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  imageUrl: string;
  pageName?: string;
  loading: boolean;
};

const Sectionheader: React.FC<Props> = ({ imageUrl, pageName, loading }) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  const renderContent = () => {
    if (loading) {
      return (
        <Box sx={{ height: 180, width: '100%' }}>
          <Skeleton variant="rectangular" height={180} width="100%" />
        </Box>
      );
    } else if (!imageUrl || imageError) {
      return (
        <Box
          sx={{
            height: 180,
            width: '100%',
            backgroundColor: '#f5f5f5', // Placeholder background color
          }}
        ></Box>
      );
    } else {
      return (
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
      );
    }
  };

  return (
    <Box sx={{ marginBottom: '4em', position: 'relative' }}>
      {renderContent()}

      {!loading && (
        <Box sx={{ mt: -1 }}>
          <DividerScrollDown
            showDivider={imageUrl && !imageError ? true : false}
          />
        </Box>
      )}

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
