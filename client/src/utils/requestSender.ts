import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';

export const get = async (route: string) => {
	try {
		const response = await axiosInstance.get(route, {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			console.log(error.response?.data?.error);
			return;
		}
	}
};

// More requests (post, put, patch, delete) can be added in the future
