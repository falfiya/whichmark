<div align="center">
   <img width=50px src=icon.png/>
   <h1>whichmark</h1>
   <i>
      A Switchmark compatable bookmark switcher for Firefox.
   </i>
   <br/>
   <br/>
   <img width=60% src=options_page.png/>
</div>
<br/>

## Installation Instructions

- Go to `about:config`
- Ignore the warning about it possibly messing up Firefox
- Set `xpinstall.signatures.required` to `false`
- Open `whichmark.xpi` with Firefox

## Questions

<details open>
   <summary>Why is it so slow?</summary>
   Firefox's bookmarks API is just really really slow. In the source code, you
   may notice that I am using the <code>chrome.bookmarks</code> compatability
   layer that Firefox provides. That's because it's faster than Firefox's own
   <code>Promise</code> based bookmarks API. It's really pathetic.
</details>

<br/>

<details open>
   <summary>Will this ruin my bookmarks?</summary>
   This extension will never, ever delete bookmarks.
   Now, under certain circumstances<sup>*</sup>, it may annoyingly <i>reorder</i> your
   bookmarks. If you're really that worried,
   <a href="https://support.mozilla.org/en-US/kb/export-firefox-bookmarks-to-backup-or-transfer">take a backup of your bookmarks.</a>
   <br/>
   <sup>* see <a href="how_to_break.md">how_to_break.md</a></sup>
</details>

<br/>

<details open>
   <summary>If you're using Chrome APIs, is this compatible with Chrome?</summary>
   Probably? I dunno, I haven't tested it out for myself. I can't see why not.
   That being said, you should probably just use the original <a href="https://chrome.google.com/webstore/detail/switchmark/bnocffbiglfjjcgmifcampfmcbkfbhgc?hl=en-US">Switchmark</a>. It's
   less safe than whichmark but it's significantly faster. As of the last time I
   read it's code, so January 2021, it doesn't do anything shady and seems like
   a good extension, even though I can't find the source of it.
   <br/>
</details>

<br/>

<details open>
   <summary>Why can't I install it from the Firefox addons store?</summary>
   I'm too lazy to figure out how to add it. In any case, I'm basically the only
   one who uses it.
</details>
