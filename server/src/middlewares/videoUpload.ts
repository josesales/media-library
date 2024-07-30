import { createId } from '@paralleldrive/cuid2';
import multer from 'multer';

const destination = process.env.VIDEO_DESTINATION || 'server/uploads';

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, destination);
	},

	filename: (_req, file, cb) => {
		const id = createId();
		cb(null, `${id}.${file.mimetype.split('/')[1]}`);
	},
});

const videoUpload = multer({ storage });

export default videoUpload;
