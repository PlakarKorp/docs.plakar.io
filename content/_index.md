# What's plakar ?

`plakar` is a **free** and [opensource](https://github.com/poolpOrg/plakar) utility to create
**distributed**, **versionned** **backups** with **compression**, **encryption** and data **deduplication**.

With a very clear goal to simplify backups,
it is designed to be **straightforward** to use.
It requires a few secomds to install and only a few minutes to get backups set up and running:
creating a backup is as simple as typing `plakar push` and restoring as simple as typing `plakar pull`.

`plakar` is written in [Golang](https://go.dev),
developed primarily on [macOS](https://www.apple.com/macos/) and [OpenBSD](https://www.OpenBSD.org),
tested on several [Linux](https://fr.wikipedia.org/wiki/Linux) systems,
and should work on most modern Unix-like system.


## License

It is distributed under the OpenBSD license, as follows:

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
and use at your own risks.


## Current state

At this stage of development,
it is not yet suitable for production and should be used for testing purposes.


## Requirements

It requires Go 1.22 or higher.


## Installation

Until a first version is released and packaged,
`plakar` may be installed via two methods.


### Web installer
```sh
curl -s http://plakar.io/install.sh | sh
```

### Go installer
```sh
go install github.com/PlakarLabs/plakar/cmd/plakar@latest
```


## Discussions

Discussions and questions regarding the project can take place at [Github discussions](https://github.com/PlakarLabs/plakar/discussions),
or on the [Discord channel](https://discord.gg/uuegtnF2Q5).
