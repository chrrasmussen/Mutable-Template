# Mutable Template

Mutable Template is a templating format for updating the contents of the template itself. This is useful for configuration files where you have a current configuration, but that you need to update some values using a script.

Mutable Template uses a similar syntax as [Mustache](https://mustache.github.io). The input consist of key-values pairs of one of the following formats:

- JSON
- Form-encoded parameters
- Shell environment variables

Advantages:

- You don't need a separate template file (which clutter the repo as well as requiring a separate build step for each modification).
- The template parts of Mutable Template is easily kept in sync with the actual contents of the file.


## Installation

TODO


## Usage

TODO


## Tips while developing

`npm install supervisor`
`supervisor --no-restart-on exit --watch src -- ./node_modules/.bin/babel-node src/index.js`
`supervisor --no-restart-on exit --watch src,spec --exec npm -- test`


## Contact

- Christian Rasmussen <christian.rasmussen@me.com>