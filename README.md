# whichmark

<img width=50px src=icon.png/>

*A Switchmark compatable bookmark switcher for Firefox and maybe Chrome*

<img width=80% src=options_page.png/>

## Installation Instructions

- Go to `about:config`
- Ignore the warning about it possibly messing up Firefox
- Set `xpinstall.signatures.required` to `false`
- Open `whichmark.xpi` with Firefox

## Undefined Behavior

**This extension is not ACID compliant yet!!**

- Moving `root________/unfiled_____/Switchmarks`
- Deleting `root________/unfiled_____/Switchmarks`
- Moving folders in `root________/unfiled_____/Switchmarks/`
- Deleting folders in `root________/unfiled_____/Switchmarks/`
- Deleting a bookmark that is currently being moved
- Syncing while switching
- Having multiple `root________/unfiled_____/Switchmarks`
- Having colliding names in `root________/unfiled_____/Switchmarks/`
