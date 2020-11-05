# Gendiff

[![Maintainability](https://api.codeclimate.com/v1/badges/968adb4773696b6c8767/maintainability)](https://codeclimate.com/github/floydezus/frontend-project-lvl2/maintainability)  [![Test Coverage](https://api.codeclimate.com/v1/badges/968adb4773696b6c8767/test_coverage)](https://codeclimate.com/github/floydezus/frontend-project-lvl2/test_coverage) ![Node.js CI](https://github.com/floydezus/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg) ![hexlet-check](https://github.com/floydezus/frontend-project-lvl2/workflows/hexlet-check/badge.svg)

## Description
Gendiff is a command-line difference calculator.
Compares two configuration files and shows a difference.

## Setup
```sh
$ make install
```
## Run tests
```sh
$ make test
```
## Help
```sh
$ make help
```
----------------------------
## Usage
```sh
    Usage: gendiff [options] <pathToFile1> <pathToFile2>

    Compares two configuration files and shows a difference.

    Options:
    -V, --version        output the version number
    -f, --format [type]  output format (default: "stylish")
    -h, --help           display help for command
    
    [type] - plain, json, nested
    <pathToFile> - path to json, yaml or ini configuration file
```
-------------------------
## Example

### Info Output
[![asciicast](https://asciinema.org/a/4LULNCyww7lLRvZYD7CUWfT5Y.svg)](https://asciinema.org/a/4LULNCyww7lLRvZYD7CUWfT5Y)

### Flat JSON

#### before.json
```sh
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": null,
  "follow": false
}
```
#### after.json
```sh
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}
```
[![asciicast](https://asciinema.org/a/HwVKz5qVP8iKsqtEYJJWyHU1N.svg)](https://asciinema.org/a/HwVKz5qVP8iKsqtEYJJWyHU1N)


### Flat YAML

#### before.yaml

```sh
host: hexlet.io
timeout: 50
proxy: null
follow: false
```
#### after.yaml
```sh
timeout: 20
verbose: true
host: hexlet.io
```
[![asciicast](https://asciinema.org/a/qU4OOliLBOIzpyYUJk6KAXooK.svg)](https://asciinema.org/a/qU4OOliLBOIzpyYUJk6KAXooK)



### Flat INI

#### before.ini

```sh
host=hexlet.io
timeout=50
proxy=null
follow=false
```
#### after.ini
```sh
timeout=20
verbose=true
host=hexlet.io
```
[![asciicast](https://asciinema.org/a/OhUoYNycfLEwInRHefeRV8Njr.svg)](https://asciinema.org/a/OhUoYNycfLEwInRHefeRV8Njr)

### Multi-level configuration files

#### file1.json
```sh
{
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
}
```

#### file2.json
```sh
{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "fee": 100500,
    "deep": {
      "id": {
        "number": 45
      }
    }
  }
}
```

### Stylish treelike format

[![asciicast](https://asciinema.org/a/gk9s8c1B0nu1nLNHl27FHhpHS.svg)](https://asciinema.org/a/gk9s8c1B0nu1nLNHl27FHhpHS)



### Plain format

[![asciicast](https://asciinema.org/a/Q9ZYM6yHPZAl0D5gCdbTAmtoj.svg)](https://asciinema.org/a/Q9ZYM6yHPZAl0D5gCdbTAmtoj)



### JSON format

[![asciicast](https://asciinema.org/a/Oc2Cfq45vyiD0Mm99gGAdgdHq.svg)](https://asciinema.org/a/Oc2Cfq45vyiD0Mm99gGAdgdHq)

