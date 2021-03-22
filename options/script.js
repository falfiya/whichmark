const e_text = document.getElementById("text");
const e_toolbarCount = document.getElementById("toolbarCount");
const e_toolbarSlider = document.getElementById("toolbarSlider");

function setDefaultText() {
   e_text.innerText = "How many bookmark bars would you like to have?";
}

var currentCount = -1;

chrome.storage.sync.get("toolbarCount", ({toolbarCount}) => {
   setDefaultText();
     e_toolbarCount.innerText
   = e_toolbarSlider.value
   = currentCount
   = toolbarCount;
});

e_toolbarSlider.onmousemove = () => {
   e_toolbarCount.innerText = e_toolbarSlider.value;
};

e_toolbarSlider.onchange = () => {
   const toolbarCount = e_toolbarSlider.value;
   if (currentCount === toolbarCount) {
      setDefaultText();
   } else {
      e_text.innerText = "Please restart Firefox!";
   }

   chrome.storage.sync.set({toolbarCount});
};
