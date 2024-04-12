import { api as hostApi } from "./fetch.api.js";
import { browserApi } from "./browser.api.js";

const contentElem = document.querySelector("#new-post-content"),
  titleElem = document.querySelector("#new-post-title"),
  postFormElem = document.querySelector("#post-form");

postFormElem.addEventListener("submit", async (event) => {
  event.preventDefault();

  console.log(browserApi.cookie.read("username", "id"));

  const res = await hostApi.json
    .post("/api/posts/", {
      title: titleElem.value,
      content: contentElem.value,
    })
    .catch((error) => {
      console.error("posts: post bad: ", error);
    });

  if (res.badFields) {
    console.error("400: " + res.badFields);
  } else {
    console.log("ok");
  }
});
