class TaskCreator {

  constructor() {
    this.title = document.getElementById('newTaskTitle');
    this.estTime = document.getElementById('newTaskTime');
  }

  clear() {
    this.title.value = "";
    this.estTime.value = "";
  }

  static create(title, time) {
    let task = createElement('div', ['task'], {
      'draggable': true,
      'data-hours': time
    });
    var checkbox = createElement('input', [], { 'type': 'checkbox' });
    var titleElement = createElement('span', ['title']);
    var timeElement = createElement('span', ['time']);
    titleElement.innerHTML = title;
    timeElement.innerHTML = `${time} hrs`;

    task.appendChild(checkbox);
    task.appendChild(titleElement);
    task.appendChild(timeElement);

    checkbox.addEventListener('change', event => {
      const taskElement = event.target.parentNode;
      const listElement = taskElement.parentNode;
      listElement.removeChild(taskElement);
    });

    var event = new CustomEvent('taskcreated', { 'detail': task });
    document.dispatchEvent(event);

    return task;
  }

  static createUnalloc(title, time) {
    let task = TaskCreator.create(title, time);
    let fieldsWrapper = document.getElementById('newTaskFields');
    fieldsWrapper.insertAdjacentElement('beforeBegin', task);
  }

  static register() {
    var creator = new TaskCreator();
    let onChangeListener = event => {
      if (creator.title.value.length == 0 || creator.estTime.value.length == 0 || isNaN(creator.estTime.value)) {
        return;
      }
      TaskCreator.createUnalloc(creator.title.value, creator.estTime.value);
      creator.clear();
    };

    creator.title.addEventListener("change", onChangeListener);
    creator.estTime.addEventListener("change", onChangeListener);
    return creator;
  }

}