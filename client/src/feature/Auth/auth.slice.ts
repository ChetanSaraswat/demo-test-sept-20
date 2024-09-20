import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signup } from "./auth.action";

export type UserInitialState = {
  token: string | null; // Consider allowing null if not logged in
  user_uuid: string;
  name: string;
  email: string;
  role:string;
  phone:string
};

export type InitialStateType = {
  loading: boolean;
  logloading: boolean;
  logoutloading: boolean;
  error: string;
  success: boolean;
  logged: boolean;
  userdata:any;
  user: UserInitialState | null; // User can be null initially
};

const initialState: InitialStateType = {
  loading: false,
  logloading: false,
  logoutloading: false,
  error: '',
  success: false,
  logged: localStorage.getItem('logged') === 'true',
  userdata:'',
  user: JSON.parse(localStorage.getItem('user') ?? '{}'), // Initialize as null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSuccess: (state) => {
      state.success = false;
    },
    logOut: (state) => {
    state.logged=false
   localStorage.removeItem('user')
   localStorage.removeItem('logged')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || ''; // Use action.error here
      })
      .addCase(login.pending, (state) => {
        state.logloading = true;
        state.error = '';
        state.logged = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.logloading = false;
        state.user = action.payload.data; 
        console.log('action.payload.data: ', action.payload.data);
        state.logged = true;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.logloading = false;
        state.error = action.payload || ''; // Ensure payload is used if defined
        console.log('Error payload', action.payload);
        state.logged = false;
      });

  },
});

export const { toggleSuccess,logOut } = authSlice.actions;
export default authSlice.reducer;
