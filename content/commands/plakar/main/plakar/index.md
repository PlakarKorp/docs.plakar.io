---
date: "2025-06-30T15:46:51Z"
title: plakar
summary: "effortless backups"
---
<div class="head" role="doc-pageheader" aria-label="Manual header
  line"><span class="head-ltitle">PLAKAR(1)</span>
  <span class="head-vol">General Commands Manual</span>
  <span class="head-rtitle">PLAKAR(1)</span></div>
<main class="manual-text">
<section class="Sh">
<h2 class="Sh" id="NAME"><a class="permalink" href="#NAME">NAME</a></h2>
<p class="Pp"><code class="Nm">plakar</code> &#x2014;
    <span class="Nd" role="doc-subtitle">effortless backups</span></p>
</section>
<section class="Sh">
<h2 class="Sh" id="SYNOPSIS"><a class="permalink" href="#SYNOPSIS">SYNOPSIS</a></h2>
<table class="Nm">
  <tr>
    <td><code class="Nm">plakar</code></td>
    <td>[<code class="Fl">-config</code> <var class="Ar">path</var>]
      [<code class="Fl">-cpu</code> <var class="Ar">number</var>]
      [<code class="Fl">-hostname</code> <var class="Ar">name</var>]
      [<code class="Fl">-keyfile</code> <var class="Ar">path</var>]
      [<code class="Fl">-no-agent</code>] [<code class="Fl">-quiet</code>]
      [<code class="Fl">-trace</code> <var class="Ar">what</var>]
      [<code class="Fl">-username</code> <var class="Ar">name</var>]
      [<code class="Cm">at</code> <var class="Ar">repository</var>]
      <var class="Ar">subcommand ...</var></td>
  </tr>
</table>
</section>
<section class="Sh">
<h2 class="Sh" id="DESCRIPTION"><a class="permalink" href="#DESCRIPTION">DESCRIPTION</a></h2>
<p class="Pp"><code class="Nm">plakar</code> is a tool to create distributed,
    versioned backups with compression, encryption and data deduplication.</p>
<p class="Pp">By default, <code class="Nm">plakar</code> operates on the
    repository at <span class="Pa">~/.plakar</span>. This can be changed either
    by using the <code class="Cm">at</code> keyword or by setting a default
    repository using
    <a class="Xr" href="../plakar-config/" aria-label="plakar-config, section
    1">plakar-config(1)</a>.</p>
<p class="Pp">The following options are available:</p>
<dl class="Bl-tag">
  <dt id="config"><a class="permalink" href="#config"><code class="Fl">-config</code></a>
    <var class="Ar">path</var></dt>
  <dd>Use the configuration at <var class="Ar">path</var>.</dd>
  <dt id="cpu"><a class="permalink" href="#cpu"><code class="Fl">-cpu</code></a>
    <var class="Ar">number</var></dt>
  <dd>Limit the number of parallelism that <code class="Nm">plakar</code> uses
      to <var class="Ar">number</var>. By default it's the number of online
      CPUs.</dd>
  <dt id="hostname"><a class="permalink" href="#hostname"><code class="Fl">-hostname</code></a>
    <var class="Ar">name</var></dt>
  <dd>Change the hostname used for backups. Defaults to the current
    hostname.</dd>
  <dt id="keyfile"><a class="permalink" href="#keyfile"><code class="Fl">-keyfile</code></a>
    <var class="Ar">path</var></dt>
  <dd>Use the passphrase from the key file at <var class="Ar">path</var> instead
      of prompting to unlock.</dd>
  <dt id="no-agent"><a class="permalink" href="#no-agent"><code class="Fl">-no-agent</code></a></dt>
  <dd>Run without attempting to connect to the agent.</dd>
  <dt id="quiet"><a class="permalink" href="#quiet"><code class="Fl">-quiet</code></a></dt>
  <dd>Disable all output except for errors.</dd>
  <dt id="trace"><a class="permalink" href="#trace"><code class="Fl">-trace</code></a>
    <var class="Ar">what</var></dt>
  <dd>Display trace logs. <var class="Ar">what</var> is a comma-separated series
      of keywords to enable the trace logs for different subsystems:
      <code class="Cm">all</code>, <code class="Cm">trace</code>,
      <code class="Cm">repository</code>, <code class="Cm">snapshot</code>
      <span class="No">and</span> <code class="Cm">server</code>.</dd>
  <dt id="username"><a class="permalink" href="#username"><code class="Fl">-username</code></a>
    <var class="Ar">name</var></dt>
  <dd>Change the username used for backups. Defaults to the current user
    name.</dd>
  <dt id="at"><a class="permalink" href="#at"><code class="Cm">at</code></a>
    <var class="Ar">repository</var></dt>
  <dd>Operate on the given <var class="Ar">repository</var>. It could be a path,
      an URI, or a label in the form &#x201C;@<var class="Ar">name</var>&#x201D;
      to reference a configuration created with
      <a class="Xr" href="../plakar-config/" aria-label="plakar-config, section
      1">plakar-config(1)</a>.</dd>
</dl>
<p class="Pp">The following commands are available:</p>
<p class="Pp"></p>
<dl class="Bl-tag Bl-compact">
  <dt id="agent"><a class="permalink" href="#agent"><code class="Cm">agent</code></a></dt>
  <dd>Run the plakar agent, documented in
      <a class="Xr" href="../plakar-agent/" aria-label="plakar-agent, section
      1">plakar-agent(1)</a>.</dd>
  <dt id="archive"><a class="permalink" href="#archive"><code class="Cm">archive</code></a></dt>
  <dd>Create an archive from a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-archive/" aria-label="plakar-archive,
      section 1">plakar-archive(1)</a>.</dd>
  <dt id="backup"><a class="permalink" href="#backup"><code class="Cm">backup</code></a></dt>
  <dd>Create a new snapshot, documented in
      <a class="Xr" href="../plakar-backup/" aria-label="plakar-backup, section
      1">plakar-backup(1)</a>.</dd>
  <dt id="cat"><a class="permalink" href="#cat"><code class="Cm">cat</code></a></dt>
  <dd>Display file contents from a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-cat/" aria-label="plakar-cat, section
      1">plakar-cat(1)</a>.</dd>
  <dt id="check"><a class="permalink" href="#check"><code class="Cm">check</code></a></dt>
  <dd>Check data integrity in a Plakar repository, documented in
      <a class="Xr" href="../plakar-check/" aria-label="plakar-check, section
      1">plakar-check(1)</a>.</dd>
  <dt id="clone"><a class="permalink" href="#clone"><code class="Cm">clone</code></a></dt>
  <dd>Clone a Plakar repository to a new location, documented in
      <a class="Xr" href="../plakar-clone/" aria-label="plakar-clone, section
      1">plakar-clone(1)</a>.</dd>
  <dt id="create"><a class="permalink" href="#create"><code class="Cm">create</code></a></dt>
  <dd>Create a new Plakar repository, documented in
      <a class="Xr" href="../plakar-create/" aria-label="plakar-create, section
      1">plakar-create(1)</a>.</dd>
  <dt id="destination"><a class="permalink" href="#destination"><code class="Cm">destination</code></a></dt>
  <dd>Manage Plakar restore destination configuration, documented in
      <a class="Xr" href="../plakar-destination/" aria-label="plakar-destination,
      section 1">plakar-destination(1)</a>.</dd>
  <dt id="diff"><a class="permalink" href="#diff"><code class="Cm">diff</code></a></dt>
  <dd>Show differences between files in a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-diff/" aria-label="plakar-diff, section
      1">plakar-diff(1)</a>.</dd>
  <dt id="digest"><a class="permalink" href="#digest"><code class="Cm">digest</code></a></dt>
  <dd>Compute digests for files in a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-digest/" aria-label="plakar-digest, section
      1">plakar-digest(1)</a>.</dd>
  <dt id="help"><a class="permalink" href="#help"><code class="Cm">help</code></a></dt>
  <dd>Show this manpage and the ones for the subcommands.</dd>
  <dt id="info"><a class="permalink" href="#info"><code class="Cm">info</code></a></dt>
  <dd>Display detailed information about internal structures, documented in
      <a class="Xr" href="../plakar-info/" aria-label="plakar-info, section
      1">plakar-info(1)</a>.</dd>
  <dt id="locate"><a class="permalink" href="#locate"><code class="Cm">locate</code></a></dt>
  <dd>Find filenames in a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-locate/" aria-label="plakar-locate, section
      1">plakar-locate(1)</a>.</dd>
  <dt id="ls"><a class="permalink" href="#ls"><code class="Cm">ls</code></a></dt>
  <dd>List snapshots and their contents in a Plakar repository, documented in
      <a class="Xr" href="../plakar-ls/" aria-label="plakar-ls, section
      1">plakar-ls(1)</a>.</dd>
  <dt id="maintenance"><a class="permalink" href="#maintenance"><code class="Cm">maintenance</code></a></dt>
  <dd>Remove unused data from a Plakar repository, documented in
      <a class="Xr" href="../plakar-maintenance/" aria-label="plakar-maintenance,
      section 1">plakar-maintenance(1)</a>.</dd>
  <dt id="mount"><a class="permalink" href="#mount"><code class="Cm">mount</code></a></dt>
  <dd>Mount Plakar snapshots as read-only filesystem, documented in
      <a class="Xr" href="../plakar-mount/" aria-label="plakar-mount, section
      1">plakar-mount(1)</a>.</dd>
  <dt id="restore"><a class="permalink" href="#restore"><code class="Cm">restore</code></a></dt>
  <dd>Restore files from a Plakar snapshot, documented in
      <a class="Xr" href="../plakar-restore/" aria-label="plakar-restore,
      section 1">plakar-restore(1)</a>.</dd>
  <dt id="rm"><a class="permalink" href="#rm"><code class="Cm">rm</code></a></dt>
  <dd>Remove snapshots from a Plakar repository, documented in
      <a class="Xr" href="../plakar-rm/" aria-label="plakar-rm, section
      1">plakar-rm(1)</a>.</dd>
  <dt id="server"><a class="permalink" href="#server"><code class="Cm">server</code></a></dt>
  <dd>Start a Plakar server, documented in
      <a class="Xr" href="../plakar-server/" aria-label="plakar-server, section
      1">plakar-server(1)</a>.</dd>
  <dt id="source"><a class="permalink" href="#source"><code class="Cm">source</code></a></dt>
  <dd>Manage Plakar backup source configuration, documented in
      <a class="Xr" href="../plakar-source/" aria-label="plakar-source, section
      1">plakar-source(1)</a>.</dd>
  <dt id="store"><a class="permalink" href="#store"><code class="Cm">store</code></a></dt>
  <dd>Manage Plakar store configurations, documented in
      <a class="Xr" href="../plakar-store/" aria-label="plakar-store, section
      1">plakar-store(1)</a>.</dd>
  <dt id="sync"><a class="permalink" href="#sync"><code class="Cm">sync</code></a></dt>
  <dd>Synchronize sanpshots between Plakar repositories, documented in
      <a class="Xr" href="../plakar-sync/" aria-label="plakar-sync, section
      1">plakar-sync(1)</a>.</dd>
  <dt id="ui"><a class="permalink" href="#ui"><code class="Cm">ui</code></a></dt>
  <dd>Serve the Plakar web user interface, documented in
      <a class="Xr" href="../plakar-ui/" aria-label="plakar-ui, section
      1">plakar-ui(1)</a>.</dd>
  <dt id="version"><a class="permalink" href="#version"><code class="Cm">version</code></a></dt>
  <dd>Display the current Plakar version, documented in
      <a class="Xr" href="../plakar-version/" aria-label="plakar-version,
      section 1">plakar-version(1)</a>.</dd>
</dl>
</section>
<section class="Sh">
<h2 class="Sh" id="ENVIRONMENT"><a class="permalink" href="#ENVIRONMENT">ENVIRONMENT</a></h2>
<dl class="Bl-tag">
  <dt id="PLAKAR_PASSPHRASE"><a class="permalink" href="#PLAKAR_PASSPHRASE"><code class="Ev">PLAKAR_PASSPHRASE</code></a></dt>
  <dd>Passphrase to unlock the repository, overrides the one from the
      configuration. If set, <code class="Nm">plakar</code> won't prompt to
      unlock.</dd>
  <dt id="PLAKAR_REPOSITORY"><a class="permalink" href="#PLAKAR_REPOSITORY"><code class="Ev">PLAKAR_REPOSITORY</code></a></dt>
  <dd>Path to the default repository, overrides the configuration set with
      <code class="Cm">plakar config repository default</code>.</dd>
</dl>
</section>
<section class="Sh">
<h2 class="Sh" id="FILES"><a class="permalink" href="#FILES">FILES</a></h2>
<dl class="Bl-tag">
  <dt><span class="Pa">~/.cache/plakar and</span>
    <span class="Pa">~/.cache/plakar-agentless</span></dt>
  <dd>Plakar cache directories.</dd>
  <dt><span class="Pa">~/.config/plakar/plakar.yml</span></dt>
  <dd>Default configuration file.</dd>
  <dt><span class="Pa">~/.plakar</span></dt>
  <dd>Default repository location.</dd>
</dl>
</section>
<section class="Sh">
<h2 class="Sh" id="EXAMPLES"><a class="permalink" href="#EXAMPLES">EXAMPLES</a></h2>
<p class="Pp">Create an encrypted repository at the default location:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar create</pre>
</div>
<p class="Pp">Create an encrypted repository on AWS S3:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar config repository create mys3bucket
$ plakar config repository set mys3bucket location \
	s3://s3.eu-west-3.amazonaws.com/backups
$ plakar config repository set mys3bucket access_key &quot;access_key&quot;
$ plakar config repository set mys3bucket secret_access_key &quot;secret_key&quot;
$ plakar at @mys3bucket create</pre>
</div>
<p class="Pp">Set the &#x201C;mys3bucket&#x201D; repository just created as the
    default one used by <code class="Nm">plakar</code>:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar config repository default mys3bucket</pre>
</div>
<p class="Pp">Create a snapshot of the current directory:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar backup</pre>
</div>
<p class="Pp">List the snapshots:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar ls</pre>
</div>
<p class="Pp">Restore the file &#x201C;notes.md&#x201D; in the current directory
    from the snapshot with id &#x201C;abcd&#x201D;:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar restore -to . abcd:notes.md</pre>
</div>
<p class="Pp">Remove snapshots older than a 30 days:</p>
<div class="Bd Pp Bd-indent Li">
<pre>$ plakar rm -before 30d</pre>
</div>
</section>
</main>
<div class="foot" role="doc-pagefooter" aria-label="Manual footer
  line"><span class="foot-left"></span><span class="foot-date">March 3,
  2025</span> <span class="foot-os">Plakar</span></div>
