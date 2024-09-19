import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  restaurantName: string;
  phoneNumber: string;
  restaurantType: string;
}

export default function RestaurantFormDialog() {
  const [open, setOpen] = React.useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
    defaultValues: {
      restaurantName: '',
      phoneNumber: '',
      restaurantType: ''
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = (data:IFormInput) => {
    console.log('Form Data:', data);
    setOpen(false); // Close the dialog on submit
    reset(); // Clear the form
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset(); // Reset the form on close
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Form Dialog
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Restaurant Form</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              label="Restaurant Name"
              margin="dense"
              {...register('restaurantName', { required: 'Restaurant name is required' })}
              error={!!errors.restaurantName}
              helperText={errors.restaurantName ? errors.restaurantName.message : ''}
            />
            
            <TextField
              fullWidth
              label="Phone Number"
              margin="dense"
              type='number'
              {...register('phoneNumber', {
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Phone number must be numeric',
                },
              })}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
            />

            <FormControl fullWidth margin="dense" error={!!errors.restaurantType}>
              <InputLabel id="restaurant-type-label">Restaurant Type</InputLabel>
              <Select
                labelId="restaurant-type-label"
                label="Restaurant Type"
                defaultValue=""
                {...register('restaurantType', { required: 'Please select a restaurant type' })}
              >
                <MenuItem value="indian">Indian</MenuItem>
                <MenuItem value="chinese">Chinese</MenuItem>
                <MenuItem value="continental">Continental</MenuItem>
              </Select>
              <FormHelperText>
                {errors.restaurantType ? errors.restaurantType.message : ''}
              </FormHelperText>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
