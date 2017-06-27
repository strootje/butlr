
module.exports = ( methods ) => {
	for(const key in methods) {
		const method = methods[key];

		if (typeof(method) !== "function" || key.search(/.+(sync|stream)$/i) >= 0) {
			continue;
		}

		methods[key] = ( ...args ) => new Promise(( resolve, reject ) => {
			method(...args, ( ...result ) => {
				if (result.length === 1) {
					resolve(...result);
				} else {
					const err = result.shift();
					if (err) reject(err);
					resolve(...result);
				}
			});
		});
	}

	return methods;
};
