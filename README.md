# Mutable Template

Mutable Template is a templating format for updating the contents of the template itself. This is useful for configuration files where you have a current configuration, but that you need to update some values using a script.

Mutable Template uses a similar syntax as [Mustache](https://mustache.github.io)/[Handlebars](http://handlebarsjs.com). The input consist of key-values pairs of one of the following formats:

- JSON
- URL-encoded parameters
- Command line parameters (making it easy to include shell environment variables)

Advantages:

- You don't need a separate template file (which clutter the repo as well as requiring a separate build step for each modification).
- The template parts of Mutable Template is easily kept in sync with the actual contents of the file.


## Prerequisites

- [Node.js](https://nodejs.org) or [io.js](https://iojs.org/en/index.html)
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

All of the examples use the following minimal Nginx config (`nginx.conf`) as the basis:

```
server {
    location / {
        proxy_pass http://localhost:8080;
    }
}
```

This config is augmented with Mutable Template syntax, as follows:

```
# MT-COMMENT
server {
    location / {
        proxy_pass http://localhost:8080; # MT-REPLACE: proxy_pass http://localhost:{{port}};
    }
}
```

#### Update config using command line parameters

The following command will update the Nginx config (```nginx.conf```) in-place with its new port number:

`$ mutable-template nginx.conf port 8081`

The result is listed below:

```
# MT-COMMENT
server {
    location / {
        proxy_pass http://localhost:8081; # MT-REPLACE: proxy_pass http://localhost:{{port}};
    }
}
```

#### Use external JSON file as replacement values

Mutable Template does also support replacement values in other formats, such as JSON data and URL-encoded data. In this example we will use an external JSON file (`input.json`) to update the Nginx config:


```
{
    "port": 8082
}
```

The following command will update the Nginx config (`nginx.conf`) in-place using the `input.json` as replacement values:

`$ mutable-template --data-json="$(cat input.json)" nginx.conf`

The result is listed below:

```
# MT-COMMENT
server {
    location / {
        proxy_pass http://localhost:8082; # MT-REPLACE: proxy_pass http://localhost:{{port}};
    }
}
```

#### Use stdin and stdout to perform safe transformation

The following command will read the contents of `nginx.conf` from stdin and output the result to stdout, which in turn is written to a file named `updated-nginx.conf`:

`$ cat nginx.conf | mutable-template - port 8083 > updated-nginx.conf`

The result is listed below:

```
# MT-COMMENT
server {
    location / {
        proxy_pass http://localhost:8083; # MT-REPLACE: proxy_pass http://localhost:{{port}};
    }
}
```

## Contributing

Downloading and installing source code:

1. `git clone https://github.com/chrrasmussen/Mutable-Template.git`
2. `cd Mutable-Template`
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
