
import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAction, signupAction } from "./auth.type";
import { loginApiResponse, loginTypes } from "../../@types/Auth";

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
  
  export const login = createAsyncThunk(
    loginAction,
    async (payload: loginTypes) => {
      try {
        const response = await axios.post('http://localhost:8080/auth/sign-in', payload);
        console.log("response: ", response);
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