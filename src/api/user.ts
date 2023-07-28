import axios, { AxiosResponse } from 'axios';

type UserCredentials = {
  userName: string;
  password: string;
};

export const authenticateUser = async (credentials: UserCredentials) => {
  try {
    const response: AxiosResponse = await axios.post(
      'http://localhost:5000/api/user/login',
      credentials
    );
    return response.data;
  } catch (error: unknown) {
    console.log(error);
    return;
  }
};

export const registerUser = async (credentials: UserCredentials) => {
    try {
      const response: AxiosResponse = await axios.post(
        'http://localhost:5000/api/user/register',
        credentials
      );
      return response.data;
    } catch (error: unknown) {
      return error;
    }
  };

export const getAllPasswords = async (userName: string) => {
    try {
        const response: AxiosResponse = await axios.get(
            `http://localhost:5000/api/user/get-passwords/${userName}`
        );
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const savePassword = async (userName: string, passwordName: string, password: string) => {
    try {
        const response: AxiosResponse = await axios.post(
            `http://localhost:5000/api/user/save-password/${userName}`,
            {name:passwordName, password}
        );
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
