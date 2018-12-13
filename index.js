const path = require('path');

class ControlDeck {
	constructor(buttonLayoutPath) {
		this.buttonDefinitions = require(path.resolve(
			path.dirname(require.main.filename),
			buttonLayoutPath
		));
	}
}

module.exports = ControlDeck;
