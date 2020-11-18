import AsyncStorage from '@react-native-community/async-storage';
import { getCred, setToken, setUser } from '../constants/stoarge';
import AppConfig from './../../src/constants/AppConfig';
import Axios from 'axios';

export const refreshToken = async () => {
    await AsyncStorage.removeItem('token');
    var email, pass;
    await getCred().then((state) => {
        (email = state.email), (pass = state.password);
    });
    Axios({
        url: `${AppConfig.apiPath}customer/login?token=true`,
        method: 'POST',
        data: {
            email: email,
            password: pass,
        },
    })
        .then(async (response) => {
            await setUser(response.data);
            await setToken(response.data.token)
            console.log('datatoken', response.data.token);
        })
        .catch((err) => {
            console.log('err', err);
        });
}