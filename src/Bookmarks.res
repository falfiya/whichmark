type bookmarkTreeNode = {
   id: string,
   parentId: string,
   index: option<int>,
   title: string,
   type: string, // I hate these people so much
}

@val @scope(("chrome", "bookmarks")) external random: unit => float = "random"
