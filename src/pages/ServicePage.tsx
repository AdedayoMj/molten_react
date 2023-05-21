import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ReactMarkdown from 'react-markdown';
import Sectionheader from '../components/SectionHeader';
import { useQuery, gql } from '@apollo/client';

const SERVICE = gql`
  query GetServices {
    imageCover {
      data {
        attributes {
          serviceCover {
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

type MarkdownHeadingProps = {
  children: React.ReactNode;
};

const MarkdownHeading = ({ children }: MarkdownHeadingProps) => {
  return (
    <Typography variant="h4" component="h2" style={{ color: 'grey' }}>
      {children}
    </Typography>
  );
};

const MarkdownParagraph = ({ children }: MarkdownHeadingProps) => {
  return (
    <Typography
      variant="body1"
      style={{ color: 'grey', lineHeight: 2.0, letterSpacing: '0.05em' }}
    >
      {children}
    </Typography>
  );
};

const MarkdownList = ({ children }: MarkdownHeadingProps) => {
  return (
    <ul
      style={{
        marginLeft: '1rem',
        color: 'grey',
        lineHeight: 2.5,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </ul>
  );
};

const ServicePage: React.FC = () => {
  const { loading, error, data } = useQuery(SERVICE);
  const [imageLoadErrors, setImageLoadErrors] = useState<number[]>([]);
  const handleImageError = (index: number) => {
    setImageLoadErrors((prevErrors) => [...prevErrors, index]);
  };

  if (error) {
    return <Typography>Section is currently under Maintenance</Typography>;
  }

  return (
    <Box sx={{ minHeight: `calc(100vh - 34rem)` }}>
      <Sectionheader
        pageName="Services"
        imageUrl={
          data?.imageCover?.data?.attributes?.serviceCover?.data?.attributes
            ?.url
        }
        loading={loading}
      />{' '}
      <Box>
        {loading ? (
          ''
        ) : error ? (
          <Typography
            sx={{ color: 'grey', lineHeight: 2.0, letterSpacing: '0.05em' }}
          >
            Section is currently under Maintainance
          </Typography>
        ) : !data || !data.services ? (
          <Typography>Something went wrong</Typography>
        ) : (
          data.services.data.map((item: any, index: number) => (
            <section
              id={item.id.toString()}
              key={item.id}
              style={{ marginBottom: '4em', padding: '2rem' }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  order={{ md: index % 2 === 0 ? 1 : 2, xs: 2 }}
                >
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      color: '#073642',
                    }}
                  >
                    {item.attributes.title}
                  </Typography>

                  <ReactMarkdown
                    components={{
                      h1: MarkdownHeading,
                      h2: MarkdownHeading,
                      h3: MarkdownHeading,
                      p: MarkdownParagraph,
                      ul: MarkdownList,
                    }}
                  >
                    {item.attributes.description}
                  </ReactMarkdown>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  order={{ md: index % 2 === 0 ? 2 : 1, xs: 1 }}
                >
                  {!imageLoadErrors.includes(index) &&
                    item.attributes.image.data?.attributes.url && (
                      <Box>
                        <img
                          height={400}
                          width={'100%'}
                          style={{ objectFit: 'cover' }}
                          src={item.attributes.image.data?.attributes.url}
                          alt=""
                          onError={() => handleImageError(index)}
                        />
                      </Box>
                    )}
                </Grid>
              </Grid>
            </section>
          ))
        )}
      </Box>
    </Box>
  );
};

export default ServicePage;
