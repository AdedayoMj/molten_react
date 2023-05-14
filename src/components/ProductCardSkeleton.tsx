import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

type Props = {
  count: number;
};

const ProductCardSkeleton: React.FC<Props> = ({ count }) => {
  return (
    <>
      {Array.from(Array(count).keys()).map((index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Skeleton
            key={index}
            variant="rectangular"
            width={300}
            height={350}
            sx={{ borderRadius: '10px' }}
          />
        </Grid>
      ))}
    </>
  );
};

export default ProductCardSkeleton;
