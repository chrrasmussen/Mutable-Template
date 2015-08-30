# Mutable Template

Mutable Template is a templating format for updating the contents of the template itself. This is useful for configuration files where you have a current configuration, but that you need to update some values using a script.

Mutable Template uses a similar syntax as [Mustache](https://mustache.github.io). The input consist of key-values pairs of one of the following formats:

- JSON
- URL-encoded parameters
- Command line parameters (making it easy to include shell environment variables)

Advantages:

- You don't need a separate template file (which clutter the repo as well as requiring a separate build step for each modification).
- The template parts of Mutable Template is easily kept in sync with the actual contents of the file.


## Prerequisites

- [Node](https://nodejs.org) or [io.js](https://iojs.org/en/index.html)
- [NPM](https://www.npmjs.com)


## Installation

1. `npm install -g mutable-template`

You may need to run the command with `sudo` (on Linux/OS X) or run Command Prompt as Administrator (on Windows).


## Usage

```
Mutable Template is a templating format for updating the contents of the template itself.

Use "-" in-place of <file> to apply transformation to stdin.

Usage:
  mutable-template [options] <file> [(<key> <value>)...]

Options:
  --data-json=JSON              JSON data as replacement values
  --data-urlencoded=URLENCODED  URL-encoded data as replacement values
  --help                        This help text
  --version                     Show version number
```

### Examples

Use external JSON file as input values:

`mutable-template "--data-json=$(cat input.json)" nginx.conf`

Use stdin and stdout to perform safe transformation:

`cat originalFile.yml | mutable-template - value "Updated value" > updatedFile.yml`


## Contributing

Downloading and installing source code:

1. `git clone https://github.com/chrrasmussen/Mutable-Template.git`
2. `cd mutable-template`
3. `npm install`
4. `npm run build`
5. `npm link`

The command line tool `mutable-template` is now available.


### Tips while developing

Running tests:

1. `npm test`


Running tests continuously:

1. `npm install supervisor`
2. `supervisor --no-restart-on exit --watch src,spec --exec npm -- test`


Running CLI after making changes to the source code:

1. `npm run build && mutable-template <parameters>`


## Contact

- Christian Rasmussen <christian.rasmussen@me.com>


## License

This tool is licensed under the MIT license. See LICENSE for more details.
