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
import { useAppDispatch } from '../../hooks';
import { useNotification } from '../../hooks/notification';
import { createRestaurant } from '../../feature/Restaurant/restaurant.action';

export interface IFormInput {
  name: string;
  type: string;
  openingTime: string;
  closingTime: string;
}

export default function RestaurantFormDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const showNotification= useNotification()

  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>({
    defaultValues: {
      name: '',
      type: '',
      openingTime: '',
      closingTime: ''
    }
  });

  const onSubmit: SubmitHandler<IFormInput> = async(data:IFormInput) => {
    console.log('Form Data:', data);
        if(data){
          try {
            const res:any = await dispatch(createRestaurant(data));
            console.log("res: ", res);
            if (res?.meta?.requestStatus === "fulfilled") {
                showNotification('Restaurant Created Success fully', "success");
            }
            if (res?.meta?.requestStatus === "rejected") {
                showNotification(res?.error?.message || "Error", "error");
            }
          } catch (err) {
            showNotification('error','error')
            alert(err);
          }
        }
  
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
              {...register('name', { required: 'Restaurant name is required' })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ''}
            />
              <TextField
                fullWidth
                label="Opening Time"
                margin="dense"
                type='time'
                {...register('openingTime', {
                  required: 'Opening time is required',
                })}
                error={!!errors.openingTime}
                helperText={errors.openingTime ? errors.openingTime.message : ''}
              />
              <TextField
                fullWidth
                label="Closing Time"
                margin="dense"
                type='time'
                {...register('closingTime', {
                  required: 'Closing time is required',
                })}
                error={!!errors.closingTime}
                helperText={errors.closingTime ? errors.closingTime.message : ''}
              />

            <FormControl fullWidth margin="dense" error={!!errors.type}>
              <InputLabel id="restaurant-type-label">Restaurant Type</InputLabel>
              <Select
                labelId="restaurant-type-label"
                label="Restaurant Type"
                defaultValue=""
                {...register('type', { required: 'Please select a restaurant type' })}
              >
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Indochinese">Indochinese</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Mexican">Mexican</MenuItem>
                <MenuItem value="Seafood">Seafood</MenuItem>
                <MenuItem value="Japanese">Japanese</MenuItem>
                <MenuItem value="Steakhouse">Steakhouse</MenuItem>
              </Select>
              <FormHelperText>
                {errors.type ? errors.type.message : ''}
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
