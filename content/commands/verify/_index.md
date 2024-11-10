+++
title = "verify"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "verify health of a repository, snapshot or resource"
+++

## Description

`plakar verify` performs a health check on snapshots without restoring them to the filesystem.

By default,
it performs a full check making sure that it can retrieve everything it needs for a full restore,
validating that the checksums for every chunk and object match.
This check is similar to restoring a snapshot,
computing a checksum of the files as they are being restored and removing them once it's done,
but does it in a more efficient way.

When the `-fast` option is provided,
it performs a fast check by asking the repository if it holds the resources needed,
but without retrieving them and validating checksums.
This check is much faster,
doesn't imply much data transfer,
but is only suitable if there's confidence that the repository is trusted and not corrupted.

## Usage

`plakar verify snapshotID`

`plakar verify snapshotID:/path/to/file`


## Examples

Performing a verify then a fast verify on snapshot `b3`:
```sh
$ plakar verify b3 && echo ok
ok

$ plakar verify -fast b3 && echo ok
ok
```

Performing a verify on a file within snapshot `b3`:
```sh
$ plakar verify b3:/private/etc/passwd && echo ok
ok

$ plakar verify -fast b3:/private/etc/passwd && echo ok
ok
```