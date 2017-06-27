
exports.name = 'fix';

exports.setup = ( parser ) => {
	parser.addArgument('fix', {
		choices: [ 'gpu' ]
	});
};

exports.parse = async ( args ) => {
	const config = await Config();
};
