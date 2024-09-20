import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { createRestaurantAction, getOneRestaurantAction, getRestaurantAction } from "./restaurant.type";
import { IFormInput } from "../../component/RestroForm/restroform";

interface GetUserDataParams {
    page?: number;
    size?: number;
    flag?: string;
    search?: string;
}

export const createRestaurant = createAsyncThunk(
    createRestaurantAction,
    async (data: IFormInput, { getState }) => {
        try {
     
                const state = getState() as RootState;
                const token = state.auth?.user?.token;
                console.log('token:================================================ ', token);
                if (!token) {
                    throw new Error('Authorization token is missing');
                }
            const response = await axios.post('http://localhost:8080/restaurant/createRestaurant', 
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

    export const getAllRestaurant = createAsyncThunk(
        getRestaurantAction,
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
              const { page = 1, size = 10, flag = 'name', search = '' } = params;
    
                const response = await axios.get('http://localhost:8080/restaurant/allRestaurant', {
                    params: {
                        page,
                        size,
                        flag,
                        search
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

        export const getRestaurant = createAsyncThunk(
            getOneRestaurantAction,
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
                  const { page = 1} = params;
        
                    const response = await axios.get('http://localhost:8080/restaurant/specific', {
                        params: {
                            page,
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



            


            