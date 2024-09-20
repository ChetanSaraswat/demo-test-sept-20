import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/Auth/auth.slice'
import restaurantReducer from '../feature/Restaurant/restaurant.slice'
import menuReducer from  '../feature/Restaurant/menu.slice'

 const store = configureStore({
  reducer: {
  
   auth:authReducer,
//    post:postReducer,
   restaurant:restaurantReducer,
   menu:menuReducer
//    comment:commentReducer,
//    reaction:reactionReducer,
//    connection:connectionReducer,
//    room:roomReducer,
//    message:messageReducer,
  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;