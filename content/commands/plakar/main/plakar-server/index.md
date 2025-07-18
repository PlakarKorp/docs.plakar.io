---
date: "2025-07-15T19:14:54Z"
title: plakar-server
summary: "Start a Plakar server"
---
<div class="head" role="doc-pageheader" aria-label="Manual header
  line"><span class="head-ltitle">PLAKAR-SERVER(1)</span>
  <span class="head-vol">General Commands Manual</span>
  <span class="head-rtitle">PLAKAR-SERVER(1)</span></div>
<main class="manual-text">
<section class="Sh">
<h2 class="Sh" id="NAME"><a class="permalink" href="#NAME">NAME</a></h2>
<p class="Pp"><code class="Nm">plakar-server</code> &#x2014;
    <span class="Nd" role="doc-subtitle">Start a Plakar server</span></p>
</section>
<section class="Sh">
<h2 class="Sh" id="SYNOPSIS"><a class="permalink" href="#SYNOPSIS">SYNOPSIS</a></h2>
<table class="Nm">
  <tr>
    <td><code class="Nm">plakar server</code></td>
    <td>[<code class="Fl">-allow-delete</code>] [<code class="Fl">-listen</code>
      <var class="Ar">address</var>]</td>
  </tr>
</table>
</section>
<section class="Sh">
<h2 class="Sh" id="DESCRIPTION"><a class="permalink" href="#DESCRIPTION">DESCRIPTION</a></h2>
<p class="Pp">The <code class="Nm">plakar server</code> command starts a Plakar
    server instance at the provided <var class="Ar">address</var>, allowing
    remote interaction with a Plakar repository over a network.</p>
<p class="Pp">The options are as follows:</p>
<dl class="Bl-tag">
  <dt id="allow-delete"><a class="permalink" href="#allow-delete"><code class="Fl">-allow-delete</code></a></dt>
  <dd>Enable delete operations. By default, delete operations are disabled to
      prevent accidental data loss.</dd>
  <dt id="listen"><a class="permalink" href="#listen"><code class="Fl">-listen</code></a>
    <var class="Ar">address</var></dt>
  <dd>The hostname and port where to listen to, separated by a colon. The
      hostname is optional. If not given, the server defaults to listen on
      localhost at port 9876.</dd>
</dl>
</section>
<section class="Sh">
<h2 class="Sh" id="DIAGNOSTICS"><a class="permalink" href="#DIAGNOSTICS">DIAGNOSTICS</a></h2>
<p class="Pp">The <code class="Nm">plakar-server</code> utility exits&#x00A0;0
    on success, and&#x00A0;&gt;0 if an error occurs.</p>
<dl class="Bl-tag">
  <dt>0</dt>
  <dd>Command completed successfully.</dd>
  <dt>&gt;0</dt>
  <dd>An error occurred, such as an unsupported protocol or invalid
      configuration.</dd>
</dl>
</section>
<section class="Sh">
<h2 class="Sh" id="SEE_ALSO"><a class="permalink" href="#SEE_ALSO">SEE
  ALSO</a></h2>
<p class="Pp"><a class="Xr" href="../plakar/" aria-label="plakar, section
    1">plakar(1)</a></p>
</section>
</main>
<div class="foot" role="doc-pagefooter" aria-label="Manual footer
  line"><span class="foot-left">Plakar</span> <span class="foot-date">July 3,
  2025</span> <span class="foot-right">PLAKAR-SERVER(1)</span></div>
