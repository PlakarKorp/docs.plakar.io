+++
title = "info"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "display informations regarding a repository, a snapshot or a resource"
+++

## Description

The `plakar info` command is used to display informations regarding a repository or a particular snapshot.

## Usage

`plakar info`

`plakar info <snapshotID>`

## Examples

Displaying general informations regarding the repository:

```sh
% plakar info
RepositoryID: f7f727df-8fcc-4f18-87d8-e83623dd6228
CreationTime: 2023-08-09 14:09:12.079972 +0200 CEST
Version: 0.2.1
Encryption: no
Compression: gzip
Snapshots: 2
Size: 6.0 MB (5994346 bytes)
Index Size: 35 kB (35178 bytes)
Filesystem Size: 22 kB (22453 bytes)
```

or informations regarding a particular snapshot:

```sh
$ plakar info 23e
IndexID: 23e3f265-4511-4aa6-842b-f0a10640a188
CreationTime: 2023-08-10 09:34:34.982435 +0200 CEST
CreationDuration: 17.138208ms
Version: 0.2.1
Hostname: desktop.local
Username: gilles
CommandLine: plakar on fs://Users/gilles/.plakar push /private/etc
OperatingSystem: darwin
MachineID: 3657f7dd-c012-53ba-b8e6-73e08d311a6a
PublicKey: 
Tags: 
Directories: 40
Files: 249
NonRegular: 4
Pathnames: 236
Objects: 212
ObjectsTransferCount: 0
ObjectsTransferSize: 0 B (0 bytes)
Chunks: 215
ChunksSize: 2880267
ChunksTransferCount: 0
ChunksTransferSize: 0 B (0 bytes)
SnapshotSize: 3.0 MB (2997173 bytes)
MappingIndexChecksum: 8418f2cbc0a319271b9d34fea40266c447bdfdb04ad000b837a1e976eb4f46b4
MappingIndexDiskSize: 18 kB (17598 bytes)
MappingIndexMemorySize: 51 kB (51252 bytes)
FilesystemIndexChecksum: 35a0d888ff66423122994dffa07acce73cf14d4f5d1d33a6f930669ba42b19fe
FilesystemIndexDiskSize: 11 kB (11187 bytes)
FilesystemIndexMemorySize: 64 kB (63865 bytes)
```