// This function is called when the context menu item is clicked
function redirectToAlphatrace(info, tab) {
  const etherscanPattern = /^https:\/\/etherscan\.io\/token\/(0x[a-fA-F0-9]{40})$/;
  const match = etherscanPattern.exec(tab.url);
  
  if (match && match[1]) {
    const address = match[1];
    const alphatraceURL = `https://www.alphatrace.xyz/wallet/${address}/trades`;
    // Open the new URL in a new tab
    chrome.tabs.create({ url: alphatraceURL });
  } else {
    alert("This is not an Etherscan address page.");
  }
}

// Set up the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "alphatrace-link",
    title: "Open in Alphatrace",
    contexts: ["all"]
  });
});

// Add the event listener for the context menu item click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "alphatrace-link") {
    redirectToAlphatrace(info, tab);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the URL is not an Etherscan address page
  if (!tab.url.includes('https://etherscan.io/address/')) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: removeButton,
    });
  }
});

// This function will be sent to the content script to remove the button
function removeButton() {
  const button = document.getElementById('alphatrace-button');
  if (button) {
    button.remove();
  }
}
