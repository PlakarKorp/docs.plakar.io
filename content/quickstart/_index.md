+++
title = "Quickstart"
date = 2022-03-13T23:27:47+01:00
weight = 1
chapter = false
pre = "<b>1. </b>"
+++

## Quickstart

### Create a repository

Backups are stored in repositories,
so before you can create your first snapshots you need to create a destination repository that will host them.

For the purpose of this tutorial,
the repository will not be encrypted to avoid being prompted for a passphrase on each command.
For encrypted repositories,
simply drop the `-no-encryption` option and things will work **exactly** the same:

```sh
$ plakar create -no-encryption
$
```

When no path is provided,
the repository is created in `~/.plakar`.
It is possible to create it elsewhere,
in which case the path has to be provided on the command line as such:

```sh
$ plakar on /tmp/plakar create -no-encryption
$
```

Once a repository is created,
there are **MANY** operations that can be done upon it.


### Pushing snapshots

First of all,
backups can be stored in a repository by pushing snapshots:

```sh
$ plakar push /bin
$ plakar push /bin
$ plakar push /bin
$
```

The `push` commands will scan `/bin` and store content in the repository,
performing deduplication to avoid storing redundant data:
the second and third pushes are much faster and do not cause the repository to grow much as they only record structure and metadata information.

The snapshots are completely independent,
it is possible to delete the first one without affecting the two others even though they relied on the same deduplicated data.


### Listing snapshots

The content of a repository can be listed with `ls`:

```sh
$ plakar ls       
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin
$
```

The output above shows the three snapshots pushed above as well as a few information regarding them.


### Restoring snapshots

Any snapshot can be restored with the `pull` command:

```sh
$ plakar pull 744d45ed
$
```

The command above recreates the structure of the snapshot,
in this case a `bin` directory filled with underlying files:

```sh
$ ls -l bin/
total 25072
-rw-r--r--  1 gilles  staff   150624  8 Apr 02:32 [
-rw-r--r--  1 gilles  staff  1326576  8 Apr 02:32 bash
-rw-r--r--  1 gilles  staff   151792  8 Apr 02:32 cat
-rw-r--r--  1 gilles  staff   136960  8 Apr 02:32 chmod
-rw-r--r--  1 gilles  staff   152672  8 Apr 02:32 cp
-rw-r--r--  1 gilles  staff  1153456  8 Apr 02:32 csh
-rw-r--r--  1 gilles  staff   307296  8 Apr 02:32 dash
-rw-r--r--  1 gilles  staff   168112  8 Apr 02:32 date
-rwxr-xr-x  1 gilles  staff   185088  8 Apr 02:32 dd
-rw-r--r--  1 gilles  staff   151264  8 Apr 02:32 df
-rw-r--r--  1 gilles  staff   150336  8 Apr 02:32 echo
-rw-r--r--  1 gilles  staff   235296  8 Apr 02:32 ed
-rw-r--r--  1 gilles  staff   151008  8 Apr 02:32 expr
-rw-r--r--  1 gilles  staff   150336  8 Apr 02:32 hostname
-rw-r--r--  1 gilles  staff   150736  8 Apr 02:32 kill
-rw-r--r--  1 gilles  staff  2599008  8 Apr 02:32 ksh
-rw-r--r--  1 gilles  staff   360752  8 Apr 02:32 launchctl
-rw-r--r--  1 gilles  staff   134736  8 Apr 02:32 link
-rw-r--r--  1 gilles  staff   134736  8 Apr 02:32 ln
-rw-r--r--  1 gilles  staff   187040  8 Apr 02:32 ls
-rw-r--r--  1 gilles  staff   134128  8 Apr 02:32 mkdir
-rw-r--r--  1 gilles  staff   135552  8 Apr 02:32 mv
-rw-r--r--  1 gilles  staff   320688  8 Apr 02:32 pax
-rw-r--r--  1 gilles  staff   203504  8 Apr 02:32 ps
-rw-r--r--  1 gilles  staff   150320  8 Apr 02:32 pwd
-rw-r--r--  1 gilles  staff   135408  8 Apr 02:32 rm
-r-xr-xr-x  1 gilles  staff   133808  8 Apr 02:32 rmdir
-rw-r--r--  1 gilles  staff   150384  8 Apr 02:32 sh
-rw-r--r--  1 gilles  staff   150288  8 Apr 02:32 sleep
-rw-r--r--  1 gilles  staff   149936  8 Apr 02:32 sync
-rwxr-xr-x  1 gilles  staff  1153456  8 Apr 02:32 tcsh
-rw-r--r--  1 gilles  staff   150624  8 Apr 02:32 test
-rwxr-xr-x  1 gilles  staff   135408  8 Apr 02:32 unlink
-rw-r--r--  1 gilles  staff   150208  8 Apr 02:32 wait4path
-rw-r--r--  1 gilles  staff  1377760  8 Apr 02:32 zsh
$
```


### Validating snapshots health

Sometimes you want to validate that a backup is restorable without actually restoring it to disk.

The `plakar check` requests data from the repository,
recomputes cryptographic checksums,
and discards the data to effectively simulate a recovery without requiring restore space.

```sh
$ plakar check 744d45ed && echo "backup ok"
backup ok
```


### Repository cloning

Repositories may be cloned into exact copies,
a feature useful to replicate backups:

```sh
$ plakar ls
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin

$ ls -l /tmp/plakar
ls: /tmp/plakar: No such file or directory

$ plakar clone to /tmp/plakar

$ plakar on /tmp/plakar ls
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin
$
```

The clone repository possesses the same configuration,
passphrase if encrypted,
and data as the source repository *at time of cloning*.



### Repositories synchronization

Snapshots can be passed from a repository to another through a process of synchronization.
Synchronization works for clones that share the same configuration,
but it also works between repositories which aren't clones by transparently transcoding from a configuration to another.

```sh
$ plakar push /bin
$ plakar ls
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin
2024-10-01T14:40:28Z  b6f501f4     12 MB        0s /bin

$ plakar on /tmp/plakar ls
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin

$ plakar sync to /tmp/plakar
$ plakar on /tmp/plakar ls
2024-10-01T13:45:53Z  c3e3d079     12 MB        0s /bin
2024-10-01T13:45:54Z  a081bddb     12 MB        0s /bin
2024-10-01T13:45:55Z  744d45ed     12 MB        0s /bin
2024-10-01T14:40:28Z  b6f501f4     12 MB        0s /bin
$ 
```


### Snapshot ID

Each snapshot is assigned an ID to allow referencing it in subcommands.

To make it easier for humans,
`plakar` uses prefix-based lookups so that the ID does not need to be typed entirely.
Whenever a snapshot ID is expected,
it is possible to provide the first characters and plakar will complete the missing part **as long as the first characters do not resolve to multiple snapshots**.

The following command:

```sh
$ plakar pull 7ffa415c
$
```

can be expressed as:

```sh
$ plakar pull 7ffa
$
```

or even:

```sh
$ plakar pull 7
$
```

because no other snapshot has an ID that begins with `7ffa` or `7`.


### Snapshot pathnames

A lot of commands operate on files within snapshots.

Snapshots provide a filesystem-like interface which allows browsing content using pathnames that are relative to the snapshot ID.
They are expressed as `ID:/pathname`,
as can be seen in this command to list the information regarding `/bin/ls` within snapshot identified by `7f`:

```sh
$ plakar ls 7f:/bin/ls
2022-03-26T07:21:13Z -rwxr-xr-x     root    wheel   187 kB ls
$
```


### UI

It is possible to launch a read-only browser viewer on a repository,
encrypted or not,
using the following command:

```sh
$ plakar ui
launching ui API at http://localhost:40717
```

If launching a browser does not work on your system,
simply use the `-no-spawn` option and point a browser at the displayed URL yourself.
