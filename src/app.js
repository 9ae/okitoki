const leeway = 50;
const unit = (window.outerHeight - leeway) / 12; //TODO: divide by the longest day

class NewTaskManager {

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

  register(){
    let onChangeListener = (event) => {
      if(this.title.value.length == 0 || this.estTime.value.length == 0 || isNaN(this.estTime.value)){
        return
      }
      this.addTask();
    };

    this.title.addEventListener("change", onChangeListener);
    this.estTime.addEventListener("change", onChangeListener);
  }

}

function setDayHeight(day){
    let capacity = parseFloat(day.getAttribute('data-hours'));
    day.style.height = unit*capacity + leeway;
}

function setTaskHeight(task){
  let time = parseFloat(task.getAttribute('data-hours'));
  task.style.height = unit*time;
}

function refreshHeights(){
  let days = document.getElementsByClassName('day');
  for(var i=0; i<days.length; i++){
      setDayHeight(days[i]);
  }

  let tasks = document.getElementsByClassName('task');
  for(var j=0; j<tasks.length; j++){
    setTaskHeight(tasks[j]);
  }
}

window.onload = function(){
	DnD.register();
  DayListCreator.register();
  const newTaskCtrl = new NewTaskManager();
  newTaskCtrl.register();
  refreshHeights()
};