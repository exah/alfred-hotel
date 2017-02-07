# alfred-hotel

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

> [Alfred 3](https://www.alfredapp.com/) workflow that lets you to start, open and stop [Hotel](https://github.com/typicode/hotel) apps

![alfred hotel workflow screenshot in action](screenshot.png)


## Requirements

- [Node.js](https://nodejs.org) >= 4.x
- [Hotel](https://github.com/typicode/hotel) with [default settings](#hotel-settings)
- Alfred [Powerpack](https://www.alfredapp.com/powerpack/)


## Install

```shell
$ npm install -g alfred-hotel
```


## Usage

In Alfred, type `hotel` to list all [Hotel](https://github.com/typicode/hotel) apps, press <kbd>Space</kbd> to search through list.

With selected app you can:

- <kbd>Enter</kbd> to start and open app in default browser (http://example.dev)
- <kbd>Alt</kbd> + <kbd>Enter</kbd> to open app without local domain (http://127.0.0.1:50409)
- <kbd>Command</kbd> + <kbd>Enter</kbd> to stop selected app
- <kbd>Shift</kbd> to preview url in quicklook


## Hotel Settings

Currently workflow works only with default Hotel settings.

- Hotel is available at `http://localhost:2000`
- Local domains are at `.dev` zone


## Related

- [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease


## License

MIT © [John Grishin](http://johngrish.in)
