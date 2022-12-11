import { createAsyncThunk } from "@reduxjs/toolkit";

export const sharedAgencyFunc = (query, name) =>(
  createAsyncThunk(name, async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI; //handle error in correct way
    try {
      const res = await fetch(`${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log("res", res)
      const result = await res.json();
      console.log("result", result)
      if(result?.data){
          console.log("result", result);
        return result
      }else{
        console.log("result.data", result.data);
        return result.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }));
