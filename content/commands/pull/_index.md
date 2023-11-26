+++
title = "pull"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "restore snapshots or resources"
+++

## Description

The `plakar pull` command is used to restore all or part of a snapshot.

## Usage

`plakar pull <snapshotID>`

`plakar pull <snapshotID>:/path/to/directory`

`plakar pull <snapshotID>:/path/to/filename`


## Examples

```sh
$ plakar pull a0
$ plakar pull a0:/private/etc/openldap
$ ls -l private/etc/openldap
total 248
-rw-r--r--   1 gilles  staff  116915  6 Oct 22:02 AppleOpenLDAP.plist
-rw-r--r--   1 gilles  staff     265  6 Oct 22:02 ldap.conf
-rw-r--r--   1 gilles  staff     265  6 Oct 22:02 ldap.conf.default
drwxr-xr-x  38 gilles  staff    1216  6 Oct 21:48 schema
```