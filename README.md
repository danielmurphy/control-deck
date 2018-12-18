# Control Deck

An extensible node app for easily customizing an Elgato Stream Deck. Setup is all done via a JSON file and various Control Deck plugins.

## Demo

[![Demo Video](https://monosnap.com/image/S9jB6PXMjGzFdWk8m3cffTyCA58DEX.png)](https://www.youtube.com/watch?v=GSKKFIf7Y98)

## Example

First, create a new app

```
mkdir myapp
cd myapp
npm add control-deck
npm add control-deck-media-controls
touch myapp.js
touch button-layout.json
```

Now configure our button layout in `button-layout.json`

```
{
	"button_0": {
		"plugin": "control-deck-media-controls",
		"options": {
			"type": "play/pause"
		}
	}
}
```

We've defined that button `0` will use the [Control Deck Media Controls](https://github.com/danielmurphy/control-deck-media-controls) plugin to mimic pushing the play/pause button on your keyboard.

All that's left is to bootstrap the app in `myapp.js`

```
const ControlDeck = require('control-deck');
new ControlDeck('button-layout.json');
```

Now back in your console:

```
node myapp.js
```

If all went well, you'll have a single play / pause button in the top right of your Stream Deck.

## Plugins

Control Deck is merely a framework for the plugins which do all the heavy lifting.

A listing of plugins is available in [the wiki](https://github.com/danielmurphy/control-deck/wiki/Plugins).

## Building Your Own Plugins

A plugin is nothing more than a JS class. A very basic example that does nothing more than print "Hello World" to the console on instantiation:

```
class ControlDeckHelloWorld {
  constructor(streamDeck, buttonId, options) {
    console.log('Hello world!');
  }
}
```

Then use npm (or yarn) to package that up as `control-deck-hello-world`.

Three arguments will be passed to the constructor at instantiation.

`streamDeck` - an `elgato-stream-deck` instance representing your Stream Deck. Documentation for adding button listeners, drawing on the buttons, and more is in the `elgato-stream-deck` [README](https://github.com/Lange/node-elgato-stream-deck).

`buttonId` - the button that we're concerned with here. Integer from 0-14.

`options` - the options specified in `button-layout.json`. Can take any shape that your plugin needs.

## Contributing

Pull requests are welcome. If you've written your own plugins, be sure to add them to [the wiki](https://github.com/danielmurphy/control-deck/wiki/Plugins)!
