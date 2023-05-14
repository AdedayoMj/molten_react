import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Socials from './Socials';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useQuery, gql } from '@apollo/client';

const FOOTER = gql`
  query GetFooter {
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
        }
      }
    }
    footerServices{
      data{
        id,
        attributes{
          title,
          description
        }
      }
    }
  }
`;

const Footer = () => {
  const { loading, error, data } = useQuery(FOOTER);


  return (
    <Box
      sx={{ backgroundColor: '#073642', color: '#fff', p: 2, minHeight: 350 }}
    >
      {loading ? (
  ""
      ) : error ? (
        <Typography>Not available</Typography>
      ) : !data || !data.companyAddress ? (
        <Typography>Something went wrong</Typography>
      ) : (
        <Box
          sx={{
            margin: '1rem 1rem 1rem 1rem',
            lineHeight: 2.5,
            letterSpacing: '0.05em',
          }}
        >
          <Grid container spacing={2}>
          {data.home.data &&
            <Grid item xs={12} md={4}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                {data.home.data.attributes.FooterTitle}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {data.home.data.attributes.FooterDescription}
              </Typography>
              <Typography sx={{ mb: 2 }}>Follow us on social media:</Typography>
              <Socials />
            </Grid>}
            {data.home.data &&
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact Us
              </Typography>
              <Typography sx={{ mb: 2 }}>
                {data.companyAddress.data.attributes.Address}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Phone: {data.companyAddress.data.attributes.phoneNumber}
              </Typography>
              <Typography sx={{ mb: 2 }}>
                Email:{' '}
                <a
                  href={`mailto:${data.companyAddress.data.attributes.contact_email}`}
                >
                  {data.companyAddress.data.attributes.contact_email}
                </a>
              </Typography>
            </Grid>}
            {data.footerServices &&
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Our Services
              </Typography>
              <ul>
                {data.footerServices.data.map((item: any) => {
                  return (
                    <li key={item.attributes.title}>
                      <Typography sx={{ fontSize: '1.2rem' }}>
                        {item.attributes.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9rem' }}>
                        {item.attributes.description}
                      </Typography>
                    </li>
                  );
                })}
              </ul>
            </Grid>
}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Footer;
