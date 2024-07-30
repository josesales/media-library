import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import videoReducer from '../../redux/video/videoReducer';
import { Provider } from 'react-redux';
import { createId } from '@paralleldrive/cuid2';
import VideoItem from '../../components/VideoItem';
import Container from '../../components/Container';

const renderWrapper = (component: React.ReactElement) => {
	const store = configureStore({
		reducer: {
			video: videoReducer,
		},
	});

	return render(<Provider store={store}>{component}</Provider>);
};

const videoMock = {
	id: createId(),
	name: 'Video Test',
	mimetype: 'video/mp4',
};

describe('VideoItem component', () => {
	it('should display the video name', async () => {
		renderWrapper(<VideoItem video={videoMock} />);

		expect(screen.getByText('Video Test')).toBeInTheDocument();
	});

	it('should display the video file	', async () => {
		const { container } = renderWrapper(<VideoItem video={videoMock} />);
		const video = container.querySelector('video');

		expect(video instanceof HTMLVideoElement).toBeTruthy();
	});
});
