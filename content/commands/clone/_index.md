+++
title = "clone"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "create a clone from an existing repository"
+++

## Description

The `plakar clone` command creates an **exact copy** of an existing repository,
matching the same repository UUID,
and the same compression and encryption configuration.


## Usage

`plakar [on source] clone /path/to/destination`


## Example

Clone the local plakar repository into `/tmp/myclone``:
```sh
% plakar ls   
2023-08-10T07:34:34Z  9819e614    3.0 MB        0s /private/etc
$ plakar clone /tmp/myclone
$ plakar on /tmp/myclone ls
2023-08-10T07:34:34Z  9819e614    3.0 MB        0s /private/etc
```
