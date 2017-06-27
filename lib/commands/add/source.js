const Config = require('./../../modules/config');

exports.name = 'source';

exports.setup = ( parser ) => {
	parser.addArgument('name', {
		action: 'store'
	});

	parser.addArgument('type', {
		action: 'store',
		choices: [ 'dir', 'git' ]
	});

	parser.addArgument('path', {
		action: 'store'
	});
};

exports.parse = async ( args ) => {
	const config = await Config();
	const sources = config.get('sources');

	sources.push({
		name: args.name,
		type: args.type,
		path: args.path
	});

	config.set('sources', sources);
	await config.save();
};
