import { findMany, upsert } from '../dataAccess/video';
import ErrorMessages from '../enums/errorMessages';
import type { Video } from '../interfaces/models/video';

/**
 * Either insert or update the video.
 * If the video argument has the same id as one of the persisted db videos then it updates, otherwise it inserts
 * @param video
 * @returns video from db
 */
export const insertOrUpdate = async (video: Video) => {
	try {
		const videoDB = await upsert(video);
		return videoDB;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				error.message ? error.message : ErrorMessages.SERVICE_ERROR,
			);
		}

		throw new Error(ErrorMessages.SERVICE_ERROR);
	}
};

/**
 * Get the list of videos filtered by the Video properties if sent
 * @param video
 * @returns found videos
 */
export const get = async (video?: Video) => {
	try {
		const videos = await findMany(video);
		return videos;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				error.message ? error.message : ErrorMessages.SERVICE_ERROR,
			);
		}

		throw new Error(ErrorMessages.SERVICE_ERROR);
	}
};
