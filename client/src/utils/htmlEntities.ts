import { decode } from 'html-entities';

// decode the html entity code to be shown in the browser
const htmlEntities = {
	add: decode('&#43;'),
	// more html entities can be added in the future
};

export default htmlEntities;
