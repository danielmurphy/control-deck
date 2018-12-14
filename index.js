const path = require('path');
const StreamDeck = require('elgato-stream-deck');

class ControlDeck {
	constructor(buttonLayoutPath, options = {}) {
		this.debug = !!options.debug;
		this.streamDeck = new StreamDeck();
		this.streamDeck.clearAllKeys();

		const buttonDefinitions = require(path.resolve(
			path.dirname(require.main.filename),
			buttonLayoutPath
		));

		for (let key in buttonDefinitions) {
			let button_id = parseInt(key.split('_')[1]);
			this._initButton(button_id, buttonDefinitions[key]);
		}
	}

	_initButton(buttonId, buttonData) {
		console.log(`initiating button ${buttonId}`);

		try {
			let plugin = require(path.resolve(
				path.dirname(require.main.filename),
				'node_modules',
				buttonData.plugin
			));
			new plugin(this.streamDeck, buttonId, buttonData.options);
		} catch (error) {
			console.log(`Couldn't initialize button ${buttonId}`);
			console.log(error);
		}
	}
}

module.exports = ControlDeck;
