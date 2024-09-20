import * as React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';



const BaseLayout: React.FC = () => {
  return (
    <Box display="flex">
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,mt:20}}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default BaseLayout;