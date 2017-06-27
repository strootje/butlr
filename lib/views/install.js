const chalk = require('chalk');
const ui = require('./../mods/view.js');

exports.header = () => {
	ui.row(
		{
			text: chalk.bold('package')
		},
		{
			text: chalk.bold('installed')
		},
	);
}

exports.row = ( package, update ) => {
	if (!update) {
		ui.row(
			{
				text: `${package.source.name}/${package.name}`
			},
			{
				text: 'no'
			}
		);
	} else {
		ui.progress(source.name, update);
	}
}
