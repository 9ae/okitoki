const leeway = 50
const unit = (window.outerHeight - leeway) / 12; //TODO: divide by the longest day

class HeightAdjust {

  static day(day){
    let capacity = parseFloat(day.getAttribute('data-hours'));
    day.style.height = unit * capacity + leeway;
  }

  static task(task){
    let time = parseFloat(task.getAttribute('data-hours'));
    task.style.height = unit * time;
  }

  static refresh(){
    let days = document.getElementsByClassName('day');
    for(var i=0; i<days.length; i++){
        HeightAdjust.day(days[i]);
    }

    let tasks = document.getElementsByClassName('task');
    for(var j=0; j<tasks.length; j++){
      HeightAdjust.task(tasks[j]);
    }
  }

}