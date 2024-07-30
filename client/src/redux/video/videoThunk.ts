import type { UnknownAction } from 'redux';
import type { ThunkAction } from 'redux-thunk';
import type { Video } from '../../interfaces/models/video';
import { get } from '../../utils/requestSender';
import type { RootState } from '../store';
import { setVideos } from './videoReducer';

export const getVideos = (): ThunkAction<
	Promise<void>,
	RootState,
	unknown,
	UnknownAction
> => {
	return async (dispatch) => {
		try {
			const videos: Video[] = await get('/video');
			dispatch(setVideos(videos));
		} catch (error) {
			console.log(error);
		}
	};
};
