import type { Video } from '../interfaces/models/video';
import VideoItem from './VideoItem';

type Props = {
	videos: Video[];
};

const VideoItems = ({ videos = [] }: Props) => {
	return (
		<div className="video-items">
			{videos?.length === 0 ? (
				<h1>No uploaded videos at the moment</h1>
			) : (
				videos?.map((video) => <VideoItem key={video.id} video={video} />)
			)}
		</div>
	);
};
export default VideoItems;
