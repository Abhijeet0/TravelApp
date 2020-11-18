import AsyncStorage from '@react-native-community/async-storage';
import { refreshToken } from '../components/RefreshToken';

export const getUser = async () => {
  let userData = '';
  try {
    let user = await AsyncStorage.getItem('LoggedInUserData');
    userData = JSON.parse(user);
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
  return userData;
};

export const setUser = async (data) => {
  try {
    await AsyncStorage.setItem('LoggedInUserData', JSON.stringify(data)); //LoggedInUserData
    console.log('asyncdata', data);
  } catch (error) {
    // Error retrieving data
    console.log('asyncerror', error.message);
  }
};

export const getCred = async () => {
  let userData = '';
  try {
    let user = await AsyncStorage.getItem('cred');
    userData = JSON.parse(user);
  } catch (error) {
    // Error retrieving data
  }
  return userData;
};

export const setCred = async (data) => {
  try {
    await AsyncStorage.setItem('cred', JSON.stringify(data)); //LoggedInUserData
  } catch (error) {
    // Error retrieving data
  }
};

export const getToken = async () => {
  // refreshToken()
  let userData = '';
  try {
    let user = await AsyncStorage.getItem('token');
    userData = JSON.parse(user);
  } catch (error) {
    // Error retrieving data
  }
  return userData;
};

export const setToken = async (data) => {
  try {
    await AsyncStorage.setItem('token', JSON.stringify(data)); //LoggedInUserData
  } catch (error) {
    // Error retrieving data
  }
};

export const getDP = async () => {
  // refreshToken()
  let userData = '';
  try {
    let user = await AsyncStorage.getItem('dp');
    userData = JSON.parse(user);
  } catch (error) {
    // Error retrieving data
  }
  return userData;
};

export const setDP = async (data) => {
  try {
    await AsyncStorage.setItem('dp', JSON.stringify(data)); //LoggedInUserData
  } catch (error) {
    // Error retrieving data
  }
};
