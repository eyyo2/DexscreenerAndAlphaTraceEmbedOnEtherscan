// Function to create and insert iframes for DexScreener, AlphaTrace, and navigation buttons
function insertEmbedsAndButtons() {
  const path = window.location.pathname;
  const isAddressPage = path.includes('/address/');
  const isAddressPage2 = path.includes('/trades/');
  const isTokenPage = path.includes('/token/');
  let address;

  if (isAddressPage) {
    address = path.split('/address/')[1];
  } else if (isAddressPage2) {
    address = path.split('/trades/')[1];
  } else if (isTokenPage) {
    address = path.split('/token/')[1];
  }

  if (address) {
    const dexScreenerURL = `https://dexscreener.com/ethereum/${address}?embed=1&theme=dark`;
    const alphaTraceURL = `https://www.alphatrace.xyz/wallet/${address}/trades`;
    
    const dexScreenerEmbedContainer = createEmbedContainer(dexScreenerURL, 'dexscreener-embed');
    const alphaTraceEmbedContainer = createEmbedContainer(alphaTraceURL, 'alphatrace-embed');

    document.body.appendChild(dexScreenerEmbedContainer);
    document.body.appendChild(alphaTraceEmbedContainer);
  }

  // Create navigation buttons
  createNavButton('Jump to Etherscan', () => window.scrollTo(0, 0), 180);
  createNavButton('Jump to DexScreener', () => document.getElementById('dexscreener-embed').scrollIntoView(), 140);
  createNavButton('Jump to AlphaTrace', () => document.getElementById('alphatrace-embed').scrollIntoView(), 100);
  createNavButton('Open DexCheck', () => window.open(`https://dexcheck.ai/app/address-analyzer/${address}?tab=pnl-calculator&timeframe=max`, '_blank'), 60);
}

// Helper function to create an iframe and container
function createEmbedContainer(url, id) {
  const embedContainer = document.createElement('div');
  embedContainer.id = id;
  embedContainer.style.position = 'relative';
  embedContainer.style.width = '100%';
  embedContainer.style.height = '100vh';

  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = 'absolute';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.border = '0';

  embedContainer.appendChild(iframe);

  return embedContainer;
}

// Helper function to create navigation buttons with adjustable bottom positions
function createNavButton(text, action, bottomPosition) {
  const button = document.createElement('button');
  button.textContent = text;
  button.onclick = action;
  button.style.position = 'fixed';
  button.style.zIndex = '1000';
  button.style.bottom = bottomPosition + 'px';
  button.style.right = '20px';
  document.body.appendChild(button);
}

// Insert the embeds and buttons when the DOM content is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertEmbedsAndButtons);
} else {
  insertEmbedsAndButtons();
}
