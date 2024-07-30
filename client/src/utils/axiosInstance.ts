import { Capacitor } from '@capacitor/core';
import axios from 'axios';

const platform = Capacitor.getPlatform();

export let baseUrl = process.env.REACT_APP_API_BASE_URL;

if (platform === 'android' || platform === 'ios') {
	// Base url needs to be the one below if user is running the app on mobile
	baseUrl = process.env.REACT_APP_API_BASE_URL_MOBILE;
}

const axiosInstance = axios.create({
	baseURL: baseUrl,
});

export default axiosInstance;
