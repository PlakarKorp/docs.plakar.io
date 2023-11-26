+++
title = "keep"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "remove snapshots while retaining the last ones"
+++

## Description

The `plakar keep` command is used to keep the latest snapshots

## Usage

`plakar keep <number>`


## Examples

Listing the snapshots of a directory then keeping only the last 3:

```sh
$ plakar ls
2023-08-10T07:34:34Z  23e3f265    3.0 MB        0s /private/etc
2023-08-10T07:34:34Z  42c70c03    3.0 MB        0s /private/etc
2023-08-13T08:11:45Z  b833d6ef    3.0 MB        0s /private/etc
2023-08-13T08:11:46Z  7180902a    3.0 MB        0s /private/etc
2023-08-13T08:11:47Z  4b123f1a    3.0 MB        0s /private/etc
2023-08-13T08:11:47Z  6b8987eb    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  e1a571c6    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  b00c1e5d    3.0 MB        0s /private/etc
$ plakar keep 3
$ plakar ls
2023-08-13T08:11:47Z  6b8987eb    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  e1a571c6    3.0 MB        0s /private/etc
2023-08-13T08:11:48Z  b00c1e5d    3.0 MB        0s /private/etc
$ 
```