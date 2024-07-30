import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import videoReducer from '../../redux/video/videoReducer';
import { Provider } from 'react-redux';
import { createId } from '@paralleldrive/cuid2';
import VideoItems from '../../components/VideoItems';
import VideoItem from '../../components/VideoItem';

jest.mock('../../components/VideoItem', () => () => <div>VideoItem</div>);

const renderWrapper = (component: React.ReactElement) => {
	const store = configureStore({
		reducer: {
			video: videoReducer,
		},
	});

	return render(<Provider store={store}>{component}</Provider>);
};

const videosMock = [
	{
		id: createId(),
		name: 'Video Test',
		mimetype: 'video/mp4',
	},
	{
		id: createId(),
		name: 'Video Test 2',
		mimetype: 'video/mp4',
	},
	{
		id: createId(),
		name: 'Video Test 3',
		mimetype: 'video/mp4',
	},
];

describe('VideoItems component', () => {
	it('should display the VideoItem component accordingly the size of the videos array prop', async () => {
		renderWrapper(<VideoItems videos={videosMock} />);

		const displayedVideos = screen.getAllByText('VideoItem');
		expect(displayedVideos).toHaveLength(videosMock.length);
	});

	it('should not display the VideoItem component if the the videos array prop is empty', async () => {
		renderWrapper(<VideoItems videos={[]} />);

		const displayedVideos = screen.queryAllByText('VideoItem');
		expect(displayedVideos).toHaveLength(0);
	});

	it('should display proper message if there are no videos to show', async () => {
		renderWrapper(<VideoItems videos={[]} />);

		expect(
			screen.getByText('No uploaded videos at the moment'),
		).toBeInTheDocument();
	});
});
