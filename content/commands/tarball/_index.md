+++
title = "tarball"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "create a tarball from a snapshot or part of a snapshot"
+++

## Description

The `plakar tarball` command creates a tarball from a snapshot.


## Usage

`plakar tarball <snapshotID>`

`plakar tarball <snapshotID>:/path/to/directory`


## Examples

```sh
$ plakar ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
2023-08-13T08:26:13Z  a946463d     13 MB        0s /bin
$ ls -l
[...]
-rw-r--r--  1 gilles  staff  4399374 Aug 13 11:03 plakar-2023-08-13T09:03:26Z.tar.gz
[...]
$ plakar-2023-08-13T09:03:26Z.tar.gz
plakar-2023-08-13T09:03:26Z.tar.gz: gzip compressed data, original size modulo 2^32 12938752
```