import { existsSync, readFile } from 'fs';

const configFilePaths = [
	'~/.butlr.json',
	'./.butlr.json'
];

let defaults = {
	sources: []
};



export function a( method, ...args ) {
	return new Promise(( resolve, reject ) => {
		method(...args, ( err, result ) => {
			if (err) reject(err);
			resolve(result);
		});
	});
}

export async function config() {
	for (const index in configFilePaths) {
		const configPath = configFilePaths[index];

		if (existsSync(configPath)) {
			Object.assign(defaults, JSON.parse(await a(readFile, configPath)));
			return defaults;
		}
	}
}
