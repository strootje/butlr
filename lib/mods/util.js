const promisify = require('./promisify');
const { exists, mkdir } = promisify(require('fs'));
const { join } = require('path');
const Config = require('./config');

exports.mkdirp = async function mkdirp ( path ) {
	path = path || '/';

	if (await exists(path)) {
		return true;
	}

	const paths = path.split(/\//gi);
	const top = paths.pop();

	const parent = `/${join(...paths)}`;
	return await mkdirp(parent) && !await mkdir(join(parent, top));
};
