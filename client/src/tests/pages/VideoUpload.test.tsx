import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import videoReducer from '../../redux/video/videoReducer';
import { Provider } from 'react-redux';
import VideoUpload from '../../pages/VideoUpload';
import { UploadProvider } from '../../context/UploadContext';

const renderWrapper = (component: React.ReactElement) => {
	const store = configureStore({
		reducer: {
			video: videoReducer,
		},
	});

	return render(
		<Provider store={store}>
			<UploadProvider>{component}</UploadProvider>
		</Provider>,
	);
};

describe('VideoUpload page', () => {
	it('should display Video Upload title', async () => {
		renderWrapper(<VideoUpload />);

		expect(screen.getByText('Video Upload')).toBeInTheDocument();
	});

	it('should display Choose File button', async () => {
		renderWrapper(<VideoUpload />);

		expect(screen.getByText('Choose File')).toBeInTheDocument();
	});

	it('should display + Upload button', async () => {
		renderWrapper(<VideoUpload />);

		expect(screen.getByText('+ Upload')).toBeInTheDocument();
	});

	it('should ask to choose a video if the + Upload button gets clicked before selecting one', async () => {
		renderWrapper(<VideoUpload />);

		fireEvent.click(screen.getByText('+ Upload'));

		await waitFor(() => {
			expect(
				screen.getByText('Please choose a video file!'),
			).toBeInTheDocument();
		});
	});
});
