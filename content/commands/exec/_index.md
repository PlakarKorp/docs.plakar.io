+++
title = "exec"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "run executable from a snapshot"
+++


## Description

The `plakar exec` command runs an executable from the snapshot.

This is a helper to avoid having to restore an executable, execute it then remove it.
It has several limitations and is only useful to a certain extent,
if you know what you're doing:
it can only run scripts if the interpreter is available locally,
it can only execute static binaries unless shared libraries are available locally
and it can very obviously only execute binaries that the local machine knows how to execute (ie: same operating system and architecture).

Most people will find this command useless,
but it can very rarely prove useful so it stays.

## Usage

`plakar exec [command args ...]`

## Examples

Execute the `/bin/cat` command that was part of the snapshot `31` to display the content of local file `/etc/passwd`.

```sh
$ plakar exec 31:/bin/cat /etc/passwd |grep ^root
root:*:0:0:System Administrator:/var/root:/bin/sh
```

Of course this has the same limitations as if the executable was copied from a remote machine,
namely the requirement that the host machine can actually run the executable,
and that it doesn't rely on shared libraries that are unavailable on the host machine.