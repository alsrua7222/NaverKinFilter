chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getUserInfo"){
        const context = message.Context;
        console.log(context);
    }
})