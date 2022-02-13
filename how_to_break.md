# How to Break whichmark

**Under no circumstances will bookmarks be deleted!**

Please read the source code. I do not invoke any bookmark deletion methods, only
bookmark moving methods.

## Defined Behavior

Don't do these things but here's what's gonna happen if you do:

- Moving `Switchmarks` and/or folders inside
   - Continues to function as normal until restart.

- Deleting `Switchmarks` and/or folders inside
   - The next switch will stall forever until restart.

- Moving bookmarks around while switching
   - Out of order bookmarks.

- Having multiple `Switchmarks` folders
   - The extension will refuse to activate.

## Undefined Behavior

My best guess at what might happen if you do these things:

- Deleting a bookmark that is currently being moved
   - whichmark stalls and is unable to complete the switch
   - bookmarks are half switched
   - whichmark will not function until restart

- Shutting down Firefox before the switch is complete
   - Probably half switched bookmarks.

- Syncing to another device while switching
   - Duplicate bookmarks
   - Since using this myself for a year, I have encountered this issue once.
