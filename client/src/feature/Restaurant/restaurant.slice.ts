import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createRestaurant, getAllRestaurant, getRestaurant } from "./restaurant.action";


export type RestaurantInitialState = {
  restaurant_id: string;// Consider allowing null if not logged in
  owner_id: string;
  openingTime: string;
  closingTime:string;
  email: string;
  type: string;
};

export type InitialStateType = {
  loading: boolean;
  restroloading:boolean;
  error: string;
  success: boolean;
  restro: RestaurantInitialState | null; 
  myrestro: RestaurantInitialState | null; 
  allRestro:any// User can be null initially
  restroCount:number,
};

const initialState: InitialStateType = {
  loading: false,
  restroloading:false,
  error: '',
  success: false,
  restro: null,// Initialize as null
  allRestro:'',
  restroCount:0,
  myrestro:null
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    toggleSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRestaurant.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createRestaurant.fulfilled, (state,action) => {
        state.loading = false;
        state.restro = action.payload.data
        state.success = true;
      })
      .addCase(createRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || ''; // Use action.error here
      })
      .addCase(getAllRestaurant.pending, (state) => {
        state.restroloading = true;
        state.error = '';
      })
      .addCase(getAllRestaurant.fulfilled, (state, action) => {
        state.restroloading = false;
        state.allRestro = action.payload?.Info; 
        console.log('state.allRestro : ', state.allRestro );
        state.restroCount= action.payload.data?.count;
        console.log('action.payload.data: ', action.payload);
      })
      .addCase(getAllRestaurant.rejected, (state, action: PayloadAction<any>) => {
        state.restroloading = false;
        state.error = action.payload || ''; // Ensure payload is used if defined
        console.log('Error payload', action.payload);
      })
      .addCase(getRestaurant.pending, (state) => {
        state.restroloading = true;
        state.error = '';
      })
      .addCase(getRestaurant.fulfilled, (state, action) => {
        state.restroloading = false;
        state.myrestro = action.payload; 
        console.log('action.payload.data: ', action.payload);
      })
      .addCase(getRestaurant.rejected, (state, action: PayloadAction<any>) => {
        state.restroloading = false;
        state.error = action.payload || ''; // Ensure payload is used if defined
        console.log('Error payload', action.payload);
      });

  },
});

export const { toggleSuccess } = restaurantSlice.actions;
export default restaurantSlice.reducer;
