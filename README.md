# whichmark

<img width=50px src=icon.png/>

*A Switchmark compatable bookmark switcher for Firefox and maybe Chrome*

<img width=80% src=options_page.png/>

## Installation Instructions

- Go to `about:config`
- Ignore the warning about it possibly messing up Firefox
- Set `xpinstall.signatures.required` to `false`
- Open `whichmark.xpi` with Firefox

## Defined Behavior

Don't do these things but here's what's gonna happen if you do:

### Moving `Switchmarks` and/or folders inside

Continues to function as normal until restart.

### Deleting `Switchmarks` and/or folders inside

The next switch will stall forever until restart.

### Moving bookmarks around while switching

Out of order bookmarks.

### Having multiple `Switchmarks` folder

The extension will refuse to activate.

## Undefined Behavior

### Deleting a bookmark that is currently being moved

Probably a stall and then half switched bookmarks.

### Shutting down Firefox before the switch is complete

Probably half switched bookmarks.

### Syncing while switching

Potential duplicate bookmarks. Probably won't delete anything, though.
Currently, I have had this issue only once.
