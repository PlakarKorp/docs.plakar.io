+++
title = "fork"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "duplicate a snapshot with a different snapshot ID"
+++

## Description
The `plakar fork` command is used to create an exact duplicate of a snapshot with a different snapshot ID.

## Usage

`plakar fork [snapshotID]`

## Examples

Creating a duplicate for snapshot `23`:

```sh
$ plakar ls
2023-08-10T07:34:34Z  23e3f265    3.0 MB        0s /private/etc
$ plakar fork 23
$ plakar ls     
2023-08-10T07:34:34Z  42c70c03    3.0 MB        0s /private/etc
2023-08-10T07:34:34Z  23e3f265    3.0 MB        0s /private/etc
```