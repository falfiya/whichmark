# whichmark

This extension is not ACID compliant yet.

## Installation Instructions

- Go to `about:config`
- Ignore the warning about it possibly messing up Firefox
- Set `xpinstall.signatures.required` to `false`

## Undefined Behavior

- Moving `root________/unfiled_____/Switchmarks`
- Deleting `root________/unfiled_____/Switchmarks`
- Moving folders in `root________/unfiled_____/Switchmarks/`
- Deleting folders in `root________/unfiled_____/Switchmarks/`
- Deleting a bookmark that is currently being moved
- Syncing while switching
- Having multiple `root________/unfiled_____/Switchmarks`
- Having colliding names in `root________/unfiled_____/Switchmarks/`

## TODO

- Journalling
- Atomicity
- Consistency
- Isolation
- Durability
