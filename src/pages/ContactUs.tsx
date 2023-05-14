import React from 'react';
import Box from '@mui/material/Box';
import Sectionheader from '../components/SectionHeader';
import Typography from '@mui/material/Typography';
import Socials from '../components/Socials';
import { useQuery, gql } from '@apollo/client';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

const CONTACT = gql`
  query GetFooter {
    imageCover {
      data {
        attributes {
          contactUsCover {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
    companyAddress {
      data {
        attributes {
          contact_email
          Address
          phoneNumber
        }
      }
    }
  }
`;

const ContactUs: React.FC = () => {
  const { loading, error, data } = useQuery(CONTACT);
  return (
    <Box sx={{ minHeight: `calc(100vh - 33rem)` }}>
      {loading ? (
        ''
      ) : error ? (
        <Typography>Not available</Typography>
      ) : !data || !data.companyAddress ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <Box>
          <Sectionheader
            pageName="Contact Us"
            imageUrl={`${process.env.REACT_APP_BACKEND_URL}${data.imageCover.data.attributes.contactUsCover.data.attributes.url}`}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ mb: 2 }}>
              {data.companyAddress.data.attributes.Address}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Phone: {data.companyAddress.data.attributes.phoneNumber}
            </Typography>
            <Typography sx={{ mb: 2 }}>
              <a
                href={`mailto:${data.companyAddress.data.attributes.contact_email}`}
              >
                {data.companyAddress.data.attributes.contact_email}
              </a>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Socials />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ContactUs;
