const toolbarCount = document.getElementById("toolbarCount");
const toolbarSlider = document.getElementById("toolbarSlider");

chrome.storage.sync.get("toolbarCount", ({toolbarCount}) => {
   toolbarCount.innerText = toolbarCount;
   toolbarSlider.value = toolbarCount;
});

toolbarSlider.onmousemove = () => {
   toolbarCount.innerText = toolbarSlider.value;
};

toolbarSlider.onchange = () => {
   chrome.storage.sync.set({toolbarCount: toolbarSlider.value});
   console.info("Updated");
}
