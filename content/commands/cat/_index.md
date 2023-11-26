+++
title = "cat"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
hidden = false
description = "concatenate and print files"
+++

## Description

`plakar cat` reads files from within snapshots and writes to the standard output,
similarly to the standard Unix command `cat(1)`,
without holding the files in memory or requiring a complete file restore first:
it is fast and suitable for large files.

## Usage
`plakar cat snapshotID:/path/to/file [snapshotID:/path/to/file]`

## Examples 

Using `grep` to search for the `root` account in the `/private/etc/passwd` file of snapshot `b3`,
then using `wc` to count how many lines are in that file:
```sh
$ plakar cat b3:/private/etc/passwd | grep ^root:
root:*:0:0:System Administrator:/var/root:/bin/sh

$ plakar cat b3:/private/etc/passwd | wc -l
     267
```
