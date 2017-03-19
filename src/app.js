function dnd(){
	var dragged = null;

  let dayHasTime = (day, task) => {
    let capacity = parseFloat(day.getAttribute("data-hours"));
    for(var i=0; i<day.children.length; i++){
      let node = day.children[i];
      if(node.className=="task"){
        capacity -= parseFloat(node.getAttribute("data-hours"));
      }
    }
    let taskTime = parseFloat(task.getAttribute("data-hours"));
    capacity -= taskTime;
    console.log('remaining time '+capacity);
    return capacity > 0;
  }

  let clearHoverClass = (classes) => {
    if(classes.contains("available")){
      classes.remove("available");
    }
    if(classes.contains("overbook")){
      classes.remove("overbook");
    }
  };

  /* events fired on the draggable target */
  document.addEventListener("drag", function( event ) {

  }, false);

  document.addEventListener("dragstart", function( event ) {
      if ( event.target.className != "task" ){
      	return;
      }
      dragged = event.target;
      // make it half transparent
      dragged.classList.add('active');
  }, false);

  document.addEventListener("dragend", function( event ) {

  	  if(dragged != null){
      	dragged.classList.remove('active');
  	}
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function( event ) {
      // prevent default to allow drop
      event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function( event ) {
      var targetClasses = event.target.classList;
      if ( targetClasses.contains("day") && !targetClasses.contains("inactive") ) {
          let hoverClass = dayHasTime(event.target, dragged) ? "available" : "overbook";
          targetClasses.add(hoverClass);
      }

  }, false);

  document.addEventListener("dragleave", function( event ) {
    console.log("drag leave");
      var targetClasses = event.target.classList;
      if ( targetClasses.contains("day") ) {
          clearHoverClass(targetClasses);
      }

  }, false);

  document.addEventListener("drop", function( event ) {
      // prevent default action (open as link for some elements)
      event.preventDefault();
      // move dragged elem to the selected drop target
      if ( event.target.classList.contains("day") && !event.target.classList.contains("inactive")) {
          dragged.parentNode.removeChild( dragged );
          event.target.appendChild( dragged );
          clearHoverClass(event.target.classList);
      }
    
  }, false);
}

function ListManager(){
	var dayNameField = document.getElementById("newDayName");
	var dayCapacityField = document.getElementById("newDayCapacity");
	var newListName = null;

	var clear = function(){
		newListName = null;
		dayNameField.value = ""
		dayCapacityField.value = ""
		dayCapacityField.style.display = "none"
	}

	dayNameField.addEventListener("focus", function(event){
		console.log("new day focus")
		dayCapacityField.style.display = "block";
	});

	dayNameField.addEventListener("blur", function(event){
		if(this.value.length > 0){
			newListName = this.value;
		}
	});

	dayCapacityField.addEventListener("change", function(event){
		if(newListName != null){
			var capacity = parseFloat(this.value);
			console.log('make new list: '+newListName+' with '+capacity+' hours');
      var placeholderList = document.getElementById('addListColumn');
      var wrapper = createElement('div',['day-wrapper']);
      var dayList = createElement('div',['list', 'day'], {'data-hours': capacity});
      var dayLabel = createElement('p');
      dayLabel.innerHTML = newListName;
      dayList.appendChild(dayLabel);
      wrapper.appendChild(dayList);

      placeholderList.insertAdjacentElement('beforeBegin', wrapper);
		}
		clear();
	});
}

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

window.onload = function(){
	dnd();
	ListManager();
  const newTaskCtrl = new NewTaskManager();
  newTaskCtrl.register();
};