// 获取活跃的 tab，通常是用户正在浏览的页面
async function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        if (tabs.length > 0) {
          resolve(tabs[0]);
        } else {
          resolve(null);
        }
      }
    );
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
  chrome.cookies.getAll(
    {
      url: "https://adssx-test-gzdevops3.tsintergy.com/",
    },
    (cks) => {
      let cookieItem = cks.find((item) => item.name === "Authorization");
      let cookie = cookieItem.name + "=" + cookieItem.value;

      var param = {
        url: "http://localhost/",
        name: "Authorization",
        value: cookieItem.value,
        path: "/",
      };
      chrome.cookies.set(param, function (ck) {
        getActiveTab().then((tab) => {
          if (tab.url.includes("localhost")) {
            if (request.reset) {
              chrome.tabs?.update(tab.id, { url: tab.url.slice(0, 22) });
            } else {
              chrome.tabs?.reload(tab.id, {});
            }
          }
        });
      });
    }
  );

  sendResponse("cookie update are trigger");
});
