+++
title = "cleanup"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "check health of a repository, snapshot or resource"
+++

## Description

`plakar cleanup` cleans the repository of any chunk or object no longer referenced in a snapshot.

This command is only useful if snapshots are removed from the repository.
It scans the chunks and objects in the repository,
then checks if at least one snapshot makes use of them.
It executes relatively fast but requires locking,
so it shouldn't be called unless necessary and will prevent snapshots to happen during execution.


## Usage

`plakar cleanup`


## Examples

Check the size of a ~/.plakar,
remove snapshot `973`,
size has not changed:

```sh
$ du -sh ~/.plakar
957M    /Users/gilles/.plakar

$ plakar rm 973

$ du -sh ~/.plakar
957M    /Users/gilles/.plakar
```

Run `plakar cleanup` to reclaim any orphan chunk or object,
then check size again:

```sh
$ plakar cleanup

$ du -sh ~/.plakar
439M    /Users/gilles/.plakar
```
