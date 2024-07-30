type Props = {
	progress: number;
};

const ProgressBar = ({ progress }: Props) => {
	if (!progress) {
		return null;
	}

	return (
		<>
			<div className="progress-bar">
				<span className="progress-bar__text">{`${progress}%`}</span>
				<div
					className="progress-bar__status"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</>
	);
};

export default ProgressBar;
