import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import videoReducer from './video/videoReducer';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const rootReducer = combineReducers({
	video: videoReducer,
	// more reducers can be combined in the future
});

export default persistReducer(persistConfig, rootReducer);
