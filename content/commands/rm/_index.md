+++
title = "rm"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "remove snapshots from a repository"
+++

## Description

The `plakar rm` command is used to delete a snapshot.


## Usage

`plakar rm <snapshotID>`

## Examples

Removing snapshot `a9`:

```sh
$ plakar ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
2023-08-13T08:26:13Z  a946463d     13 MB        0s /bin
$ plakar rm a9
$ plakar ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
$ 
```