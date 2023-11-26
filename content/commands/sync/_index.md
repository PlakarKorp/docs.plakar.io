+++
title = "sync"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "synchronize a repository with snapshots from another repository"
+++

## Description

The `plakar sync` command synchronizes a target repository with all resources available or with a specific snapshot in the current repository.

It can be run on a repository clone,
create with `plakar clone`,
or on a different repository in which case it'll take care of handling compression and encryption transparently so the synchronization works:
synchronizing from a cleartext repository to an encrypted repository will encrypt data,
synchronizing from an encrypted repository to a cleartext repository will decrypt data,
synchronizing from an encrypted repository to another encrypted repository will decrypt and encrypt with the target key,
etc...

This is useful in situations where a local repository is cleartext and an off-site repository is encrypted.


## Usage

`plakar sync to <repository>`

`plakar sync <snapshotID> to <repository>`

## Examples

```sh
$ plakar ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
$ plakar create /tmp/copy
$ plakar sync to /tmp/copy
$ plakar on /tmp/copy ls
2023-08-13T08:26:12Z  227b0536     13 MB        0s /bin
```
