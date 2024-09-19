
import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAction, signupAction } from "./auth.type";
import { loginApiResponse, loginTypes } from "../../@types/Auth";
import { RootState } from "../../store/store";

const authRequest = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // interface SignupPayload {
  //   name: string;
  //   email: string;
  //   password: string;
  // }
  
  // // Define the expected response type
  // interface SignupResponse {
  //   message: string; // Adjust this based on your API response
  //   // Add other fields as necessary
  // }
  interface GetUserDataParams {
    page?: number;
    size?: number;
    flag?: string;
    designation?: string;
    search?: string;
}

  
  export const login = createAsyncThunk(
    loginAction,
    async (payload: loginTypes) => {
      try {
        const response = await axios.post('http://localhost:8080/auth/sign-in', payload);
        localStorage.setItem('user',JSON.stringify(response.data) );
        localStorage.setItem('logged', 'true');
        return response;
      }catch (error) {
        console.log("error: ", error);
        const err = error as AxiosError;
          throw new Error((err?.response?.data as any)?.error);
      }
    }
  );
  
  
  // export const signup = createAsyncThunk<SignupResponse, any, { rejectValue: any }>(
  //   signupAction,
  //   async (payload: any, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.post<SignupResponse>('http://localhost:8080/auth/sign-up', 
  //      payload
  //       , {
  //         withCredentials: true,
  //       });
  //       console.log("response: ", response);
  //       return response.data
  //     }  catch (error) {
  //       console.log("error: ", error);
  //       if (axios.isAxiosError(error) && error.response) {
  //         return rejectWithValue(error.response.data); 
  //       }
  //       return rejectWithValue("An unknown error occurred");
  //     }
  //   })
    export const signup = createAsyncThunk(
      signupAction,
      async(data : any)=> {
          try {
              console.log(data);
              const response = await axios.post('http://localhost:8080/auth/sign-up', data)
              console.log("response: ", response);

              return response;
          } catch (error) {
            console.log("error: ", error);
            const err = error as AxiosError;
              throw new Error((err?.response?.data as any)?.error);
          }
      }
  )

export const getUserData = createAsyncThunk(
    'getUserDataAction',
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
          const { page = 1, size = 10, flag = 'name', designation = '', search = '' } = params;

            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/userData`, {
                params: {
                    page,
                    size,
                    flag,
                    designation,
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


