import express, { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import videoUpload from '../middlewares/videoUpload';
import fs from 'node:fs';
import { get, insertOrUpdate } from '../services/video';
import ErrorMessages from '../enums/errorMessages';
import type { Video } from '../interfaces/models/video';

const videoRouter = express.Router();

videoRouter.get('/video', async (_req: Request, res: Response) => {
	try {
		const videos = await get();
		res.status(StatusCodes.OK).send(videos);
	} catch (error) {
		if (error instanceof Error) {
			res
				.status(StatusCodes.INTERNAL_SERVER_ERROR)
				.send({ error: error.message });
			return;
		}
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
	}
});

videoRouter.get('/playVideo/:id/:type', (req, res) => {
	const { id, type } = req.params;
	const filePath = `${process.env.VIDEO_DESTINATION}/${id}.${type}`;

	// Check if file exists
	fs.access(filePath, fs.constants.F_OK, (error) => {
		if (error) {
			return res.status(404).json({ error: 'Video not found' });
		}

		// Stream the video file
		const stat = fs.statSync(filePath);
		const fileSize = stat.size;
		const range = req.headers.range;

		if (range) {
			const chunkSize = 10 ** 6; // 1MB
			// Handle byte-range requests for video streaming
			const [start, end] = range.replace(/bytes=/, '').split('-');
			const startByte = Number.parseInt(start, 10);
			const endByte = end
				? Number.parseInt(end, 10)
				: Math.min(startByte + chunkSize, fileSize - 1);

			res.writeHead(206, {
				'Content-Range': `bytes ${startByte}-${endByte}/${fileSize}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': endByte - startByte + 1,
				'Content-Type': `video/${type}`,
			});

			const stream = fs.createReadStream(filePath, {
				start: startByte,
				end: endByte,
			});
			stream.pipe(res);
		} else {
			res.writeHead(200, {
				'Content-Length': fileSize,
				'Content-Type': `video/${type}`,
			});

			const stream = fs.createReadStream(filePath);
			stream.pipe(res);
		}
	});
});

videoRouter.post(
	'/video',
	videoUpload.single('video'),
	async (req: Request, res: Response) => {
		try {
			if (!req.file) {
				throw new Error(ErrorMessages.FILE_NOT_FOUND);
			}
			if (!req.body.name) {
				throw new Error(ErrorMessages.FILE_NAME_NOT_FOUND);
			}

			const video: Video = {
				id: req.file.filename.split('.')[0],
				name: req.body.name,
				mimetype: req.file.mimetype,
				created: new Date(),
			};

			await insertOrUpdate(video);

			res.status(StatusCodes.CREATED).send(video);
		} catch (error) {
			if (error instanceof Error) {
				const status =
					error.message === ErrorMessages.FILE_NOT_FOUND ||
					error.message === ErrorMessages.FILE_NAME_NOT_FOUND
						? StatusCodes.BAD_REQUEST
						: StatusCodes.INTERNAL_SERVER_ERROR;
				res.status(status).send({ error: error.message });
				return;
			}
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
		}
	},
);

export default videoRouter;
