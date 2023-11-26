+++
title = "gzcat"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
hidden = false
description = "concatenate and print compressed files"
+++

## Description

`plakar gzcat` reads gzip-compressed files from within snapshots and writes to the standard output,
similarly to the standard Unix command `gzcat(1)`,
without holding the files in memory or requiring a complete file restore first:
it is fast and suitable for large files.

## Usage
`plakar gzcat snapshotID:/path/to/file.gz [snapshotID:/path/to/file.gz]`

## Examples 

Using `grep` to search for lines containing `mda` in the `/var/log/maillog.0.gz` file of snapshot `c5`,
then using `wc` to count how many lines are in that file:
```sh
$ plakar gzcat c5:/var/log/maillog.0.gz | grep mda
[...]

$ plakar gzcat c5:/var/log/maillog.0.gz | wc -l
     453
```
