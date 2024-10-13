+++
title = "ls"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "list snapshots or resources"
+++

## Description

The `plakar ls` command is used to list snapshots or resources within snapshots, without restoring them.

## Usage

`plakar ls`

`plakar ls <snapshotID>`

`plakar ls <snapshotID>:/path/to/directory`

`plakar ls <snapshotID>:/path/to/filename`


## Examples

Listing the content of a repository,
then the content of a snapshot's `/private/etc` directory and displaying the last 3 entries:

```sh
$ plakar ls
2023-08-13T08:11:47Z  6b8987eb    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  e1a571c6    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  b00c1e5d    3.0 MB        0s /private/etc
$ plakar ls b0:/private/etc | tail -3
2023-05-12T22:29:20Z -r--r--r--     root    wheel    255 B zprofile
2023-05-12T22:29:20Z -r--r--r--     root    wheel   3.1 kB zshrc
2023-05-12T22:29:20Z -rw-r--r--     root    wheel   9.3 kB zshrc_Apple_Terminal
```