import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Video } from '../../interfaces/models/video';

interface VideoState {
	videos: Video[];
}

const initialState = {
	videos: [],
} as VideoState;

export const videoSlice = createSlice({
	name: 'video',
	initialState,

	reducers: {
		setVideos: (state, action: PayloadAction<Video[]>) => {
			state.videos = action.payload;
		},
		addVideo: (state, action: PayloadAction<Video>) => {
			state.videos.unshift(action.payload);
		},
	},
});

export const { setVideos, addVideo } = videoSlice.actions;

export default videoSlice.reducer;
