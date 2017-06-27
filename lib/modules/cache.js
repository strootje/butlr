const promisify = require('./promisify');
const { exists, readFile, writeFileSync } = promisify(require('fs'));
const { join } = require('path');
const { mkdirp } = require('./util');

const storePath = join(process.env.HOME, '.polz');
const stores = {};

const create = async ( id, data = {} ) => {
	const name = `${id}.json`;
	const path = join(storePath, name);

	let loaded = false;
	let saved = true;

	return {
		exists: async () => {
			return await exists(path);
		},

		get: ( key, loader ) => {
			saved = false;
			return data[key];
		},

		set: ( key, value ) => {
			data[key] = value;
			saved = false;
		},

		loaded: () => {
			return loaded;
		},

		load: async () => {
			if (await exists(path)) {
				const jdata = await readFile(path, 'utf8');
				if (jdata !== undefined && jdata !== '') {
					Object.assign(data, JSON.parse(jdata));
					loaded = true;
				}
			}
		},

		saved: () => {
			return saved;
		},

		save: async () => {
			if (!saved) {
				const jdata = JSON.stringify(data);
				if (jdata !== undefined && jdata !== '') {
					await mkdirp(storePath);
					writeFileSync(path, jdata, 'utf8');
					saved = true;
				}
			}
		}
	};
};

module.exports = async ( storeId, defaults = {} ) => {
	if (!stores[storeId]) {
		store = await create(storeId, defaults);
		stores[storeId] = store;
	}

	if (!stores[storeId].loaded()) {
		await stores[storeId].load();
	}

	return stores[storeId];
};
