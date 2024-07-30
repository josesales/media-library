import { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { uploadContext } from '../context/UploadContext';

const Footer = () => {
	const [displayProgressBar, setDisplayProgressBar] = useState(true);
	const { progress } = uploadContext();

	useEffect(() => {
		// Hide the progress bar, after 3 seconds, once the progress reaches 100
		if (progress >= 100) {
			setTimeout(() => {
				setDisplayProgressBar(false);
			}, 3000);
			return;
		}
		setDisplayProgressBar(true);
	}, [progress]);

	if (!displayProgressBar) {
		return null;
	}

	return (
		<div className="footer">
			<ProgressBar progress={progress} />
		</div>
	);
};

export default Footer;
