import C = chrome;
import B = C.bookmarks;
import S = C.storage.sync;

type Bookmark = B.BookmarkTreeNode;
type Nullmark = Bookmark | null;

type Consumer<T> = (res: T) => void;
type Runnable    = ()       => void;

function childrenGetChildrenByTitle(children: Bookmark[], title: string) {
   const len = children.length;
   const matches = [];
   for (var i = 0; i < len; ++i) {
      const child = children[i];
      if (child.title === title) {
         matches.push(child);
      }
   }

   return matches;
}

function openFolder(parentId: string, title: string, cb: Consumer<Bookmark>) {
   B.getChildren(parentId, children => {
      const parents = childrenGetChildrenByTitle(children, title);

      switch (parents.length) {
         case 0:
            B.create({title, parentId}, cb);
            break;
         case 1:
            cb(parents[0]);
            break;
         default:
            throw new Error(`There were two folders named ${title} within ${parentId}!`);
      }
   });
}

const root_id    = "root________";
const toolbar_id = "toolbar_____";
const other_id   = "unfiled_____";

var toolbarCount = -1;
var benchedToolbarIds: string[];

S.get("toolbarCount", init_ReadToolbarCount);

const max_toolbars = 8;
function init_ReadToolbarCount(obj: any) {
   if (obj.toolbarCount) {
      toolbarCount = obj.toolbarCount|0;
      if (toolbarCount < max_toolbars) {
         init_OpenSwitchmarksFolder();
         return;
      }
   }
   toolbarCount = 2;
   S.set({toolbarCount}, init_OpenSwitchmarksFolder);
}

function init_OpenSwitchmarksFolder() {
   console.info("init_OpenSwitchmarksFolder");

   benchedToolbarIds = Array(toolbarCount);
   openFolder(other_id, "Switchmark", init_RegisterToolbars);
}

function init_RegisterToolbars(whichmark: Bookmark) {
   openToolbar(0);
   function openToolbar(i: number) {
      if (i === toolbarCount) {
         init_RegisterActiveToolbarIndex();
         return;
      }

      openFolder(whichmark.id, i.toString(), toolbar => {
         benchedToolbarIds[i] = toolbar.id;
         openToolbar(i + 1);
      });
   }
}

var activeToolbarIndex = -1;

function init_RegisterActiveToolbarIndex() {
   S.get("activeToolbarIndex", obj => {
      activeToolbarIndex = Number(obj.activeToolbarIndex);
      init_Finalize();
   });
}

function init_Finalize() {
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
   activeToolbarIndex %= toolbarCount;
   moveFolderContents(benchedToolbarIds[activeToolbarIndex], toolbar_id, switch_UpdateBadge);
}

function switch_UpdateBadge() {
   chrome.browserAction.setBadgeText({text: activeToolbarIndex.toString()}, switch_UpdateStorage);
}

function switch_UpdateStorage() {
   S.set({activeToolbarIndex}, switch_Finish);
}

function switch_Finish() {
   running = false;
}

function moveFolderContents(fromId: string, toId: string, cb: Runnable) {
   B.getChildren(fromId, children => {
      const len = children.length|0;

      if (len === 0) {
         cb();
      } else {
         moveChild(0);
      }

      function moveChild(i: number) {
         i = i|0;
         if (i === len) {
            cb();
            return;
         }
         const child = children[i|0];
         chrome.bookmarks.move(child.id, {parentId: toId}, () => moveChild((i|0) + 1));
      }
   });
}

chrome.contextMenus.create({
   title: "Options",
   contexts: ["browser_action"],
   onclick: () => chrome.runtime.openOptionsPage(),
});
