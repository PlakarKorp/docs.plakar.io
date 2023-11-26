+++
title = "create"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "create a new snapshots repository"
+++

## Description

The `plakar create` command creates a new plakar repository.

By default,
the repository is created in `~/.plakar`,
with compression and encryption enabled.

Compression can be disabled with the `-no-compression` option,
but it is advised to leave it enabled:
its overhead is insignificant and there's no point in setting up a deduplicated repository and not using compression in the first place.

Encryption is also quite cheap however,
unlike compression,
there are cases where it's desirable to run a cleartext repository.
In such cases,
the `-no-encryption` option can be used.


## Usage

`plakar [on /path/to/directory] create [-no-encryption] [-no-compression]`


## Examples 

The repository is created with encryption and compression enabled in `~/.plakar` by default:
```sh
$ plakar create
passphrase: 
```

A repository without encryption can be created as such:
```sh
$ plakar create -no-encryption
```

An alternate path may be provided as such:
```sh
$ plakar on ~/plakars/myplakar create -no-encryption
```
