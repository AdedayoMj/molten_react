import React from 'react';
import Box from '@mui/material/Box';
import Sectionheader from '../components/SectionHeader';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';

const ERROR = gql`
  query GetError {
    imageCover {
      data {
        attributes {
          errorCover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

const ErrorPage: React.FC = () => {
  const { loading, data } = useQuery(ERROR);

  return (
    <Box sx={{ minHeight: `calc(100vh - 33rem)` }}>
      <Box>
        <Sectionheader
          imageUrl={
            data?.imageCover?.data?.attributes?.errorCover?.data?.attributes
              ?.url
          }
          loading={loading}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            variant="h3"
            sx={{ textAlign: 'center', fontWeight: 'bold', padding: '4rem' }}
          >
            ...Oops, the page does not exist
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default ErrorPage;
