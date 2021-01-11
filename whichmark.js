const b = chrome.bookmarks;

const root_id    = "root________";
const toolbar_id = "toolbar_____";
const other_id   = "unfiled_____";

/**
 * @param subTree {browser.bookmarks.BookmarkTreeNode}
 * @param title {string}
 */
function searchFolder(subTree, title) {
   const {children} = subTree;
   if (children) {
      let len = children.length|0;
      while (len --> 0) {
         const child = children[len|0];
         if (child.title === title) {
            return child;
         }
      }
   }
   return null;
}

async function getOrCreateFolder(parentTree, title) {
   const needle = searchFolder(parentTree, title);
   if (needle) {
      return needle;
   }

   return B.create({title, type: "folder", parentId: parentTree.id});
}

const STORAGE_CREATION_DETAILS = {
   index: 999,
   parentId: other_id,
   title: "Switchmark",
   type: "folder",
};

async function getStorage() {
   // this should always have one element in it reasonably
   const [otherTree] = await B.getSubTree(other_id);
   const previousStorage = searchFolder(otherTree, "Switchmark");
   if (previousStorage !== null) {
      return previousStorage;
   }

   return B.create(STORAGE_CREATION_DETAILS);
}

function ignore() {}

async function moveFolderContents(fromId, toId) {
   const trees = await B.getSubTree(fromId);
   if (trees.length !== 1) {
      return void 0;
   }

   const fromTree = trees[0];
   const children = fromTree.children;
   if (children === undefined) {
      return void 0;
   }

   const len = children.length|0;
   for (let i = 0; i < len; ++i) {
      const child = children[i];
      const dest  = {parentId: toId, index: child.index};
      await B.move(child.id, dest).then(ignore);
   }
}

let currentlyActiveToolbar = 0;

var currentlySwitching = false;

function switchToolbars() {
   if (currentlySwitching) {
      return;
   }
   currentlySwitching = true;

   const toolbarCount = 2;
   const storage  = await getStorage();
   const toolbars = Array(toolbarCount);
   for (let i = 0; i < toolbarCount; ++i) {
      toolbars[i] = await getOrCreateFolder(storage, i.toString());
   }
   const oldActive = currentlyActiveToolbar;
   const newActive = oldActive === 0 ? 1 : 0;
   currentlyActiveToolbar = newActive;
   await moveFolderContents(toolbar_id, toolbars[oldActive].id);
   await moveFolderContents(toolbars[newActive].id, toolbar_id);
   browser.browserAction.setBadgeText(newActive);
}

browser.browserAction.onClicked.addListener(switchToolbars);
