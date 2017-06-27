const Config = require('./../../mods/config');

exports.name = 'source';

exports.setup = ( parser ) => {
	parser.addArgument('name', {
		action: 'store'
	});
};

exports.parse = async ( args ) => {
	const config = await Config();
	const sources = config.get('sources');

	for (const index in sources) {
		if (sources[index].name === args.name) {
			sources.splice(index, 1);
			break;
		}
	}

	config.set('sources', sources);
	await config.save();
};
