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

  static delete(path, callback) {
    fetch(`${host}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(json => {
      callback(json);
    });
  }

  /* Task API calls */

  static newTask(title, est, callback) {
    const body = { title, est };

    Dark.post('/task', body, function (result) {
      console.log("create new task", result);
      if (result.task_key) callback(result.task_key);
    });
  }

  static getTasks(callback) {
    Dark.get('/tasks', function (result) {
      callback(result.tasks);
    });
  }

  static doneTask(task_key) {
    Dark.post(`/task/${task_key}/done`, {}, function (res) {
      console.log(res);
    });
  }

  static moveTask(task_key, from_list_key, to_list_key) {
    const body = { from_list_key, to_list_key };

    Dark.post(`/task/${task_key}/move`, body, function (res) {
      console.log(res);
    });
  }

  /* List Api Calls */

  static newList(ts, capacity, callback) {
    const date = ts.toISOString().split("T")[0];
    const body = { date, capacity };

    Dark.post('/list', body, function (result) {
      callback(result.list_key);
    });
  }

  static lists(callback) {
    Dark.get('/lists', function (result) {
      callback(result);
    });
  }

  static deleteList(key) {
    Dark.delete(`/list/${key}`, console.log);
  }

}