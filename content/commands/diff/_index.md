+++
title = "diff"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "compare snapshots, directories and files"
+++

## Description

The `plakar diff` command performs a diff between two snapshots,
without restoring them.

If provided with two snapshot identifiers,
the command will perform an inode diff by checking if permissions, ownership or modification date have changed.

If provided with a file argument as third parameter, the command will perform a file diff between the file present in both snapshots without restoring them.


## Usage

`plakar diff [snapshotID] [snapshotID]`

`plakar diff [snapshotID] [snapshotID] /path/to/file`

## Examples

In this example,
two snapshots are compared for inode differences:
```diff
$ plakar diff b3 45
-  drwxr-xr-x     root    wheel   2.9 kB 2021-09-26 20:45:08.587949603 +0000 UTC /private/etc/
+  drwxr-xr-x     root    wheel   2.9 kB 2021-10-06 19:54:55.675866163 +0000 UTC /private/etc/
+  -rw-r--r--     root    wheel      0 B 2021-10-06 19:54:55.67585958 +0000 UTC /private/etc/bleh
```

In this example,
two snapshots have their `/private/etc/group` file compared:
```diff
$ plakar diff b3 a0 /private/etc/group
--- b3bdb2b0-115a-4198-93a4-976edf883eb5:/private/etc/group
+++ a0dee33e-568e-4946-9be3-a987f939a351:/private/etc/group
@@ -145,4 +145,5 @@
 com.apple.access_ssh:*:399:
 com.apple.access_remote_ae:*:400:
 _oahd:*:441:_oahd
+_foobar:*:442:_foobar
```
