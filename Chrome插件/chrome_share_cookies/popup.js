const $btn = document.getElementById("shareCookiesBtn");
const $btn2 = document.getElementById("shareCookiesBtn_2");

function getCookies(url, reset) {
  chrome.runtime.sendMessage({ url: url, reset: reset }, async function (response) {
    console.log(response);
  });
}

$btn.addEventListener("click", () => {
  getCookies(document.URL, false);
});

$btn2.addEventListener("click", () => {
  getCookies(document.URL, true);
});
