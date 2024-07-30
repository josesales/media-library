import path from 'node:path';
import express from 'express';
import cors from './middlewares/cors';
import videoRouter from './routers/video';

(async () => {
	const port = process.env.PORT;
	const app = express();
	app.use(cors);

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, 'client/build')));
	}

	app.use(videoRouter);

	app.listen(port, () => {
		console.log(`Server up at port: ${port}`);
	});
})();
