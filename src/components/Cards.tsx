import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const GradientButton = styled(Button)({
  background: 'linear-gradient(to right,#165d9c, #fca311 )',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right,#165d9c #fca311 )',
  },
});

interface GradientCardProps {
  title: string;
  image: string;
  id: string;
  position?: string;
  shouldShowButton?: boolean;
}

const GradientCard: React.FC<GradientCardProps> = ({
  title,
  image,
  id,
  shouldShowButton = true,
  position,
}) => {
  return (
    <Box sx={{ minWidth: 275, height: 350, marginBottom: '2rem' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          borderRadius: '10px',
          boxShadow: '0px 20px 10px rgba(0, 0, 0, 0.4)',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            color: '#fff',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            padding: '1rem',
            borderRadius: '0 0 10px 10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '17px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {title}
          </Typography>
          {shouldShowButton && (
            <Box sx={{ mt: 2 }}>
              <GradientButton variant="contained">
                <Link
                  to={`/services#${id}`}
                  style={{ textDecoration: 'none', color: 'white' }}
                >
                  Learn More
                </Link>
              </GradientButton>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default GradientCard;
