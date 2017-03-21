class TaskCreator {

  constructor(){
    this.title = document.getElementById('newTaskTitle');
    this.estTime = document.getElementById('newTaskTime');
  }

  clear(){
    this.title.value = "";
    this.estTime.value = "";
  }

  static create(title, time){
    let task = createElement('div', ['task'], {
      'draggable': true,
      'data-hours': time
    });
    //task.innerHTML = `<input type="checkbox" /> <span class="title">${title}</span><span class="time">${time} hrs</span>`;
    var checkbox = createElement('input', [], {'type': 'checkbox'});
    var titleElement = createElement('span', ['title']);
    var timeElement = createElement('span', ['time']);
    titleElement.innerHTML = title;
    timeElement.innerHTML = `${time} hrs`;

    task.appendChild(checkbox);
    task.appendChild(titleElement);
    task.appendChild(timeElement);

    let fieldsWrapper = document.getElementById('newTaskFields');
    fieldsWrapper.insertAdjacentElement('beforeBegin', task);

    checkbox.addEventListener('change', (event) => {
      const taskElement = event.target.parentNode;
      const listElement = taskElement.parentNode;
      listElement.removeChild(taskElement);
    });

    var event = new CustomEvent('taskcreated', { 'detail': task });
    document.dispatchEvent(event);
  }

  static register(){
    var creator = new TaskCreator();
    let onChangeListener = (event) => {
      if(creator.title.value.length == 0 || creator.estTime.value.length == 0 || isNaN(creator.estTime.value)){
        return
      }
      TaskCreator.create(creator.title.value, creator.estTime.value);
      creator.clear();
    };

    creator.title.addEventListener("change", onChangeListener);
    creator.estTime.addEventListener("change", onChangeListener);
    return creator;
  }

}