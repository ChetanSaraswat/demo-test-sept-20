import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { createMenu } from '../../feature/Restaurant/menu.action';
import { useNotification } from '../../hooks/notification';

const AddMenuDialogComponent = ( {restro_id }:any) => {
  const [open, setOpen] = useState(false);
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const dispatch = useAppDispatch();
  const showNotification = useNotification()
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleAddMenu = async() => {
    const newMenu = {
      restaurant_id: restro_id,
      name: menuName,
      description: menuDescription,
    };
   if(newMenu.restaurant_id && newMenu.name &&  newMenu.description){
     console.log('New menu added:', newMenu);

     try {
      const res:any = await  dispatch(createMenu(newMenu));
      console.log("res: ", res);
      if (res?.meta?.requestStatus === "fulfilled") {
          showNotification('Menu Created Success fully', "success");
      }
      if (res?.meta?.requestStatus === "rejected") {
          showNotification(res?.error?.message || "Error", "error");
      }
    } catch (err) {
      showNotification('error','error')
      alert(err);
    }
     handleCloseDialog();

   }
    // Add the new menu to your database or state management system
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add Menu
      </Button>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add Menu</DialogTitle>
        <DialogContent>
          <form>
            <label>Menu Name:</label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
            <br />
            <label>Menu Description:</label>
            <input
              type="text"
              value={menuDescription}
              onChange={(e) => setMenuDescription(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddMenu}>Add Menu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddMenuDialogComponent;