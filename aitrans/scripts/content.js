chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //console.log(sender)
  let curOrigin = (new URL(chrome.runtime.getURL('/'))).origin
  if (sender.origin == curOrigin && message.action === "displaySelection") {
    // 创建一个元素来显示文本
    const displayElement = document.createElement('div');
    displayElement.textContent = message.text;
    displayElement.style.position = 'fixed';
    let gCR = document.getSelection().getRangeAt(0).getClientRects()
    displayElement.style.left = gCR[gCR.length-1].left +`px`;
    displayElement.style.top = gCR[gCR.length-1].bottom +`px`;
    displayElement.style.backgroundColor = 'white';
    displayElement.style.border = '1px solid black';
    displayElement.style.padding = '5px';
    displayElement.style.zIndex = 99999;
    
    // 将元素添加到页面上
    document.body.appendChild(displayElement);

    displayElement.addEventListener('click', function() {
  // 从文档中删除div元素
      displayElement.parentNode.removeChild(displayElement);
    });
    //alert(message.text)
   
  }
});