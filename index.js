const path = require('path');
const StreamDeck = require('elgato-stream-deck');

class ControlDeck {
	constructor(buttonLayoutPath) {
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
		console.log('initiating button ${buttonId}');

		let tool = require(path.resolve(
			path.dirname(require.main.filename),
			'node_modules',
			buttonData.tool
		));

		new tool(this.streamDeck, buttonId, buttonData.options);
	}
}

module.exports = ControlDeck;
