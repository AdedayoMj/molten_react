import React from 'react';
import Box from '@mui/material/Box';
import Sectionheader from '../components/SectionHeader';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

const ABOUTUS = gql`
  query getInfo {
    aboutUses {
      data {
        id
        attributes {
          title
          description
        }
      }
    }
    imageCover {
      data {
        attributes {
          aboutUsCover {
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
    <Typography
      variant="h4"
      component="h2"
      style={{ marginBottom: '2rem', color: '#073642' }}
    >
      {children}
    </Typography>
  );
};

const MarkdownParagraph = ({ children }: MarkdownHeadingProps) => {
  return (
    <Typography
      variant="body1"
      style={{
        marginBottom: '3rem',
        color: 'grey',
        lineHeight: 2.0,
        letterSpacing: '0.05em',
      }}
    >
      {children}
    </Typography>
  );
};

const AboutUs: React.FC = () => {
  const { loading, error, data } = useQuery(ABOUTUS);
console.log(data);

  return (
    <Box sx={{ minHeight: `calc(100vh - 33rem)` }}>
      {loading ? (
        ''
      ) : error ? (
        <Typography
          sx={{ color: 'grey', lineHeight: 2.0, letterSpacing: '0.05em' }}
        >
          Section is currently under Maintainance
        </Typography>
      ) : !data || !data.aboutUses ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <Box>
          <Sectionheader
            pageName="About Us"
            imageUrl={`${process.env.REACT_APP_BACKEND_URL}${data.imageCover.data.attributes.aboutUsCover.data.attributes.url}`}
          />
          <Box sx={{ mx: 'auto', maxWidth: '800px', px: 3, pt: 5 }}>
            {data.aboutUses.data.map((item: any) => (
              <Box key={item.id}>
                <Typography variant="h4" sx={{ mb: 3, color: '#073642' }}>
                  {item.attributes.title}
                </Typography>
                <ReactMarkdown
                  components={{
                    h1: MarkdownHeading,
                    h2: MarkdownHeading,
                    h3: MarkdownHeading,
                    p: MarkdownParagraph,
                  }}
                >
                  {item.attributes.description}
                </ReactMarkdown>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AboutUs;
