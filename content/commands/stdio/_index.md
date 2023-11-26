+++
title = "stdio"
date = 2022-03-13T23:27:47+01:00
weight = 5
chapter = false
description = "an stdio server"
+++

## Description

The `plakar stdio` command runs a plakar server listening on its standard input.

Its purpose is to ease the tunneling of `plakar` in different protocols:
if `plakar stdio` can be ran on the other end of a connection,
then it can consume the raw data from a socket and the client side can send plakar packets.
This is currently used for SSH support,
where the client has the other end execute `plakar stdio` and use the SSH connection as a tunnel.

There's no point in running that command directly.

## Usage

`plakar stdio`

## Examples

```sh
$ plakar stdio
```
