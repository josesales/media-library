interface Upload {
	progress: number;
	error: Error | null;
	upload: (file: File, name: string) => void;
	setProgress: (value: React.SetStateAction<number>) => void;
}

export default Upload;
