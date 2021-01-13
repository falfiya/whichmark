import B = chrome.bookmarks;

type Bookmark = B.BookmarkTreeNode;
type Nullmark = Bookmark | null;

type Consumer<T> = (res: T) => void;
type Runnable    = ()       => void;

const childrenGetChildByTitle = (children: Bookmark[], title: string): Nullmark => {
   const len = children.length;
   for (var i = 0; i < len; ++i) {
      const child = children[i];
      if (child.title === title) {
         return child;
      }
   }
   return null;
}

const getChildByTitle = (parentId: string, title: string, cb: Consumer<Nullmark>) =>
B.getChildren(parentId, children => cb(childrenGetChildByTitle(children, title)))

const openFolder = (parentId: string, title: string, cb: Consumer<Bookmark>) =>
   B.getChildren(parentId, children => {
      const presentChild = childrenGetChildByTitle(children, title);
      if (presentChild) {
         console.info(`${title} was present`);
         cb(presentChild);
         return;
      }

      console.info(`${title} is being created`);
      B.create({title, parentId}, cb);
   })


const root_id    = "root________";
const toolbar_id = "toolbar_____";
const other_id   = "unfiled_____";

const numberOfToolbars = 2;
const benchedToolbarIds: string[] = Array(numberOfToolbars);

console.info("starting");
openFolder(other_id, "Switchmark", registerToolbars);

function registerToolbars(whichmark: Bookmark) {
   const loop = (i: number): void =>
      i < numberOfToolbars
      ? openFolder(whichmark.id, i.toString(), toolbar => {benchedToolbarIds[i] = toolbar.id; loop(i + 1)})
      : registerActiveToolbarIndex()
   loop(0);
}

var activeToolbarIndex = -1;

function registerActiveToolbarIndex() {
   chrome.storage.sync.get("activeToolbarIndex", obj => {
      activeToolbarIndex = obj.activeToolbarIndex|0
      finalizeInit();
   });
}

function finalizeInit() {
   console.info("finalizeInit()");
   chrome.browserAction.setBadgeBackgroundColor({color: "mediumpurple"});
   chrome.browserAction.setBadgeText({text: activeToolbarIndex.toString()});
   chrome.browserAction.onClicked.addListener(switch_Empty);
}

var running = false;
function switch_Empty() {
   // we can do something like buffering input in the future
   if (running) {
      return;
   }

   running = true;
   moveFolderContents(toolbar_id, benchedToolbarIds[activeToolbarIndex], switch_Fill);
}

function switch_Fill() {
   activeToolbarIndex += 1;
   activeToolbarIndex %= numberOfToolbars;
   moveFolderContents(benchedToolbarIds[activeToolbarIndex], toolbar_id, switch_UpdateBadge);
}

function switch_UpdateBadge() {
   chrome.browserAction.setBadgeText({text: activeToolbarIndex.toString()}, switch_UpdateStorage);
}

function switch_UpdateStorage() {
   chrome.storage.sync.set({activeToolbarIndex}, switch_Finish);
}

function switch_Finish() {
   running = false;
}

function moveFolderContents(fromId: string, toId: string, cb: Runnable) {
   B.getChildren(fromId, children => {
      const len = children.length;

      if (len === 0) {
         cb();
      } else {
         move();
      }

      function move() {
         var moved = 0;
         for (let i = 0; i < len; ++i) {
            const child = children[i];
            console.groupCollapsed(`SET MOVE CHILD ${i}`);
            console.info(child);
            console.groupEnd();
            chrome.bookmarks.move(child.id, {parentId: toId}, newChild => {
               moved += 1;
               console.group(`MOVE CHILD ${i} [${moved}/${len}]`);
               console.info("FROM", child);
               console.info("TO", newChild);
               console.groupEnd();
               if (moved === len) {
                  reorder();
               }
            });
         }
      }

      function reorder() {
         var reordered = 0;
         for (let i = 0; i < len; ++i) {
            const child = children[i];
            let index = child.index as any|0;
            if (index < 0) {
               console.info("WAS < 0");
               index = 0;
            }
            console.groupCollapsed(`SET RRDR CHILD ${i} to ${index}`);
            console.info(child);
            console.groupEnd();
            chrome.bookmarks.move(child.id, {index}, newChild => {
               reordered += 1;
               console.group(`RRDR CHILD ${i} to ${index} [${reordered}/${len}]`);
               console.info("FROM", child);
               console.info("TO", newChild);
               console.groupEnd();
               if (reordered === len) {
                  cb();
               }
            });
         }
      }
   });
}
