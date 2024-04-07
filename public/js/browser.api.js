class Cookie {
  save(obj2save) {
    for (const key of Object.keys(obj2save)) {
      document.cookie =
        encodeURIComponent(key) + "=" + encodeURIComponent(obj2save[key]);
    }
  }

  read(...keys) {
    const answer = {};

    for (const key of keys) {
      const matches = document.cookie.match(
        new RegExp(
          "(?:^|; )" +
            key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
      );

      if (matches) {
        answer[key] = decodeURIComponent(matches[1]);
      }
    }

    return answer;
  }
}

class BrowserApi {}

export const browserApi = { browser: new BrowserApi(), cookie: new Cookie() };
