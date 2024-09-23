chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "aiTranslate",
    title: "aiTranslate",
    contexts: ["selection"]  // 可以选择 "all", "page", "frame", "selection", "link", "editable", "image", "video", "audio"
    
  });
});

async function m2mtranslate(userinput){
  // 使用fetch发起POST请求
  return await fetch('https://translate.tcp.im/translate', {
    method: 'POST', // 指定请求方法为POST
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded', 
    },
    body: 'a='+userinput 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json(); // 解析JSON格式的响应数据
  })
  .then(data => {
    console.log('Success:', data);
    return data['translated_text'];
  })
  .catch((error) => {
    console.log('Error:', error);
  });

}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  
  if (info.menuItemId === "aiTranslate") {
    let transresult = await m2mtranslate(info.selectionText)
    // 可以使用chrome.tabs.sendMessage或其他方法与内容脚本通信
    chrome.tabs.sendMessage(tab.id, {
      action: "displaySelection",
      text: transresult
    });
  }
});
