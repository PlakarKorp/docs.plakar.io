+++
title = "backup"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "create a snapshot within a repository"
+++

## Description

The `plakar backup` command is used to create a snapshot of a directory.

## Usage

`plakar backup </path/to/directory>`

## Examples

```sh
$ plakar ls
$ plakar backup /bin
$ plakar backup /bin
$ plakar ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
2023-08-13T08:26:13Z  a946463d     13 MB        0s /bin
$ 
```