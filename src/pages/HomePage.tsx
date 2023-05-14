import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import GradientCard from '../components/Cards';

import { useQuery, gql } from '@apollo/client';
import DividerScrollDown from '../components/DividerScrollDown';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const SERVICE = gql`
  query GetServices {
    companyAddress {
      data {
        attributes {
          contact_email
          Address
          phoneNumber
        }
      }
    }
  
    home {
      data {
        attributes {
          mainTitleDescription
          mainTitle
          FooterTitle
          FooterDescription
          homeImage {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    services {
      data {
        id
        attributes {
          title
          description
          image {
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

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const GradientButton = styled(Button)({
  background: 'linear-gradient(to right,#165d9c, #fca311 )',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(to right,#165d9c #fca311 )',
  },
});

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(SERVICE);


  return (
    <Box sx={{ marginBottom: '3rem', minHeight: `calc(100vh - 34rem)` }}>
      {loading ? (
        ''
      ) : error ? (
        <Typography>Not available</Typography>
      ) : !data || !data.home ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <Grid container spacing={2} sx={{ width: '100%', marginTop: '2em' }}>
          
          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Wrapper>
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: 'orange',
                  fontWeight: 'bold',
                }}
              >
                {data.home.data.attributes.mainTitle}
              </Typography>
              <Typography sx={{ color: 'grey', letterSpacing: '0.05em' }}>
                {data.home.data.attributes.mainTitleDescription}
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Link to="/aboutus">
                  <GradientButton variant="contained">
                    Learn More
                  </GradientButton>
                </Link>
              </Box>
            </Wrapper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Wrapper>
              <Box
                sx={{ marginLeft: '4rem' }}
                display={{ xs: 'none', md: 'block' }}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${data.home.data.attributes.homeImage.data.attributes.url.slice(1)}`}
                  alt="homeimage"
                />
              </Box>
            </Wrapper>
          </Grid>
        </Grid>
      )}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#073642',
          mb: 4,
          lineHeight: 2.5,
          letterSpacing: '0.05em',
        }}
      >
        Our Services
      </Typography>
      <DividerScrollDown />

      <Grid
        container
        spacing={2}
        sx={{ width: '100%', marginTop: '2em' }}
        flexWrap="wrap"
      >
        {loading ? (
          <ProductCardSkeleton count={3} />
        ) : error ? (
          <Typography>Section is currently under Maintainance</Typography>
        ) : !data || !data.services ? (
          <Typography>No services found</Typography>
        ) : (
          data.services.data.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <GradientCard
                title={item.attributes.title}
                image={`${process.env.REACT_APP_BACKEND_URL}${item.attributes.image.data.attributes.url.slice(1)}`}
                id={item.id.toString()}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
