import React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface Props {
  showDivider?: boolean;
}
const DividerScrollDown: React.FC<Props> = ({ showDivider = true }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {showDivider && <Divider />}

      <IconButton
        sx={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          transform: 'translateX(-50%)',
          boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.2)',
          color: '#073642',
          zIndex: 10,
          background: 'white',
        }}
        onClick={() => window.scrollTo(0, document.body.scrollHeight)}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
};

export default DividerScrollDown;
