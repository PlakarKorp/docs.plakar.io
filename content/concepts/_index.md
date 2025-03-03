+++
title = "Concepts"
date = 2022-03-13T23:27:47+01:00
weight = 2
chapter = false
pre = "<b>2. </b>"
+++

## Concepts

This page documents in a very simplified way the concepts used by plakar.


### Repositories

At the core of `plakar` are backup repositories.

A backup repository is a storage unit within which backups are stored.
You can have one or many different repositories,
some encrypted and others not,
synchronized one with each other or not,
and each backed by a local filesystem,
a mounted filesystem,
an object storage or even a remote server.

They should be considered as locations,
rather than directories:
you point the utility there so it can store snapshots or retrieve data from snapshots.

The following command will for example create a repository in `/tmp/plakar`:
```sh
$ plakar at /tmp/plakar create -no-encryption
$
```

While the following command will list the snapshots that are part of that repository:

```sh
$ plakar at /tmp/foobar ls
$
```

None here as the repository was just created and is empty.


### Snapshots

Repositories are useless without backups.

The `plakar` utility creates backups from directories.
It scans their content and builds an internal representation of what's necessary to rebuild an exact copy,
both of the filesystem structure and files, 
then records that representation as a versioned snapshot in a repository:

```sh
$ plakar at /tmp/foobar backup /bin            
$ plakar at /tmp/foobar ls
2022-04-08T21:38:50Z  21a403b1-b022-40dd-95ad-5b78a90360dd     13 MB /bin
$
```

Snapshots are space efficient as they may contain the same files as other snapshots without having to store their own copies,
creating multiple snapshots of the same directory will consume roughly the size a single copy would consume with a little overhead due to snapshot-specific metadata:

```sh
$ plakar at /tmp/foobar backup /bin
$ plakar at /tmp/foobar backup /bin
$ plakar at /tmp/foobar backup /bin
$ plakar at /tmp/foobar backup /bin
$ plakar at /tmp/foobar ls
2022-04-08T21:38:50Z  21a403b1-b022-40dd-95ad-5b78a90360dd     13 MB /bin
2022-04-08T21:38:51Z  976ed175-206a-418d-b960-7d0736d41b46     13 MB /bin
2022-04-08T21:38:51Z  8271734e-882c-47b4-812a-5bef3455281c     13 MB /bin
2022-04-08T21:38:52Z  273c9764-eae3-4e4f-8bcd-39538b684b49     13 MB /bin
2022-04-08T21:38:52Z  70e1de7a-e410-4ad4-b441-f4f40977232b     13 MB /bin
$ du -sh /tmp/foobar
4.0M    /tmp/foobar
$
```

In some situations,
such as above,
the space consumed will even be smaller than that of a single snapshot as the snapshot may contain duplicate information itself,
or may compress well.


Contrarily to incremental backups,
snapshots are truly independent one from another and do not assume the existence of any other snapshot.
It is possible to compare the differences between a snapshot and any other snapshot,
just as it is possible to delete a snapshot without affecting any of the subsequent snapshots:

```sh
$ plakar at /tmp/foobar rm 21a403b1 976ed175 8271734e 273c9764
$ plakar at
2022-04-08T21:38:52Z  70e1de7a-e410-4ad4-b441-f4f40977232b     13 MB /bin
$ plakar at /tmp/foobar restore 70e1de7a:/bin
$ ls bin
[               csh             echo            ksh             mkdir           rm              sync            zsh
bash            dash            ed              launchctl       mv              rmdir           tcsh
cat             date            expr            link            pax             sh              test
chmod           dd              hostname        ln              ps              sleep           unlink
cp              df              kill            ls              pwd             stty            wait4path
$
```
