import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';

import ActionAreaCard from '../../component/Card/card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllRestaurant } from '../../feature/Restaurant/restaurant.action';
import { RootState } from '../../store/store';

function DashboardUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params={page : 1, size : 10, flag : 'name', search : searchQuery}
     dispatch(getAllRestaurant(params));
  }, [searchQuery, dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const restroData:any= useAppSelector((state:RootState)=>state.restaurant.allRestro)
  console.log('restroData: ', restroData);

  return (
    <Box sx={{ p: 2, bgcolor: 'grey.200' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h4">Restaurant</Typography>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        variant="outlined"
        size="small"
        sx={{ width: 200 }}
      />
    </Box>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', ml: 2, mr: 4, mt: 2,gap:'30px' }}>
      {restroData && restroData?.map((restro: any, index: number) => (
        restro && <ActionAreaCard sx={{ ml: 6 }} restro={restro} key={index} />
      ))}
    </Box>
  </Box>
  );
}

export default DashboardUser;