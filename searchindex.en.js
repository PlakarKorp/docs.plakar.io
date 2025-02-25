var relearn_searchindex = [
  {
    "breadcrumb": "docs.plakar.io",
    "content": "Quickstart Create a repository Backups are stored in repositories, so before you can create your first snapshots you need to create a destination repository that will host them.\nFor the purpose of this tutorial, the repository will not be encrypted to avoid being prompted for a passphrase on each command. For encrypted repositories, simply drop the -no-encryption option and things will work exactly the same:\n$ plakar create -no-encryption $ When no path is provided, the repository is created in ~/.plakar. It is possible to create it elsewhere, in which case the path has to be provided on the command line as such:\n$ plakar on /tmp/plakar create -no-encryption $ Once a repository is created, there are MANY operations that can be done upon it.\nCreating snapshots First of all, backups can be stored in a repository by creating snapshots:\n$ plakar backup /bin $ plakar backup /bin $ plakar backup /bin $ The backup command will scan /bin and store content in the repository, performing deduplication to avoid storing redundant data: the second and third backups are much faster and do not cause the repository to grow much as they only record structure and metadata information.\nThe snapshots are completely independent, it is possible to delete the first one without affecting the two others even though they relied on the same deduplicated data.\nListing snapshots The content of a repository can be listed with ls:\n$ plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin $ The output above shows the three snapshots pushed above as well as a few information regarding them.\nRestoring snapshots Any snapshot can be restored with the restore command:\n$ plakar restore 744d45ed $ The command above recreates the structure of the snapshot, in this case a bin directory filled with underlying files:\n$ ls -l bin/ total 25072 -rw-r--r-- 1 gilles staff 150624 8 Apr 02:32 [ -rw-r--r-- 1 gilles staff 1326576 8 Apr 02:32 bash -rw-r--r-- 1 gilles staff 151792 8 Apr 02:32 cat -rw-r--r-- 1 gilles staff 136960 8 Apr 02:32 chmod -rw-r--r-- 1 gilles staff 152672 8 Apr 02:32 cp -rw-r--r-- 1 gilles staff 1153456 8 Apr 02:32 csh -rw-r--r-- 1 gilles staff 307296 8 Apr 02:32 dash -rw-r--r-- 1 gilles staff 168112 8 Apr 02:32 date -rwxr-xr-x 1 gilles staff 185088 8 Apr 02:32 dd -rw-r--r-- 1 gilles staff 151264 8 Apr 02:32 df -rw-r--r-- 1 gilles staff 150336 8 Apr 02:32 echo -rw-r--r-- 1 gilles staff 235296 8 Apr 02:32 ed -rw-r--r-- 1 gilles staff 151008 8 Apr 02:32 expr -rw-r--r-- 1 gilles staff 150336 8 Apr 02:32 hostname -rw-r--r-- 1 gilles staff 150736 8 Apr 02:32 kill -rw-r--r-- 1 gilles staff 2599008 8 Apr 02:32 ksh -rw-r--r-- 1 gilles staff 360752 8 Apr 02:32 launchctl -rw-r--r-- 1 gilles staff 134736 8 Apr 02:32 link -rw-r--r-- 1 gilles staff 134736 8 Apr 02:32 ln -rw-r--r-- 1 gilles staff 187040 8 Apr 02:32 ls -rw-r--r-- 1 gilles staff 134128 8 Apr 02:32 mkdir -rw-r--r-- 1 gilles staff 135552 8 Apr 02:32 mv -rw-r--r-- 1 gilles staff 320688 8 Apr 02:32 pax -rw-r--r-- 1 gilles staff 203504 8 Apr 02:32 ps -rw-r--r-- 1 gilles staff 150320 8 Apr 02:32 pwd -rw-r--r-- 1 gilles staff 135408 8 Apr 02:32 rm -r-xr-xr-x 1 gilles staff 133808 8 Apr 02:32 rmdir -rw-r--r-- 1 gilles staff 150384 8 Apr 02:32 sh -rw-r--r-- 1 gilles staff 150288 8 Apr 02:32 sleep -rw-r--r-- 1 gilles staff 149936 8 Apr 02:32 sync -rwxr-xr-x 1 gilles staff 1153456 8 Apr 02:32 tcsh -rw-r--r-- 1 gilles staff 150624 8 Apr 02:32 test -rwxr-xr-x 1 gilles staff 135408 8 Apr 02:32 unlink -rw-r--r-- 1 gilles staff 150208 8 Apr 02:32 wait4path -rw-r--r-- 1 gilles staff 1377760 8 Apr 02:32 zsh $ Verifying snapshots health Sometimes you want to validate that a backup is restorable without actually restoring it to disk.\nThe plakar verify requests data from the repository, recomputes cryptographic checksums, and discards the data to effectively simulate a recovery without requiring restore space.\n$ plakar verify 744d45ed \u0026\u0026 echo \"backup ok\" backup ok Repository cloning Repositories may be cloned into exact copies, a feature useful to replicate backups:\n$ plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin $ ls -l /tmp/plakar ls: /tmp/plakar: No such file or directory $ plakar clone to /tmp/plakar $ plakar on /tmp/plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin $ The clone repository possesses the same configuration, passphrase if encrypted, and data as the source repository at time of cloning.\nRepositories synchronization Snapshots can be passed from a repository to another through a process of synchronization. Synchronization works for clones that share the same configuration, but it also works between repositories which aren’t clones by transparently transcoding from a configuration to another.\n$ plakar backup /bin $ plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin 2024-10-01T14:40:28Z b6f501f4 12 MB 0s /bin $ plakar on /tmp/plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin $ plakar sync to /tmp/plakar $ plakar on /tmp/plakar ls 2024-10-01T13:45:53Z c3e3d079 12 MB 0s /bin 2024-10-01T13:45:54Z a081bddb 12 MB 0s /bin 2024-10-01T13:45:55Z 744d45ed 12 MB 0s /bin 2024-10-01T14:40:28Z b6f501f4 12 MB 0s /bin $ Snapshot ID Each snapshot is assigned an ID to allow referencing it in subcommands.\nTo make it easier for humans, plakar uses prefix-based lookups so that the ID does not need to be typed entirely. Whenever a snapshot ID is expected, it is possible to provide the first characters and plakar will complete the missing part as long as the first characters do not resolve to multiple snapshots.\nThe following command:\n$ plakar restore 7ffa415c $ can be expressed as:\n$ plakar restore 7ffa $ or even:\n$ plakar restore 7 $ because no other snapshot has an ID that begins with 7ffa or 7.\nSnapshot pathnames A lot of commands operate on files within snapshots.\nSnapshots provide a filesystem-like interface which allows browsing content using pathnames that are relative to the snapshot ID. They are expressed as ID:/pathname, as can be seen in this command to list the information regarding /bin/ls within snapshot identified by 7f:\n$ plakar ls 7f:/bin/ls 2022-03-26T07:21:13Z -rwxr-xr-x root wheel 187 kB ls $ UI It is possible to launch a read-only browser viewer on a repository, encrypted or not, using the following command:\n$ plakar ui launching ui API at http://localhost:40717 If launching a browser does not work on your system, simply use the -no-spawn option and point a browser at the displayed URL yourself.",
    "description": "Quickstart Create a repository Backups are stored in repositories, so before you can create your first snapshots you need to create a destination repository that will host them.\nFor the purpose of this tutorial, the repository will not be encrypted to avoid being prompted for a passphrase on each command. For encrypted repositories, simply drop the -no-encryption option and things will work exactly the same:\n$ plakar create -no-encryption $ When no path is provided, the repository is created in ~/.plakar. It is possible to create it elsewhere, in which case the path has to be provided on the command line as such:",
    "tags": [],
    "title": "Quickstart",
    "uri": "/en/quickstart/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io",
    "content": "Concepts This page documents in a very simplified way the concepts used by plakar.\nRepositories At the core of plakar are repositories.\nA repository is a storage unit within which backups are stored. You can have one or many different repositories, some encrypted and others not, each backed by your local filesystem, a database or even a remote server.\nThey should be considered as locations, rather than directories: you point the utility there so it can store snapshots or retrieve data from snapshots.\nThe following command will for example create a repository in /tmp/plakar:\n$ plakar on /tmp/plakar create -no-encryption $ While the following command will list the snapshots that are part of that repository:\n$ plakar on /tmp/foobar ls $ None here as the repository was just created and is empty.\nSnapshots Repositories are useless without backups.\nThe plakar utility creates backups from directories. It scans their content and builds an internal representation of what’s necessary to rebuild an exact copy, both of the filesystem structure and files, then records that representation as a versioned snapshot in a repository:\n$ plakar on /tmp/foobar backup /bin $ plakar on /tmp/foobar ls 2022-04-08T21:38:50Z 21a403b1-b022-40dd-95ad-5b78a90360dd 13 MB /bin $ Snapshots are space efficient as they may contain the same files as other snapshots without having to store their own copies, creating multiple snapshots of the same directory will consume roughly the size a single copy would consume with a little overhead due to snapshot-specific metadata:\n$ plakar on /tmp/foobar backup /bin $ plakar on /tmp/foobar backup /bin $ plakar on /tmp/foobar backup /bin $ plakar on /tmp/foobar backup /bin $ plakar on /tmp/foobar ls 2022-04-08T21:38:50Z 21a403b1-b022-40dd-95ad-5b78a90360dd 13 MB /bin 2022-04-08T21:38:51Z 976ed175-206a-418d-b960-7d0736d41b46 13 MB /bin 2022-04-08T21:38:51Z 8271734e-882c-47b4-812a-5bef3455281c 13 MB /bin 2022-04-08T21:38:52Z 273c9764-eae3-4e4f-8bcd-39538b684b49 13 MB /bin 2022-04-08T21:38:52Z 70e1de7a-e410-4ad4-b441-f4f40977232b 13 MB /bin $ du -sh /tmp/foobar 4.0M /tmp/foobar $ In some situations, such as above, the space consumed will even be smaller than that of a single snapshot as the snapshot may contain duplicate information itself, or may compress well.\nContrarily to incremental backups, snapshots are truly independent one from another and do not assume the existence of any other snapshot. It is possible to compare the differences between a snapshot and any other snapshot, just as it is possible to delete a snapshot without affecting any of the subsequent snapshots:\n$ plakar on /tmp/foobar rm 21a403b1 976ed175 8271734e 273c9764 $ plakar ls 2022-04-08T21:38:52Z 70e1de7a-e410-4ad4-b441-f4f40977232b 13 MB /bin $ plakar on /tmp/foobar restore 70e1de7a:/bin $ ls bin [ csh echo ksh mkdir rm sync zsh bash dash ed launchctl mv rmdir tcsh cat date expr link pax sh test chmod dd hostname ln ps sleep unlink cp df kill ls pwd stty wait4path $ To be continued",
    "description": "Concepts This page documents in a very simplified way the concepts used by plakar.\nRepositories At the core of plakar are repositories.\nA repository is a storage unit within which backups are stored. You can have one or many different repositories, some encrypted and others not, each backed by your local filesystem, a database or even a remote server.\nThey should be considered as locations, rather than directories: you point the utility there so it can store snapshots or retrieve data from snapshots.",
    "tags": [],
    "title": "Concepts",
    "uri": "/en/concepts/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io",
    "content": "List of supported commands backupcreate a snapshot within a repository\ncatconcatenate and print files\nchecksumcheck health of a repository, snapshot or resource\ncleanupcheck health of a repository, snapshot or resource\nclonecreate a clone from an existing repository\ncreatecreate a new snapshots repository\ndiffcompare snapshots, directories and files\nexecrun executable from a snapshot\nfindlocate resources within a repository or a snapshot\nforkduplicate a snapshot with a different snapshot ID\ngzcatconcatenate and print compressed files\ninfodisplay information regarding a repository, a snapshot or a resource\nkeepremove snapshots while retaining the last ones\nlslist snapshots or resources\nmountmount a repository as a FUSE filesystem\nrestorerestore snapshots or resources\nrmremove snapshots from a repository\nshella simple shell\nstdioan stdio server\nsyncsynchronize a repository with snapshots from another repository\ntarballcreate a tarball from a snapshot or part of a snapshot\nuirun a browser viewer on a repository\nverifyverify health of a repository, snapshot or resource",
    "description": "List of supported commands backupcreate a snapshot within a repository\ncatconcatenate and print files\nchecksumcheck health of a repository, snapshot or resource\ncleanupcheck health of a repository, snapshot or resource\nclonecreate a clone from an existing repository\ncreatecreate a new snapshots repository\ndiffcompare snapshots, directories and files\nexecrun executable from a snapshot\nfindlocate resources within a repository or a snapshot\nforkduplicate a snapshot with a different snapshot ID\ngzcatconcatenate and print compressed files",
    "tags": [],
    "title": "Commands",
    "uri": "/en/commands/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io",
    "content": "Join the Plakar community ! As Plakar evolves into both a Community Edition (free and open-source) and Enterprise Edition (with additional features and commercial support), we invite everyone to join our growing community.\nConnect with developers, users, and contributors in real time, share feedback, and stay updated on the latest features.\nWhether you’re using the Community or Enterprise Edition, everyone is welcome!\nJoin our Discord server here!",
    "description": "Join the Plakar community ! As Plakar evolves into both a Community Edition (free and open-source) and Enterprise Edition (with additional features and commercial support), we invite everyone to join our growing community.\nConnect with developers, users, and contributors in real time, share feedback, and stay updated on the latest features.\nWhether you’re using the Community or Enterprise Edition, everyone is welcome!\nJoin our Discord server here!",
    "tags": [],
    "title": "Community",
    "uri": "/en/community/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar backup command is used to create a snapshot of a directory.\nUsage plakar backup \u003c/path/to/directory\u003e\nExamples $ plakar ls $ plakar backup /bin $ plakar backup /bin $ plakar ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin 2023-08-13T08:26:13Z a946463d 13 MB 0s /bin $",
    "description": "create a snapshot within a repository",
    "tags": [],
    "title": "backup",
    "uri": "/en/commands/backup/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description plakar cat reads files from within snapshots and writes to the standard output, similarly to the standard Unix command cat(1), without holding the files in memory or requiring a complete file restore first: it is fast and suitable for large files.\nUsage plakar cat snapshotID:/path/to/file [snapshotID:/path/to/file]\nExamples Using grep to search for the root account in the /private/etc/passwd file of snapshot b3, then using wc to count how many lines are in that file:\n$ plakar cat b3:/private/etc/passwd | grep ^root: root:*:0:0:System Administrator:/var/root:/bin/sh $ plakar cat b3:/private/etc/passwd | wc -l 267",
    "description": "concatenate and print files",
    "tags": [],
    "title": "cat",
    "uri": "/en/commands/cat/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description plakar checksum returns the checksums for files within a snapshot.\nBy default, it computes the checksum as it reads data from the snapshot, without restoring the file or keeping data in memory so it suitable for large files, regardless of the local disk or memory space available.\nWhen the -fast option is provided, it returns the checksum as it was recorded in the snapshot index, allowing to quickly compare checksums but offering no guarantees that the data was not altered if the repository is not trusted.\nUsage plakar checksum snapshotID:/path/to/file\nExamples Requesting the computation of checksums for /private/etc/passwd and /private/etc/group in snapshot 98, followed by a request for the recorded checksums:\n$ plakar checksum 98:/private/etc/passwd 98:/private/etc/group 45e1a370269afcf6bb11ab188ecc193814b9d27a54c75cf0e4f26a0ec869a732 /private/etc/passwd 5f6a031ebf810f336e1bdd3b30b3968eeb1b2209f3e07bc1061120ceb5275912 /private/etc/group $ plakar checksum -fast 98:/private/etc/passwd 98:/private/etc/group 45e1a370269afcf6bb11ab188ecc193814b9d27a54c75cf0e4f26a0ec869a732 /private/etc/passwd 5f6a031ebf810f336e1bdd3b30b3968eeb1b2209f3e07bc1061120ceb5275912 /private/etc/group",
    "description": "check health of a repository, snapshot or resource",
    "tags": [],
    "title": "checksum",
    "uri": "/en/commands/checksum/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description plakar cleanup cleans the repository of any chunk or object no longer referenced in a snapshot.\nThis command is only useful if snapshots are removed from the repository. It scans the chunks and objects in the repository, then checks if at least one snapshot makes use of them. It executes relatively fast but requires locking, so it shouldn’t be called unless necessary and will prevent snapshots to happen during execution.\nUsage plakar cleanup\nExamples Check the size of a ~/.plakar, remove snapshot 973, size has not changed:\n$ du -sh ~/.plakar 957M /Users/gilles/.plakar $ plakar rm 973 $ du -sh ~/.plakar 957M /Users/gilles/.plakar Run plakar cleanup to reclaim any orphan chunk or object, then check size again:\n$ plakar cleanup $ du -sh ~/.plakar 439M /Users/gilles/.plakar",
    "description": "check health of a repository, snapshot or resource",
    "tags": [],
    "title": "cleanup",
    "uri": "/en/commands/cleanup/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar clone command creates an exact copy of an existing repository, matching the same repository UUID, and the same compression and encryption configuration.\nUsage plakar [on source] clone /path/to/destination\nExample Clone the local plakar repository into `/tmp/myclone``:\n% plakar ls 2023-08-10T07:34:34Z 9819e614 3.0 MB 0s /private/etc $ plakar clone /tmp/myclone $ plakar on /tmp/myclone ls 2023-08-10T07:34:34Z 9819e614 3.0 MB 0s /private/etc",
    "description": "create a clone from an existing repository",
    "tags": [],
    "title": "clone",
    "uri": "/en/commands/clone/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar create command creates a new plakar repository.\nBy default, the repository is created in ~/.plakar, with compression and encryption enabled.\nCompression can be disabled with the -no-compression option, but it is advised to leave it enabled: its overhead is insignificant and there’s no point in setting up a deduplicated repository and not using compression in the first place.\nEncryption is also quite cheap however, unlike compression, there are cases where it’s desirable to run a cleartext repository. In such cases, the -no-encryption option can be used.\nUsage plakar [on /path/to/directory] create [-no-encryption] [-no-compression]\nExamples The repository is created with encryption and compression enabled in ~/.plakar by default:\n$ plakar create passphrase: A repository without encryption can be created as such:\n$ plakar create -no-encryption An alternate path may be provided as such:\n$ plakar on ~/plakars/myplakar create -no-encryption",
    "description": "create a new snapshots repository",
    "tags": [],
    "title": "create",
    "uri": "/en/commands/create/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar diff command performs a diff between two snapshots, without restoring them.\nIf provided with two snapshot identifiers, the command will perform an inode diff by checking if permissions, ownership or modification date have changed.\nIf provided with a file argument as third parameter, the command will perform a file diff between the file present in both snapshots without restoring them.\nUsage plakar diff [snapshotID] [snapshotID]\nplakar diff [snapshotID] [snapshotID] /path/to/file\nExamples In this example, two snapshots are compared for inode differences:\n$ plakar diff b3 45 - drwxr-xr-x root wheel 2.9 kB 2021-09-26 20:45:08.587949603 +0000 UTC /private/etc/ + drwxr-xr-x root wheel 2.9 kB 2021-10-06 19:54:55.675866163 +0000 UTC /private/etc/ + -rw-r--r-- root wheel 0 B 2021-10-06 19:54:55.67585958 +0000 UTC /private/etc/bleh In this example, two snapshots have their /private/etc/group file compared:\n$ plakar diff b3 a0 /private/etc/group --- b3bdb2b0-115a-4198-93a4-976edf883eb5:/private/etc/group +++ a0dee33e-568e-4946-9be3-a987f939a351:/private/etc/group @@ -145,4 +145,5 @@ com.apple.access_ssh:*:399: com.apple.access_remote_ae:*:400: _oahd:*:441:_oahd +_foobar:*:442:_foobar",
    "description": "compare snapshots, directories and files",
    "tags": [],
    "title": "diff",
    "uri": "/en/commands/diff/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar exec command runs an executable from the snapshot.\nThis is a helper to avoid having to restore an executable, execute it then remove it. It has several limitations and is only useful to a certain extent, if you know what you’re doing: it can only run scripts if the interpreter is available locally, it can only execute static binaries unless shared libraries are available locally and it can very obviously only execute binaries that the local machine knows how to execute (ie: same operating system and architecture).\nMost people will find this command useless, but it can very rarely prove useful so it stays.\nUsage plakar exec [command args ...]\nExamples Execute the /bin/cat command that was part of the snapshot 31 to display the content of local file /etc/passwd.\n$ plakar exec 31:/bin/cat /etc/passwd |grep ^root root:*:0:0:System Administrator:/var/root:/bin/sh Of course this has the same limitations as if the executable was copied from a remote machine, namely the requirement that the host machine can actually run the executable, and that it doesn’t rely on shared libraries that are unavailable on the host machine.",
    "description": "run executable from a snapshot",
    "tags": [],
    "title": "exec",
    "uri": "/en/commands/exec/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar find command is used to list snapshots containing a specific file or directory, without restoring them.\nUsage plakar find [directory|filename]\nExamples Searching all files named passwd in any snapshot of the repository:\n$ plakar find passwd 2023-08-10T07:34:34Z 9819e614 /private/etc/pam.d/passwd 2023-08-10T07:34:34Z 9819e614 /private/etc/passwd 2023-08-10T07:34:34Z 9819e614 /private/etc/uucp/passwd",
    "description": "locate resources within a repository or a snapshot",
    "tags": [],
    "title": "find",
    "uri": "/en/commands/find/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar fork command is used to create an exact duplicate of a snapshot with a different snapshot ID.\nUsage plakar fork [snapshotID]\nExamples Creating a duplicate for snapshot 23:\n$ plakar ls 2023-08-10T07:34:34Z 23e3f265 3.0 MB 0s /private/etc $ plakar fork 23 $ plakar ls 2023-08-10T07:34:34Z 42c70c03 3.0 MB 0s /private/etc 2023-08-10T07:34:34Z 23e3f265 3.0 MB 0s /private/etc",
    "description": "duplicate a snapshot with a different snapshot ID",
    "tags": [],
    "title": "fork",
    "uri": "/en/commands/fork/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description plakar gzcat reads gzip-compressed files from within snapshots and writes to the standard output, similarly to the standard Unix command gzcat(1), without holding the files in memory or requiring a complete file restore first: it is fast and suitable for large files.\nUsage plakar gzcat snapshotID:/path/to/file.gz [snapshotID:/path/to/file.gz]\nExamples Using grep to search for lines containing mda in the /var/log/maillog.0.gz file of snapshot c5, then using wc to count how many lines are in that file:\n$ plakar gzcat c5:/var/log/maillog.0.gz | grep mda [...] $ plakar gzcat c5:/var/log/maillog.0.gz | wc -l 453",
    "description": "concatenate and print compressed files",
    "tags": [],
    "title": "gzcat",
    "uri": "/en/commands/gzcat/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar info command is used to display information regarding a repository or a particular snapshot.\nUsage plakar info\nplakar info \u003csnapshotID\u003e\nExamples Displaying general information regarding the repository:\n% plakar info RepositoryID: f7f727df-8fcc-4f18-87d8-e83623dd6228 CreationTime: 2023-08-09 14:09:12.079972 +0200 CEST Version: 0.2.1 Encryption: no Compression: gzip Snapshots: 2 Size: 6.0 MB (5994346 bytes) Index Size: 35 kB (35178 bytes) Filesystem Size: 22 kB (22453 bytes) or information regarding a particular snapshot:\n$ plakar info 23e IndexID: 23e3f265-4511-4aa6-842b-f0a10640a188 CreationTime: 2023-08-10 09:34:34.982435 +0200 CEST CreationDuration: 17.138208ms Version: 0.2.1 Hostname: desktop.local Username: gilles CommandLine: plakar on fs://Users/gilles/.plakar push /private/etc OperatingSystem: darwin MachineID: 3657f7dd-c012-53ba-b8e6-73e08d311a6a PublicKey: Tags: Directories: 40 Files: 249 NonRegular: 4 Pathnames: 236 Objects: 212 ObjectsTransferCount: 0 ObjectsTransferSize: 0 B (0 bytes) Chunks: 215 ChunksSize: 2880267 ChunksTransferCount: 0 ChunksTransferSize: 0 B (0 bytes) SnapshotSize: 3.0 MB (2997173 bytes) MappingIndexChecksum: 8418f2cbc0a319271b9d34fea40266c447bdfdb04ad000b837a1e976eb4f46b4 MappingIndexDiskSize: 18 kB (17598 bytes) MappingIndexMemorySize: 51 kB (51252 bytes) FilesystemIndexChecksum: 35a0d888ff66423122994dffa07acce73cf14d4f5d1d33a6f930669ba42b19fe FilesystemIndexDiskSize: 11 kB (11187 bytes) FilesystemIndexMemorySize: 64 kB (63865 bytes)",
    "description": "display information regarding a repository, a snapshot or a resource",
    "tags": [],
    "title": "info",
    "uri": "/en/commands/info/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar keep command is used to keep the latest snapshots\nUsage plakar keep \u003cnumber\u003e\nExamples Listing the snapshots of a directory then keeping only the last 3:\n$ plakar ls 2023-08-10T07:34:34Z 23e3f265 3.0 MB 0s /private/etc 2023-08-10T07:34:34Z 42c70c03 3.0 MB 0s /private/etc 2023-08-13T08:11:45Z b833d6ef 3.0 MB 0s /private/etc 2023-08-13T08:11:46Z 7180902a 3.0 MB 0s /private/etc 2023-08-13T08:11:47Z 4b123f1a 3.0 MB 0s /private/etc 2023-08-13T08:11:47Z 6b8987eb 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z e1a571c6 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z b00c1e5d 3.0 MB 0s /private/etc $ plakar keep 3 $ plakar ls 2023-08-13T08:11:47Z 6b8987eb 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z e1a571c6 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z b00c1e5d 3.0 MB 0s /private/etc $",
    "description": "remove snapshots while retaining the last ones",
    "tags": [],
    "title": "keep",
    "uri": "/en/commands/keep/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar ls command is used to list snapshots or resources within snapshots, without restoring them.\nUsage plakar ls\nplakar ls \u003csnapshotID\u003e\nplakar ls \u003csnapshotID\u003e:/path/to/directory\nplakar ls \u003csnapshotID\u003e:/path/to/filename\nExamples Listing the content of a repository, then the content of a snapshot’s /private/etc directory and displaying the last 3 entries:\n$ plakar ls 2023-08-13T08:11:47Z 6b8987eb 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z e1a571c6 3.0 MB 0s /private/etc 2023-08-13T08:11:48Z b00c1e5d 3.0 MB 0s /private/etc $ plakar ls b0:/private/etc | tail -3 2023-05-12T22:29:20Z -r--r--r-- root wheel 255 B zprofile 2023-05-12T22:29:20Z -r--r--r-- root wheel 3.1 kB zshrc 2023-05-12T22:29:20Z -rw-r--r-- root wheel 9.3 kB zshrc_Apple_Terminal",
    "description": "list snapshots or resources",
    "tags": [],
    "title": "ls",
    "uri": "/en/commands/ls/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar mount command mounts a repository as FUSE filesystem, making it browsable as a regular read-only directory.\nNote that FUSE support was written and only tested on macOS.\nUsage plakar mount /path/to/mountpoint\nExamples Creating a /tmp/myplakar directory, then mounting the default plakar at that endpoint:\n$ mkdir /tmp/myplakar $ plakar mount /tmp/myplakar $",
    "description": "mount a repository as a FUSE filesystem",
    "tags": [],
    "title": "mount",
    "uri": "/en/commands/mount/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar restore command is used to restore all or part of a snapshot.\nUsage plakar restore \u003csnapshotID\u003e\nplakar restore \u003csnapshotID\u003e:/path/to/directory\nplakar restore \u003csnapshotID\u003e:/path/to/filename\nExamples $ plakar restore a0 $ plakar restore a0:/private/etc/openldap $ ls -l private/etc/openldap total 248 -rw-r--r-- 1 gilles staff 116915 6 Oct 22:02 AppleOpenLDAP.plist -rw-r--r-- 1 gilles staff 265 6 Oct 22:02 ldap.conf -rw-r--r-- 1 gilles staff 265 6 Oct 22:02 ldap.conf.default drwxr-xr-x 38 gilles staff 1216 6 Oct 21:48 schema",
    "description": "restore snapshots or resources",
    "tags": [],
    "title": "restore",
    "uri": "/en/commands/restore/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar rm command is used to delete a snapshot.\nUsage plakar rm \u003csnapshotID\u003e\nExamples Removing snapshot a9:\n$ plakar ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin 2023-08-13T08:26:13Z a946463d 13 MB 0s /bin $ plakar rm a9 $ plakar ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin $",
    "description": "remove snapshots from a repository",
    "tags": [],
    "title": "rm",
    "uri": "/en/commands/rm/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar shell command provides a simple command loop inside a repository. It is mostly useful when dealing with encrypted repositories to avoid having to type the passphrase for every command.\nUsage plakar shell\nExamples $ plakar shell /Users/gilles/.plakar\u003e ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin 2023-08-13T08:26:13Z a946463d 13 MB 0s /bin /Users/gilles/.plakar\u003e quit $",
    "description": "a simple shell",
    "tags": [],
    "title": "shell",
    "uri": "/en/commands/shell/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar stdio command runs a plakar server listening on its standard input.\nIts purpose is to ease the tunneling of plakar in different protocols: if plakar stdio can be ran on the other end of a connection, then it can consume the raw data from a socket and the client side can send plakar packets. This is currently used for SSH support, where the client has the other end execute plakar stdio and use the SSH connection as a tunnel.\nThere’s no point in running that command directly.\nUsage plakar stdio\nExamples $ plakar stdio",
    "description": "an stdio server",
    "tags": [],
    "title": "stdio",
    "uri": "/en/commands/stdio/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar sync command synchronizes a target repository with all resources available or with a specific snapshot in the current repository.\nIt can be run on a repository clone, create with plakar clone, or on a different repository in which case it’ll take care of handling compression and encryption transparently so the synchronization works: synchronizing from a cleartext repository to an encrypted repository will encrypt data, synchronizing from an encrypted repository to a cleartext repository will decrypt data, synchronizing from an encrypted repository to another encrypted repository will decrypt and encrypt with the target key, etc…\nThis is useful in situations where a local repository is cleartext and an off-site repository is encrypted.\nUsage plakar sync to \u003crepository\u003e\nplakar sync \u003csnapshotID\u003e to \u003crepository\u003e\nExamples $ plakar ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin $ plakar create /tmp/copy $ plakar sync to /tmp/copy $ plakar on /tmp/copy ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin",
    "description": "synchronize a repository with snapshots from another repository",
    "tags": [],
    "title": "sync",
    "uri": "/en/commands/sync/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The plakar tarball command creates a tarball from a snapshot.\nUsage plakar tarball \u003csnapshotID\u003e\nplakar tarball \u003csnapshotID\u003e:/path/to/directory\nExamples $ plakar ls 2023-08-13T08:26:12Z 227b0536 13 MB 0s /bin 2023-08-13T08:26:13Z a946463d 13 MB 0s /bin $ ls -l [...] -rw-r--r-- 1 gilles staff 4399374 Aug 13 11:03 plakar-2023-08-13T09:03:26Z.tar.gz [...] $ plakar-2023-08-13T09:03:26Z.tar.gz plakar-2023-08-13T09:03:26Z.tar.gz: gzip compressed data, original size modulo 2^32 12938752",
    "description": "create a tarball from a snapshot or part of a snapshot",
    "tags": [],
    "title": "tarball",
    "uri": "/en/commands/tarball/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description The UI subcommand launches a local web server to browse a repository.\nUsage plakar ui\nExamples $ plakar ui launching browser UI at http://localhost:40717 The -no-spawn option can be provided to launch an endpoint where to point a browser without spawning a browser:\n$ plakar ui -no-spawn launching browser UI at http://localhost:40717",
    "description": "run a browser viewer on a repository",
    "tags": [],
    "title": "ui",
    "uri": "/en/commands/ui/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io \u003e  Commands",
    "content": "Description plakar verify performs a health check on snapshots without restoring them to the filesystem.\nBy default, it performs a full check making sure that it can retrieve everything it needs for a full restore, validating that the checksums for every chunk and object match. This check is similar to restoring a snapshot, computing a checksum of the files as they are being restored and removing them once it’s done, but does it in a more efficient way.\nWhen the -fast option is provided, it performs a fast check by asking the repository if it holds the resources needed, but without retrieving them and validating checksums. This check is much faster, doesn’t imply much data transfer, but is only suitable if there’s confidence that the repository is trusted and not corrupted.\nUsage plakar verify snapshotID\nplakar verify snapshotID:/path/to/file\nExamples Performing a verify then a fast verify on snapshot b3:\n$ plakar verify b3 \u0026\u0026 echo ok ok $ plakar verify -fast b3 \u0026\u0026 echo ok ok Performing a verify on a file within snapshot b3:\n$ plakar verify b3:/private/etc/passwd \u0026\u0026 echo ok ok $ plakar verify -fast b3:/private/etc/passwd \u0026\u0026 echo ok ok",
    "description": "verify health of a repository, snapshot or resource",
    "tags": [],
    "title": "verify",
    "uri": "/en/commands/verify/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Categories",
    "uri": "/en/categories/index.html"
  },
  {
    "breadcrumb": "docs.plakar.io",
    "content": "",
    "description": "",
    "tags": [],
    "title": "Tags",
    "uri": "/en/tags/index.html"
  }
]
