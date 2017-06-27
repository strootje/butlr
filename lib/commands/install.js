
exports.name = 'install';

exports.setup = ( parser ) => {
	parser.addArgument([ '--search', '-s' ], {
		required: false,
		action: 'storeTrue'
	});

	parser.addArgument([ '--unstable', '-u' ], {
		required: false,
		action: 'storeTrue'
	});

	parser.addArgument([ 'query' ], {
		action: 'store'
	});
};

exports.parse = async ( args ) => {
	const config = await Config();
};
