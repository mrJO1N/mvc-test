import { api as hostApi } from "./fetch.api.js";
import { browserApi } from "./browser.api.js";

const loginBlockElement = document.querySelector("#login-block"),
  registerBlockElement = document.querySelector("#register-block"),
  changeAuthActionBtnElement = document.querySelector("#change-auth-action");

const regForm = document.querySelector("#register-form"),
  loginForm = document.querySelector("#login-form"),
  regUsernameInpElement = document.querySelector("#reg-inp-username"),
  loginUsernameInpElement = document.querySelector("#login-inp-username");

let authAction = "login";
changeAuthActionBtnElement.onclick = () => {
  if (authAction === "login") {
    loginBlockElement.style.display = "none";
    registerBlockElement.style.display = "block";

    changeAuthActionBtnElement.innerText = "login";

    authAction = "register";
  } else {
    loginBlockElement.style.display = "block";
    registerBlockElement.style.display = "none";

    changeAuthActionBtnElement.innerText = "register";

    authAction = "login";
  }
};

regForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const res = await hostApi.json
    .post("/api/users/", { username: regUsernameInpElement.value })
    .catch((error) => {
      console.error("users auth: reg bad", error);
    });

  if (res.id === undefined) {
    alert("uncorrected username!");
  } else {
    alert("you are register!");
  }

  console.log(res);
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { value: username } = loginUsernameInpElement;

  const res = await hostApi.json
    .get(`/api/users/search/${username}`)
    .catch((error) => {
      console.error("users auth: login bad: ", error);
    });
  if (res.id === undefined) {
    alert("uncorrected username!");
  } else {
    alert("you are logged in!");
    browserApi.cookie.save({ username: username, id: res.id });
  }

  console.log(browserApi.cookie.read(["username", "id"]));
  console.log(res);
});
