# What's plakar ?

`plakar` is a **free** and [opensource](https://github.com/poolpOrg/plakar) utility to create versionned backups with compression,
encryption and data deduplication.

It is designed to be dead simple to use,
requiring only a few minutes to get familiar with most commands.
Creating a backup is as easy as typing `plakar push` and restoring as easy as typing `plakar pull`.

`plakar` is written in [Go](https://go.dev),
developed primarily on [macOS](https://www.apple.com/macos/) and [OpenBSD](https://www.OpenBSD.org),
built and tested on Linux,
and it should work on most modern Unix-like system.


## License

It is distributed under the ISC license, as follows:

```text
Copyright (c) 2021 Gilles Chehade <gilles@poolp.org>

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

Or put simpler:
do whatever you want with is as long as you retain this copyright,
and use at your own risks because it is given as is and I won't be responsible if it blows at your face.


## Versions

At this early stage of development,
it is not suitable for production and should only be used for testing purposes.

It doesn't have a version number assigned yet.


## Requirements

It requires Go 1.16 or higher.


## Installation

```sh
go install github.com/PlakarLabs/plakar/cmd/plakar@latest
```


## Discussions

Discussions and questions regarding the project can take place at [Github discussions](https://github.com/PlakarLabs/plakar/discussions),
or on the [Discord channel](https://discord.gg/uuegtnF2Q5).
