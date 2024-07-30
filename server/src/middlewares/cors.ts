import type { Request, Response, NextFunction } from 'express';

// Config that allows the requests coming from a client.
// Make the request not get blocked by CORS policy implemented by the browsers

const cors = (req: Request, res: Response, next: NextFunction) => {
	// Grants access to all clients domain
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Grants access to the methods the client can send
	res.setHeader(
		'Access-Control-Allow-Methods',
		'POST, PUT, PATCH, GET, DELETE, OPTIONS',
	);
	// Grants access to the headers of the client's request
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	// OPTIONS method should not reach the api
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}

	next();
};

export default cors;
