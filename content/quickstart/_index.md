+++
title = "Quick start"
date = "2025-02-19 21:00:00 +0100"
weight = 1
chapter = false
pre = "<b>1. </b>"
+++


This article will guide you through the creation of your first backup with plakar.
```math
```

## Installing plakar

The first step is to install the software.

At the time of this writing, we do not yet provide packages and **plakar** has to be installed manually:

```tt
$ go install https://github.com/PlakarKorp/plakar@latest
```

This will ensure that dependencies are installed and you should be able to verify the command is properly installed:

```tt
$ plakar version
v0.4.27-alpha
$
```

## Running the local agent

To work efficiently,
**plakar** requires each user to run a local agent that will provide caching among other things.
If the agent is not running,
the **plakar** CLI will operate in degraded mode as a safety net,
but will disallow concurrent commands and won't benefit from caching.

```tt
$ plakar agent
agent started with pid=12539
$
```

The agent can be stopped with the following command:
```tt
$ plakar agent -stop
$
```



## Creating your first local repository


The **plakar** software reads your data,
splits it into smaller chunks that it deduplicates and stores in a **repository**,
a fancy word to designate storage space dedicated to hold these chunks.

A **repository** can be a directory on your local filesystem,
a mountpoint to your NAS,
a remote directory over SFTP,
a bucket on an S3 object store,
or any storage we provide (or you write) a connector for.

Our first repository will be a directory at `/var/backups`:

```tt
$ plakar at /var/backups create
repository passphrase: 
repository passphrase (confirm):
$
```

> Be extra careful when chosing the passphrase: 
> it is the secret protecting your data.
> People with both access to the repository and knowledge of the passphrase can read your backups.
>
> **DO NOT LOSE OR FORGET THE PASSPHRASE:**
> it is not stored anywhere and can't be recovered in case of loss.
> A lost passphrase means the data within the repository can no longer be recovered.

It is also possible to create unencrypted repositories,
should your backups remain local,
in which case the `-no-encryption` option has to be passed at creation:

```tt
$ plakar at /var/backups create -no-encryption
$
```

Note that once a repository is created,
it is no longer possible to change its configuration,
such changes require creating a new repository and performing a synchronization between old and new repository.


## Creating your first local backup


Once the repository is created,
we can do the first backup to it:
```tt
$ plakar at /var/backups backup /private/etc
9abc3294: OK ✓ /private/etc/ftpusers
9abc3294: OK ✓ /private/etc/asl/com.apple.iokit.power
9abc3294: OK ✓ /private/etc/pam.d/screensaver_new_ctk
[...]
9abc3294: OK ✓ /private/etc/apache2
9abc3294: OK ✓ /private/etc
9abc3294: OK ✓ /private
9abc3294: OK ✓ /
backup: created unsigned snapshot 9abc3294 of size 3.1 MB in 72.55875ms
$
```

You can verify that it is properly recorded:

```tt
$ plakar at /var/backups ls
2025-02-19T21:38:16Z   9abc3294    3.1 MB      0s   /private/etc
$
```

Verify the integrity of its content:
```tt
$ plakar at /var/backups check 9abc3294
9abc3294: ✓ /private/etc/afpovertcp.cfg
9abc3294: ✓ /private/etc/apache2/extra/httpd-autoindex.conf
9abc3294: ✓ /private/etc/apache2/extra/httpd-dav.conf
[...]
9abc3294: ✓ /private/etc/xtab
9abc3294: ✓ /private/etc/zshrc
9abc3294: ✓ /private/etc/zshrc_Apple_Terminal
9abc3294: ✓ /private/etc
check: verification of 9abc3294:/private/etc completed successfully
$
```

And restore it to a local directory:
```tt
$ plakar at /var/backups restore -to /tmp/restore 9abc3294
9abc3294: OK ✓ /private/etc/afpovertcp.cfg
9abc3294: OK ✓ /private/etc/apache2/extra/httpd-autoindex.conf
9abc3294: OK ✓ /private/etc/apache2/extra/httpd-dav.conf
[...]
9abc3294: OK ✓ /private/etc/xtab
9abc3294: OK ✓ /private/etc/zprofile
9abc3294: OK ✓ /private/etc/zshrc
9abc3294: OK ✓ /private/etc/zshrc_Apple_Terminal
restore: restoration of 9abc3294:/private/etc at /tmp/restore completed successfully
$ ls -l /tmp/restore
total 1784
-rw-r--r--@  1 gilles  wheel     515 Feb 19 22:47 afpovertcp.cfg
drwxr-xr-x@  9 gilles  wheel     288 Feb 19 22:47 apache2
drwxr-xr-x@ 16 gilles  wheel     512 Feb 19 22:47 asl
[...]
-rw-r--r--@  1 gilles  wheel       0 Feb 19 22:47 xtab
-r--r--r--@  1 gilles  wheel     255 Feb 19 22:47 zprofile
-r--r--r--@  1 gilles  wheel    3094 Feb 19 22:47 zshrc
-rw-r--r--@  1 gilles  wheel    9335 Feb 19 22:47 zshrc_Apple_Terminal
$
```


## Digression: one copy is not enough

You've completed a backup, which is great. However, if you'll allow me, I'd like to digress for a moment:

> Literature and empirical studies suggest that the annual probability of data loss at a single site—especially when considering factors like hardware failures, human error, and environmental risks—is typically in the low single-digit percentages. For example, a seminal study by Pinheiro, Weber, and Barroso (2007) titled "Failure Trends in a Large Disk Drive Population" found that hard drive failure rates generally fall in the range of 2% to 4% per year. In practice, when additional risks beyond basic hardware failure (such as accidental deletion or other operational issues) are factored in, many practitioners adopt a conservative estimate of around 5% per year for a single site.

A local backup,
as we just did,
is helpful in case of accidental removal of the original data...
but not so much if the storage is entirely lost.

--- 

Assuming that the annual probability of data loss at a single site is \( p = 0.05 \) (5%).

### For a single set of data

The annual probability of loss is simply:

$$p = 0.05$$

which corresponds to a **1 in 20 chance** of losing the data.
 
### For two copies at distinct sites

With two copies at distinct sites,
data is only lost if both sites lose their copies simultaneously.

If we assume that each site's failure occurs uniformly at random over 365 days. The daily failure probability for a single site is:

$$\frac{p}{365}$$

Thus, the probability that both copies fail on the same day is:

$$\left(\frac{p}{365}\right)^2$$

Since there are 365 days in a year, the annual probability of a simultaneous failure is approximately:

$$365 \times \left(\frac{p}{365}\right)^2 = \frac{p^2}{365}$$

For p=0.05, this becomes:

$$\frac{0.0025}{365} \approx 6.85 \times 10^{-6}$$

which corresponds to roughly a **1 in 145,000 chance** of both copies failing on the same day over the course of a year.


### For three copies at distinct sites

Similarly, the probability that all three copies fail on the same day is:

$$\left(\frac{p}{365}\right)^3$$

Over the year, the probability becomes:

$$365 \times \left(\frac{p}{365}\right)^3 = \frac{p^3}{365^2}$$

For \( p = 0.05 \), this calculates to:

$$\frac{0.000125}{133225} \approx 9.38 \times 10^{-10}$$

or roughly a **1 in 1 billion chance**.

---

These calculations show that while data loss at a single site is a very likely scenario,
the odds reduce drastically with a second copy at a distinct site and become irrelevant with a third copy at a third site.

It is generally recommended to have the live data + 2 off-site copies to fall in the unlikely 1 in a billion chance range.


## Creating a second copy over SFTP

We now have a local repository with a copy of our backups,
but it is done on the same machine,
we're currently at 5% chances of losing data this year if the drive dies !

Let's create another repository on my remote NAS over SFTP !

> SFTP is the Secure File Transfer Protocol that comes with OpenSSH.


This can be done by creating a new repository there,
with its own passphrase:

```tt
$ plakar at sftp://gilles@nas.plakar.io/var/backups create
repository passphrase: 
repository passphrase (confirm):
$
```

We could simply do a new backup to it,
but this might produce different snapshots as data may have changed since the first backup.

Instead,
we can perform a repository synchronization.
A repository synchronization ensures that backups are transfered from a repository to another,
using the recorded data,
and performing necessary decryption and encryption to produce a similar copy:

```tt
$ plakar at /var/backups sync to sftp://gilles@nas.plakar.io/var/backups
peer repository passphrase: 
peer repository passphrase (confirm):
sync: synchronized 1 snapshot
$ plakar at sftp://gilles@nas.plakar.io/var/backups ls
2025-02-19T21:38:16Z   9abc3294    3.1 MB      0s   /private/etc
$
```

We can verify integrity of the snapshot on the second repository:

```tt
$ plakar at sftp://gilles@nas.plakar.io/var/backups check 9abc3294
9abc3294: ✓ /private/etc/afpovertcp.cfg
9abc3294: ✓ /private/etc/apache2/extra/httpd-autoindex.conf
9abc3294: ✓ /private/etc/apache2/extra/httpd-dav.conf
[...]
9abc3294: ✓ /private/etc/xtab
9abc3294: ✓ /private/etc/zshrc
9abc3294: ✓ /private/etc/zshrc_Apple_Terminal
9abc3294: ✓ /private/etc
check: verification of 9abc3294:/private/etc completed successfully
$
```

The probability of losing data this year has now fallen from 5% to 0.00069% (1 in 145,000) !


## Creating a third copy over S3

But what if both my drive died AND the data center hosting my NAS burst in flames ?

Let’s create yet another repository on a remote S3 bucket !

```tt
$ export S3_REPOSITORY_USER=gilles
$ export S3_REPOSITORY_PASSWORD=********
$ plakar at s3://minio.plakar.io:9001/mybackups create
repository passphrase: 
repository passphrase (confirm):
$
```

Let's do another synchronization !

```tt
$ plakar at /var/backups sync to s3://minio.plakar.io:9001/mybackups
peer repository passphrase: 
peer repository passphrase (confirm):
sync: synchronized 1 snapshot
$ plakar at s3://minio.plakar.io:9001/mybackups ls
2025-02-19T21:38:16Z   9abc3294    3.1 MB      0s   /private/etc
$
```


We can verify integrity of the snapshot on the third repository:

```tt
$ plakar at s3://minio.plakar.io:9001/mybackups check 9abc3294
9abc3294: ✓ /private/etc/afpovertcp.cfg
9abc3294: ✓ /private/etc/apache2/extra/httpd-autoindex.conf
9abc3294: ✓ /private/etc/apache2/extra/httpd-dav.conf
[...]
9abc3294: ✓ /private/etc/xtab
9abc3294: ✓ /private/etc/zshrc
9abc3294: ✓ /private/etc/zshrc_Apple_Terminal
9abc3294: ✓ /private/etc
check: verification of 9abc3294:/private/etc completed successfully
$
```

The probability of losing data has now fallen from 0.00069% to 0.0000001% (1 in a billion) !


## A few additional words on synchronization

Repository synchronization is slightly more advanced than what was shown,
and you are encouraged to experiment with it to find the best worflow for your use-case.

This first command locates snapshots that exist in my local repository but not in the remote one,
then sends them over:

```tt
$ plakar at /var/backups sync to s3://minio.plakar.io:9001/mybackups
```

This second command locates snapshots that exist in the remote repository but not in the local one to bring them over:

```tt
$ plakar at /var/backups sync from s3://minio.plakar.io:9001/mybackups
```

And this last command does it both ways,
pushing to the remote repositories snapshots that exist locally and are missing,
but also fetching locally snapshots that only exist remotely:

```tt
$ plakar at /var/backups sync with s3://minio.plakar.io:9001/mybackups
```

In addition,
all these commands support passing snapshot identifiers and various options to perform partial synchronizations,
only exchanging snapshots that match certain criterias.
More information can be found in the [documentation](/commands/sync/).


## Automating backup and synchronization

TBD

## Setting up monitoring and alerting

TBD
