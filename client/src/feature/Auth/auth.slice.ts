import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, signup } from "./auth.action";

export type UserInitialState = {
  token: string | null; // Consider allowing null if not logged in
  user_id: string;
  name: string;
  email: string;
  bio: string;
};

export type InitialStateType = {
  loading: boolean;
  logloading: boolean;
  logoutloading: boolean;
  error: string;
  success: boolean;
  logged: boolean;
  token: string | null; // Consider allowing null
  userId: string | null; // Consider allowing null
  user: UserInitialState | null; // User can be null initially
};

const initialState: InitialStateType = {
  loading: false,
  logloading: false,
  logoutloading: false,
  error: '',
  success: false,
  logged: localStorage.getItem('logged') === 'true',
  token: localStorage.getItem('token'),
  userId: localStorage.getItem('user'),
  user: null, // Initialize as null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    toggleSuccess: (state) => {
      state.success = false;
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
        state.logged = true;
        state.token = action.payload.data.token; // Ensure action.payload has a token
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.logloading = false;
        state.error = action.payload || ''; // Ensure payload is used if defined
        console.log('Error payload', action.payload);
        state.logged = false;
      });
      // Uncomment and implement logoutUser if needed
      // .addCase(logoutUser.pending, (state) => {
      //   state.loading = true;
      //   state.error = '';
      //   state.logged = true;
      //   state.logoutloading = true;
      // })
      // .addCase(logoutUser.fulfilled, (state) => {
      //   state.loading = false;
      //   state.user = null;
      //   state.logged = false;
      //   state.token = null;
      //   state.logoutloading = false;
      // })
      // .addCase(logoutUser.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || ''; // Use payload safely
      //   console.log('Error logout', state.error);
      //   state.logged = true;
      //   state.logoutloading = false;
      // });
  },
});

export const { toggleSuccess } = authSlice.actions;
export default authSlice.reducer;
