+++
title = "mount"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "mount a repository as a FUSE filesystem"
+++

## Description

The `plakar mount` command mounts a repository as FUSE filesystem,
making it browsable as a regular read-only directory.

Note that FUSE support was written and only tested on macOS.


## Usage

`plakar mount /path/to/mountpoint`


## Examples

Creating a `/tmp/myplakar` directory,
then mounting the default plakar at that endpoint:

```sh
$ mkdir /tmp/myplakar
$ plakar mount /tmp/myplakar
$ 
```