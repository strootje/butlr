const { join } = require('path');
const cache = require('./cache');
const { paths } = require('./consts');

const defaults = {
	paths: {
		sources: join(paths.base, 'sources'),
		install: join(paths.base, 'install')
	},

	sources: [
		{ name: 'bottles', type: 'git', path: 'http://github.com/strootje/bottles.git' }
	]
};

module.exports = async () => {
	const store = await cache('config', defaults);

	store.set('paths', defaults.paths);
	store.set('sources', defaults.sources);

	if (!await store.exists()) {
		await store.save();
	}

	return store;
};
