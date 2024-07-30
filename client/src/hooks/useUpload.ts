import { useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { AxiosError } from 'axios';
import type Upload from '../interfaces/Upload';
import type { Video } from '../interfaces/models/video';
import { useAppDispatch } from '../redux/hooks';
import { addVideo } from '../redux/video/videoReducer';

/**
 * Custom hook for uploading the video. It should be used by the UploadContext.
 * @param route
 * @returns Upload
 */
const useUpload = (route: string): Upload => {
	const [progress, setProgress] = useState<number>(0);
	const [error, setError] = useState<Error | null>(null);
	const dispatch = useAppDispatch();

	const upload = useCallback(
		async (file: File, name: string) => {
			if (!file) {
				return;
			}

			setProgress(0);
			setError(null);

			try {
				const form = new FormData();
				form.append('video', file);
				form.append('name', name);

				const { data }: { data: Video } = await axiosInstance.post(
					route,
					form,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
						onUploadProgress: (data) => {
							if (data.total) {
								const percentage = Math.round((data.loaded * 100) / data.total);

								setProgress((prevProgress) => {
									return prevProgress < 100 ? percentage : 100;
								});
							}
						},
					},
				);

				if (setProgress) {
					// Set the progress to 100 when the request is done
					setProgress(100);
				}

				// Add it to the state so user can see the new uploaded video without having to refresh the page
				dispatch(addVideo(data));
			} catch (error) {
				if (error instanceof AxiosError) {
					console.log(error.response?.data?.error);
					const errorMsg = error.response?.data?.error
						? error.response.data.error
						: error.message;
					setError(errorMsg);
					return;
				}
				console.log(error);
			}
		},
		[route, dispatch],
	);

	return {
		progress,
		setProgress,
		error,
		upload,
	};
};

export default useUpload;
