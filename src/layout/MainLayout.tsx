import React from 'react';
import { Box, Paper } from '@mui/material';
import TreeViewLayout from './TreeViewLayout';
import TextFieldLayout from './TextFieldLayout';

const MainLayout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        backgroundColor: '#f0f2f5',
        borderRadius: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          width: '80%',
          maxWidth: '1200px',
          height: '80vh',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ width: '300px', borderRight: '1px solid #ddd', textAlign: 'left'}}>
          <TreeViewLayout />
        </Box>

        <Box sx={{ flex: 1, padding: 4 }}>
          <TextFieldLayout />
        </Box>
      </Paper>
    </Box>
  );
};

export default MainLayout;