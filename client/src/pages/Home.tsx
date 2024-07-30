import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getVideos } from '../redux/video/videoThunk';
import Loader from '../components/Loader';
import VideoItems from '../components/VideoItems';

const Home = () => {
	const [loading, isLoading] = useState(false);
	const dispatch = useAppDispatch();
	const videos = useAppSelector((state) => state.video.videos);

	useEffect(() => {
		(async () => {
			isLoading(true);
			await dispatch(getVideos());
			isLoading(false);
		})();
	}, [dispatch]);

	return (
		<>
			<h1 className="page-title">Uploaded Videos</h1>

			{loading ? <Loader /> : videos && <VideoItems videos={videos} />}
		</>
	);
};

export default Home;
