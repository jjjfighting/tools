window.addEventListener("load", myMain, false);

function getCookies(url) {
  chrome.runtime.sendMessage({ url: url }, async function (response) {
    console.log(response);
  });
}

function myMain(evt) {
  console.log("Cookie share helper running!");
  getCookies(document.URL);
}
