class Host {
  async post(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(data),
    }).catch((err) => console.error(err));

    return response.json();
  }

  async get(url = "") {
    const responce = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    }).catch((err) => console.error(err));

    return responce.json();
  }

  async delete(url = "", data = {}) {
    const responce = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(data),
    }).catch((err) => console.error(err));

    return responce.json();
  }

  async patch(url = "", data = {}) {
    const responce = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",

      body: JSON.stringify(data),
    }).catch((err) => console.error(err));

    return responce.json();
  }
}

export const api = { json: new Host() };
