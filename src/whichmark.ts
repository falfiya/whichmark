import B = chrome.bookmarks;

type Bookmark = B.BookmarkTreeNode;
type Nullmark = Bookmark | null;

type Consumer<T> = (res: T) => void;

namespace Children {
   export const getChildByTitle = (haystack: Bookmark[], title: string): Nullmark => {
      const len = haystack.length;
      for (var i = 0; i < len; ++i) {
         const child = haystack[i];
         if (child.title === title) {
            return child;
         }
      }
      return null;
   }
}

namespace Id {
   export const getChildByTitle = (parentId: string, title: string, cb: Consumer<Nullmark>) =>
      B.getChildren(parentId, children => cb(Children.getChildByTitle(children, title)))

   export const open = (parentId: string, title: string, cb: Consumer<Bookmark>) =>
      B.getChildren(parentId, children => {
         const presentChild = Children.getChildByTitle(children, title);
         if (presentChild) {
            console.info(`${title} was present`);
            cb(presentChild);
            return;
         }

         console.info(`${title} is being created`);
         B.create({title, parentId}, cb);
      })
}

const root_id    = "root________";
const toolbar_id = "toolbar_____";
const other_id   = "unfiled_____";

const numberOfToolbars = 10;
const toolbars = Array(numberOfToolbars);
console.info("starting");
Id.open(other_id, "Switchmark", whichmark => {
   var completed = 0;
   for (let i = 0; i < numberOfToolbars; ++i) {
      // very important that i is declared with let
      setTimeout(() => {
         Id.open(whichmark.id, i.toString(), toolbar => {
            console.info(`opened ${i} at index ${toolbar.index}`);
            toolbars[i] = toolbar;
            if (++completed === numberOfToolbars) {
               finalizeInit();
            }
         });
      }, 2000 * i);
   }
});

function finalizeInit() {
   console.info("finalizeInit()");
   chrome.browserAction.onClicked.addListener(switchToolbars);
}

function switchToolbars() {
   console.log(toolbars);
}
