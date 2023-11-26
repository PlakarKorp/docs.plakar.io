+++
title = "ui"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "run a browser viewer on a repository"
+++

## Description

The UI subcommand launches a local web server to browse a repository.


## Usage

`plakar ui`


## Examples

```sh
$ plakar ui
lauching browser UI at http://localhost:40717
```

The `-no-spawn` option can be provided to launch an endpoint where to point a browser without spawning a browser:

```sh
$ plakar ui -no-spawn
lauching browser UI at http://localhost:40717
```
