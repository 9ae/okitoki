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
    task.innerHTML = `<input type="checkbox" /> <span class="title">${title}</span><span class="time">${time} hrs</span>`;
    // var checkbox = createElement('input', [], {'type': 'checkbox'});

    let fieldsWrapper = document.getElementById('newTaskFields');
    fieldsWrapper.insertAdjacentElement('beforeBegin', task);
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