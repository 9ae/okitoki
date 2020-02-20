class TaskCreator {

  constructor(){
    this.title = document.getElementById('newTaskTitle');
    this.estTime = document.getElementById('newTaskTime');
  }

  clear(){
    this.title.value = "";
    this.estTime.value = "";
  }

  static create(title, time, key){
    let task = createElement('div', ['task'], {
      'draggable': true,
      'data-hours': time
    });
    var checkbox = createElement('input', [], {'type': 'checkbox'});
    var titleElement = createElement('span', ['title']);
    var timeElement = createElement('span', ['time']);
    titleElement.innerHTML = title;
    timeElement.innerHTML = `${time} hrs`;

    task.appendChild(checkbox);
    task.appendChild(titleElement);
    task.appendChild(timeElement);

    checkbox.addEventListener('change', (event) => {
      const taskElement = event.target.parentNode;
      const listElement = taskElement.parentNode;

      const key = getKey(taskElement);
      Dark.doneTask(key);

      listElement.removeChild(taskElement);
    });

    var event = new CustomEvent('taskcreated', { 'detail': task });
    document.dispatchEvent(event);

    if (key) {
      setKey(task, key)
    } else {
      Dark.newTask(title, time, key => { setKey(task, key) });
    }

    return task;
  }

  static createUnalloc(title, time, key){
    let task = TaskCreator.create(title, time, key);
    let fieldsWrapper = document.getElementById('newTaskFields');
    fieldsWrapper.insertAdjacentElement('beforeBegin', task);
  }

  static register(){
    var creator = new TaskCreator();
    let onChangeListener = (event) => {
      if(creator.title.value.length == 0 || creator.estTime.value.length == 0 || isNaN(creator.estTime.value)){
        return
      }
      TaskCreator.createUnalloc(creator.title.value, creator.estTime.value);
      creator.clear();
    };

    creator.title.addEventListener("change", onChangeListener);
    creator.estTime.addEventListener("change", onChangeListener);
    return creator;
  }

}