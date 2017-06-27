const chalk = require('chalk');
const ui = require('./../modules/view.js');

exports.header = () => {
	ui.row(
		{
			text: chalk.bold('source')
		},
		{
			text: chalk.bold('progress')
		},
	);
}

exports.row = ( source, update ) => {
	if (!update) {
		ui.row(
			{
				text: source.name
			},
			{
				text: 'skipped'
			}
		);
	} else {
		ui.progress(source.name, update);
	}
}
