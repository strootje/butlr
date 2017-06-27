const cliui = require('cliui');
const progressbar = require('progress');

const width = 80;
const formatBar = '[:bar] :percent :etas';

function _row(...args) {
	const ui = cliui({
		width: width
	});

	ui.div(...args);
	return ui.toString();
}

exports.row = (...args) => {
	console.log(_row(...args));
};

exports.progress = (name, tick) => {
	const view = _row(
		{
			text: name
		},
		{
			text: formatBar
		}
	)

	const bar = new progressbar(view, {
		total: 100
	});

	const update = () => {
		tick().then(curr => {
			bar.tick(curr);

			if (bar.curr < bar.total) {
				setTimeout(update, 10);
			}
		});
	};

	setTimeout(update, 10);
};
