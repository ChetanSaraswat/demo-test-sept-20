import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { createMenuAction, createRestaurantAction, getMenuAction, getOneRestaurantAction, getRestaurantAction } from "./restaurant.type";
import { IFormInput } from "../../component/RestroForm/restroform";

interface GetUserDataParams {
    restaurant_id?: any;
}

export const createMenu = createAsyncThunk(
    createMenuAction,
    async (data: any, { getState }) => {
        try {
     
                const state = getState() as RootState;
                const token = state.auth?.user?.token;
                console.log('token:================================================ ', token);
                if (!token) {
                    throw new Error('Authorization token is missing');
                }
            const response = await axios.post('http://localhost:8080/menu/createMenu', 
            data,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,  // Adding Bearer token to the headers
                }
        });
            console.log("response: ", response);
            return response.data; // Return the response data directly
        } catch (error) {
            console.log("error: ", error);
            const err = error as AxiosError;
            throw new Error((err?.response?.data as any)?.message || 'An error occurred while fetching user data.');
        }
    })

    export const getAllMenu = createAsyncThunk(
        getMenuAction,
        async (params: GetUserDataParams, { getState }) => {
            try {
         
                    const state = getState() as RootState;
                    const token = state.auth?.user?.token;
                    console.log("state.auth: ", state.auth);
                    console.log("token: ", token);
        
                    // Ensure token exists
                    if (!token) {
                        throw new Error('Authorization token is missing');
                    }
              const { restaurant_id} = params;
    
                const response = await axios.get('http://localhost:8080/restaurant/allRestaurant', {
                    params: {
                        restaurant_id
                    },
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Adding Bearer token to the headers
                    }
                });
    
                console.log("response: ", response);
                return response.data; // Return the response data directly
            } catch (error) {
                console.log("error: ", error);
                const err = error as AxiosError;
                throw new Error((err?.response?.data as any)?.message || 'An error occurred while fetching user data.');
            }
        })