import ErrorMessages from '../enums/errorMessages';
import type { Video } from '../interfaces/models/video';
import prisma from './prisma';

/**
 * Either insert or update the video.
 * If the video argument has the same id as one of the persisted database videos then it updates, otherwise it inserts
 * @param video
 * @returns video from db
 */
export const upsert = async (video: Video) => {
	try {
		const videoDB = await prisma.video.upsert({
			create: video,
			update: video,
			where: {
				id: video.id ? video.id : '',
			},
		});

		return videoDB;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(
				error.message ? error.message : ErrorMessages.DATABASE_ERROR,
			);
		}

		throw new Error(ErrorMessages.DATABASE_ERROR);
	}
};

/**
 * Get the list of videos filtered by the Video properties if sent
 * @param video
 * @returns found videos
 */
export const findMany = async (video?: Video) => {
	try {
		const filter = video ? video : {};

		const videos: Video[] = await prisma.video.findMany({
			where: filter,
			orderBy: { created: 'desc' },
		});

		return videos;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message ? error.message : 'DATABASE_ERROR');
		}

		throw new Error('DATABASE_ERROR');
	}
};
