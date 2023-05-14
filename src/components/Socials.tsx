import React from 'react';
import Box from '@mui/material/Box';

const Socials: React.FC = () => {
  const socials = [
    {
      name: 'Twitter',
      src: 'https://img.icons8.com/fluent/48/ffffff/twitter.png',
      link: '#',
    },
    {
      name: 'LinkedIn',
      src: 'https://img.icons8.com/fluent/48/ffffff/linkedin.png',
      link: '#',
    },
    {
      name: 'Instagram',
      src: 'https://img.icons8.com/fluent/48/ffffff/instagram-new.png',
      link: '#',
    },
  ];
  return (
    <Box sx={{ display: 'flex' }}>
      {socials.map((item) => {
        return (
          <Box key={item.name} sx={{ mr: 2 }}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              <img src={item.src} alt={item.name} />
            </a>
          </Box>
        );
      })}
    </Box>
  );
};

export default Socials;
