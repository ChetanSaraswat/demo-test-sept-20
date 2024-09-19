import React, { useState } from 'react';
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface MenuItem {
  id: number;
  image: string;
  name: string;
  price: number;
}

const MenuComponent: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // To store the image URL

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      image: '',
      name: '',
      price: 0,
    },
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const openDialog = (item?: MenuItem) => {
    if (item) {
      setEditItem(item);
      setUploadedImage(item.image); // Set the existing image for editing
      reset({ image: item.image, name: item.name, price: item.price });
    } else {
      reset({ image: '', name: '', price: 0 });
      setUploadedImage(null); // Reset uploaded image for new item
    }
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditItem(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

  const onSubmit = (data: any) => {
    if (editItem) {
      // Update existing item
      setMenuItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editItem.id ? { ...editItem, ...data, image: uploadedImage } : item
        )
      );
    } else {
      // Add new item
      const newItem = {
        id: menuItems.length + 1,
        ...data,
        image: uploadedImage,
      };
      setMenuItems([...menuItems, newItem]);
    }
    closeDialog();
  };

  return (
    <Box>
      <Typography variant="h6">Menu Name</Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button onClick={toggleExpand} startIcon={<ExpandMoreIcon />}>
          {isExpanded ? 'Collapse Items' : 'Expand Items'}
        </Button>
        <Button onClick={() => openDialog()} startIcon={<AddIcon />} variant="contained">
          Add Item
        </Button>
      </Box>

      <Collapse in={isExpanded}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price}, Image: ${item.image ? 'Uploaded' : 'No Image'}`}
              />
              <IconButton onClick={() => openDialog(item)}>
                <EditIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Collapse>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{editItem ? 'Update Item' : 'Add Item'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Image Upload */}
            <Box sx={{ marginBottom: 2 }}>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageUpload}
                style={{ display: 'block', margin: '10px 0' }}
              />
              {uploadedImage && (
                <Box sx={{ textAlign: 'center' }}>
                  <img src={uploadedImage} alt="Uploaded" width={150} height={150} />
                </Box>
              )}
              {errors.image && <Typography color="error">Image is required</Typography>}
            </Box>

            {/* Item Name */}
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Item Name"
                  fullWidth
                  margin="normal"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            {/* Price Field with validation */}
            <Controller
              name="price"
              control={control}
              rules={{
                required: 'Price is required',
                min: { value: 1, message: 'Price must be greater than 0' },
                validate: (value) => !/^0/.test(value.toString()) || 'Price cannot start with 0',
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  type="number"
                  fullWidth
                  margin="normal"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} variant="contained">
            {editItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuComponent;
