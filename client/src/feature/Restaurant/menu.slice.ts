import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createMenu, getAllMenu } from "./menu.action";





export type InitialStateType = {
  loading: boolean;
  menuloading:boolean;
  error: string;
  success: boolean;
  allmenu:any// User can be null initially
 menu:any
};

const initialState: InitialStateType = {
  loading: false,
  menuloading:false,
  error: '',
  success: false,
  allmenu:'',
  menu:''
};

export const menuSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    toggleSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMenu.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createMenu.fulfilled, (state,action) => {
        state.loading = false;
        state.menu = action.payload.data
        state.success = true;
      })
      .addCase(createMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || ''; // Use action.error here
      })
      .addCase(getAllMenu.pending, (state) => {

        state.error = '';
      })
      .addCase(getAllMenu.fulfilled, (state, action) => {

        state.allmenu = action.payload?.Info; 
        console.log('state.allRestro : ', state.allmenu );

        console.log('action.payload.data: ', action.payload);
      })
      .addCase(getAllMenu.rejected, (state, action: PayloadAction<any>) => {

        state.error = action.payload || ''; // Ensure payload is used if defined
        console.log('Error payload', action.payload);
      })


  },
});

export const { toggleSuccess } = menuSlice.actions;
export default menuSlice.reducer;
