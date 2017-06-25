import { readdir, readFile } from 'fs';
import { join } from 'path';
import { a } from './../util';

export default async ( path, query ) => {
	const results = [];

	const files = await a(readdir, path.uri);
	for (const index in files) {
		const file = files[index];

		if (file.search(query) >= 0) {
			results.push(await openPkgFile(join(path.uri, file)));
		}
	}

	return results;
};

const openPkgFile = async ( filepath ) => {
	return JSON.parse(await a(readFile, filepath, 'utf-8'));
};
