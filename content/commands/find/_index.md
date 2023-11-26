+++
title = "find"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "locate resources within a repository or a snapshot"
+++

## Description
The `plakar find` command is used to list snapshots containing a specific file or directory, without restoring them.

## Usage

`plakar find [directory|filename]`

## Examples

Searching all files named `passwd` in any snapshot of the repository:

```sh
$ plakar find passwd
2023-08-10T07:34:34Z  9819e614 /private/etc/pam.d/passwd
2023-08-10T07:34:34Z  9819e614 /private/etc/passwd
2023-08-10T07:34:34Z  9819e614 /private/etc/uucp/passwd

```