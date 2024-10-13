+++
title = "checksum"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "check health of a repository, snapshot or resource"
+++

## Description

`plakar checksum` returns the checksums for files within a snapshot.

By default,
it computes the checksum as it reads data from the snapshot,
without restoring the file or keeping data in memory so it suitable for large files,
regardless of the local disk or memory space available.

When the `-fast` option is provided,
it returns the checksum as it was recorded in the snapshot index,
allowing to quickly compare checksums but offering no guarantees that the data was not altered if the repository is not trusted.

## Usage

`plakar checksum snapshotID:/path/to/file`


## Examples

Requesting the computation of checksums for `/private/etc/passwd` and `/private/etc/group` in snapshot `98`,
followed by a request for the recorded checksums:
```sh
$ plakar checksum 98:/private/etc/passwd 98:/private/etc/group 
45e1a370269afcf6bb11ab188ecc193814b9d27a54c75cf0e4f26a0ec869a732 /private/etc/passwd
5f6a031ebf810f336e1bdd3b30b3968eeb1b2209f3e07bc1061120ceb5275912 /private/etc/group

$ plakar checksum -fast 98:/private/etc/passwd 98:/private/etc/group 
45e1a370269afcf6bb11ab188ecc193814b9d27a54c75cf0e4f26a0ec869a732 /private/etc/passwd
5f6a031ebf810f336e1bdd3b30b3968eeb1b2209f3e07bc1061120ceb5275912 /private/etc/group
```