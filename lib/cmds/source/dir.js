const promisify = require('./../../mods/promisify');
const { readdir, readFile } = promisify(require('fs'));
const { join } = require('path');
const Config = require('./../../mods/config');

exports.name = 'dir';
exports.init = async ( source ) => {
	const config = await Config();
	const paths = config.get('paths');

	return {
		update: async () => {
			return 100;
		},

		search: async ( query ) => {
			const files = await readdir(source.path);

			const pkgs = []
			for (const index in files) {
				const file = files[index];
				const path = join(source.path, file);

				if (file.search(/^\./i) < 0 && file.search(query) >= 0) {
					const pkg = JSON.parse(await readFile(path, 'utf8'));
					pkg.source = source;
					pkgs.push(pkg);
				}
			}

			return pkgs;
		}
	};
};
