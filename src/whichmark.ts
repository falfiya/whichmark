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
            cb(presentChild);
            return;
         }

         B.create({title, parentId}, cb);
      })
}

namespace Bookmark {
   export const getChildByTitle = (parent: Bookmark, title: string): Nullmark =>
      parent.children
      ? Children.getChildByTitle(parent.children, title)
      : null

   export const open = (parent: Bookmark, title: string, cb: Consumer<Bookmark>) => {
      if (parent.children) {
         const presentChild = Children.getChildByTitle(parent.children, title);
         if (presentChild) {
            cb(presentChild);
            return;
         }
      }

      B.create({title, parentId: parent.id}, cb);
   }
}
