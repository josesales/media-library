import { useState } from 'react';
import Button from '../components/Button';
import htmlEntities from '../utils/htmlEntities';
import { uploadContext } from '../context/UploadContext';

const VideoUpload = () => {
	const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
	const [selectedVideoName, setSelectedVideoName] = useState('');
	const [displaySelectVideoMsg, setDisplaySelectVideoMsg] = useState(false);
	const [displayReadyOnlyMsg, setDisplayReadyOnlyMsg] = useState(false);

	const { upload, setProgress } = uploadContext();

	const clickHandler = () => {
		if (selectedFiles?.length && selectedVideoName.trim() !== '') {
			// Make a copy of the selected file and send the copy to the upload function
			// So when we set its state to null the reference of the file sent to upload remains the same
			const file = new File([selectedFiles[0]], selectedFiles[0].name, {
				type: selectedFiles[0].type,
			});
			upload(file, selectedVideoName);
			setSelectedVideoName('');
			setSelectedFiles(null);
			return;
		}
		setDisplaySelectVideoMsg(true);
		setSelectedFiles(null);
	};

	const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProgress(0);
		if (event.target.files?.length === 0) {
			return;
		}

		setSelectedFiles(event.target.files);
		setDisplaySelectVideoMsg(false);
		setDisplayReadyOnlyMsg(false);

		// Get the file name without the extension
		const originalFileName = (event.target.files as FileList)[0].name;
		const extensionStartIndex = originalFileName.lastIndexOf('.');

		const fileName = originalFileName
			.split('')
			.filter((_element, index) => index < extensionStartIndex)
			.join('');
		setSelectedVideoName(fileName);
	};

	return (
		<>
			<h1 className="page-title">Video Upload</h1>
			<div className="video-upload">
				<label htmlFor="video" className="button video-upload__label">
					Choose File
				</label>

				<input
					type="file"
					accept="video/*"
					name="video"
					id="video"
					className="video-upload__file"
					onChange={changeHandler}
				/>

				<input
					type="text"
					placeholder="Rename File"
					readOnly={!selectedFiles}
					onChange={(e) => {
						if (e.target.value.trim().length === 0) {
							// File needs to have a name
							return;
						}
						setSelectedVideoName(e.target.value);
					}}
					onKeyDown={() => {
						if (!selectedVideoName?.trim()) {
							// If there is no selectedVideoName it means the user has not chosen a file yet
							setDisplayReadyOnlyMsg(true);
						}
					}}
					className="video-upload__input"
					value={selectedVideoName}
				/>

				<Button
					inputText="Upload"
					name={`${htmlEntities.add} Upload`}
					clickHandler={clickHandler}
				/>
			</div>

			{selectedVideoName && selectedFiles && (
				<div className="video-selected">
					<span>{`You have selected "${selectedVideoName}"`}</span>
					<span>{`Please click on ${htmlEntities.add} Upload`} </span>
				</div>
			)}

			{displayReadyOnlyMsg && !selectedFiles && (
				<div className="select-video">
					<span>Please choose a file so you can rename it!</span>
				</div>
			)}

			{displaySelectVideoMsg && (
				<div className="select-video">
					<span>Please choose a video file!</span>
				</div>
			)}
		</>
	);
};

export default VideoUpload;
