import type { Video } from '../interfaces/models/video';
import { baseUrl } from '../utils/axiosInstance';

type Props = {
	video: Video;
};

const VideoItem = ({ video }: Props) => {
	return (
		<div className="video-item">
			<video key={video.id} controls className="video-item__file">
				<source
					src={`${baseUrl}/playVideo/${video.id}/${video.mimetype.split('/')[1]}`}
					type={video.mimetype}
				/>
			</video>
			<span className="video-item__name">{video.name}</span>
		</div>
	);
};
export default VideoItem;
