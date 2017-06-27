const promisify = require('./../../mods/promisify');
const { exists } = promisify(require('fs'));
const { join } = require('path');
const sgit = require('simple-git');
const Config = require('./../../mods/config');
const { mkdirp } = require('./../../mods/util');
const dir = require('./dir');

exports.name = 'git';
exports.init = async ( source ) => {
	const config = await Config();
	const paths = config.get('paths');
	const path = join(paths.sources, source.name);

	return {
		update: async () => {
			if (await mkdirp(path)) {
				const git = sgit(path);

				if (!await exists(join(path, '.git'))) {
					git.clone(source.path, path);
				} else {
					git.pull();
				}
			}

			return 100;
		},

		search: async ( query ) => {
			Object.assign(source, { path: path });
			const type = await dir.init(source);
			return await type.search(query);
		}
	};
};
