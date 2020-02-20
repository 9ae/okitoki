const host = "https://sample-todo.builtwithdark.com";

class Dark {

  /* Helpers to make API calls cleaner */
  static get(path, callback) {
    fetch(`${host}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(json => {
      callback(json);
    });
  }

  static post(path, body, callback) {
    fetch(`${host}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json()).then(json => {
      callback(json);
    });
  }

}