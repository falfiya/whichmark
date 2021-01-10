void async function main() {
   const node = await browser.bookmarks.create({
      title: `whichmark ${new Date}`,
      url: "https://coalpha.github.io/whichmark",
   });
   console.log(node);
}();
