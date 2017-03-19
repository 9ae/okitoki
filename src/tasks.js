class TaskCreator {

  constructor(){
    this.title = document.getElementById('newTaskTitle');
    this.estTime = document.getElementById('newTaskTime');
  }

  clear(){
    this.title.value = "";
    this.estTime.value = "";
  }

  addTask(){
    let title = this.title.value;
    let time = this.estTime.value;
    let task = createElement('div', ['task'], {
      'draggable': true,
      'data-hours': time
    });
    task.innerHTML = title;

    this.title.parentNode.insertAdjacentElement('beforeBegin', task);
    this.clear();
    setTaskHeight(task);
  }

  static register(){
    var creator = new TaskCreator();
    let onChangeListener = (event) => {
      if(creator.title.value.length == 0 || creator.estTime.value.length == 0 || isNaN(creator.estTime.value)){
        return
      }
      creator.addTask();
    };

    creator.title.addEventListener("change", onChangeListener);
    creator.estTime.addEventListener("change", onChangeListener);
    return creator;
  }

}