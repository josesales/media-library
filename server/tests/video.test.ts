import type { Video } from '../src/interfaces/models/video';
import { get, insertOrUpdate } from '../src/services/video';
import express from 'express';
import request from 'supertest';
import videoRouter from '../src/routers/video';
import { StatusCodes } from 'http-status-codes';
import ErrorMessages from '../src/enums/errorMessages';
import { createId } from '@paralleldrive/cuid2';

jest.mock('../src/services/video', () => ({
    get: jest.fn(),
    insertOrUpdate: jest.fn(),
}));

const app = express();
app.use(videoRouter);

const videosMock = [
    {
        id: createId(),
        name: 'Video Test',  
        mimetype: 'video/mp4',
    },
    {
        id: createId(),
        name: 'Video Test 2',  
        mimetype: 'video/mp4',
    },
    {
        id: createId(),
        name: 'Video Test 3',  
        mimetype: 'video/mp4',
    },
];

const videoMock = {
    name: 'Video Test',  
    mimetype: 'video/mp4',
}

const name = 'Video Test.mp4';
const buffer = Buffer.from('Some video');

describe('a get request to /video', () => {
    
  it('should return a list of videos', async () => {


    (get as jest.Mock).mockResolvedValue(videosMock);

    const response = await request(app).get('/video');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual<Video[]>(videosMock);
  });
});

describe('a post request to /video', () => {
    
  it('should return the persisted video', async () => {

    (insertOrUpdate as jest.Mock).mockResolvedValue(videoMock);

    const response = await request(app).post('/video').field('name', 'Video Test').attach('video', buffer, name);

    expect(response.status).toBe(StatusCodes.CREATED);

    //Comparing only name and mimetype since the id and created are generated only after the request is sent
    expect(response.body.name).toEqual<string>(videoMock.name);
    expect(response.body.mimetype).toEqual<string>(videoMock.mimetype);
  });

  it('should return an error if no file is sent', async () => {

    (insertOrUpdate as jest.Mock).mockResolvedValue(videoMock);

    const response = await request(app).post('/video')

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error).toBeDefined()
    expect(response.body.error).toEqual<string>(ErrorMessages.FILE_NOT_FOUND);
  });

  it('should return an error if no name is sent', async () => {

    (insertOrUpdate as jest.Mock).mockResolvedValue(videoMock);

    const response = await request(app).post('/video').attach('video', buffer, name);

    expect(response.status).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body.error).toBeDefined()
    expect(response.body.error).toEqual<string>(ErrorMessages.FILE_NAME_NOT_FOUND);
  });

});
