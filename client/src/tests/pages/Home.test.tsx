import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import Home from '../../pages/Home';
import videoReducer from '../../redux/video/videoReducer';
import { Provider } from 'react-redux';
import { createId } from '@paralleldrive/cuid2';
import { get } from '../../utils/requestSender';

jest.mock('../../utils/requestSender', () => ({
	get: jest.fn(),
}));

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

describe('Home page', () => {
	it('should display uploaded videos', async () => {
		(get as jest.Mock).mockResolvedValue(videosMock);

		renderWrapper(<Home />);

		expect(screen.getByText('Uploaded Videos')).toBeInTheDocument();

		await waitFor(() =>
			expect(screen.getByText('Video Test')).toBeInTheDocument(),
		);
	});

	it('should not display uploaded videos', async () => {
		(get as jest.Mock).mockResolvedValue([]);

		renderWrapper(<Home />);

		expect(screen.getByText('Uploaded Videos')).toBeInTheDocument();

		await waitFor(() =>
			expect(screen.queryByText('Video Test')).not.toBeInTheDocument(),
		);
	});
});
