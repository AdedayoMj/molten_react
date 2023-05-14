import { gql } from '@apollo/client';
export const FAILCHECK = gql`
  query GetServices {
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
