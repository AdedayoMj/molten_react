import React from 'react';
import Box from '@mui/material/Box';
import Sectionheader from '../components/SectionHeader';
import { useQuery, gql } from '@apollo/client';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import GradientCard from '../components/Cards';

const PROJECT = gql`
  query GetProjects {
    projects {
      data {
        id
        attributes {
          title
          project_image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    imageCover {
      data {
        attributes {
          projectCover {
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
const ProjectPage: React.FC = () => {
  const { loading, error, data } = useQuery(PROJECT);

  if (error) {
    return <Typography>Section is currently under Maintenance</Typography>;
  }

  return (
    <Box sx={{ minHeight: `calc(100vh - 33rem)` }}>
      <Sectionheader
        pageName="Projects"
        imageUrl={
          data?.imageCover?.data?.attributes?.projectCover?.data?.attributes
            ?.url
        }
        loading={loading}
      />
      <Typography sx={{ letterSpacing: '0.05em' }}>
        {' '}
        Here you can find a collection of photos showcasing our completed
        projects:
      </Typography>

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
        ) : !data || !data.projects ? (
          <Typography>No services found</Typography>
        ) : (
          data.projects.data.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <GradientCard
                title={item.attributes.title}
                image={item.attributes.project_image?.data?.attributes?.url}
                id={item.id.toString()}
                shouldShowButton={false}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};
export default ProjectPage;
