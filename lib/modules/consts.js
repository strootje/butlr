const { join } = require('path');

const baseDir = '.butlr';
const basePath = join(process.env.HOME, baseDir);

exports.paths = {
	base: basePath
};
