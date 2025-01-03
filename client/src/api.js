import axios from "axios";
import { backendUrl } from "./BackEndURL";
//require('dotenv').config();
const apiClient=axios.create(
  {
      baseURL:process.env.REACT_APP_URI
  }
)
const handleApiError = (error) => {
  const status = error.response ? error.response.status : 'No status';
  const message = error.response && error.response.data ? error.response.data.message : 'An error occurred.';
  console.error('API Error:', { status, message });
  throw new Error(message);
};
export const signUp = async (obj) => {

    let response = await apiClient.post(`${backendUrl}/signup`, obj);
    return response;
  
};

export const signIn = async (obj) => {
  try {
    let response = await apiClient.post(`${backendUrl}/`, obj);
    return response.data;
  } catch (error) {
    console.error('API Error:', {
      status: error.response ? error.response.status : 'No status',
      data: error.response ? error.response.data : 'No data',
    });

    // throw {
    //   status: error.response ? error.response.status : 'No status',
    //   message: error.response && error.response.data ? error.response.data.message : 'An error occurred during sign in.',
    // };
    handleApiError(error)
  }
};


export const resetPwd = async (obj) => {
 
    let response = await apiClient.patch(`${backendUrl}/reset`, obj);
    return response;
  
}

    