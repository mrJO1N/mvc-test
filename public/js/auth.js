import { api } from "./fetch.api.js";
import { browserApi } from "./browser.api.js";

function onLoad() {
  const usernameInpElem = document.querySelector("#input-username"),
    submitBtnElem = document.querySelector("#input-submit");

  submitBtnElem.addEventListener("onclick", async () => {
    console.log(usernameInpElem.value);
    const res = await api.json.post("/api/user", {
      username: usernameInpElem.value,
    });
  });
  onReady();
}

function onReady() {}
