class DayList {

  constructor(htmlElement){
    this.element = htmlElement;
  }

  updateHours(){
    let capacity = parseFloat(this.element.getAttribute("data-hours"));
    for(var i=0; i<this.element.children.length; i++){
      let node = this.element.children[i];
      if(node.className=="task"){
        capacity -= parseFloat(node.getAttribute("data-hours"));
      }
    }
    var timeText = this.element.getElementsByTagName('p')[0];
    timeText.innerHTML = `${capacity} hours remaining`;
    console.log(timeText.innerHTML);
  }

  addTask(title, time){
    let task = TaskCreator.create(title, time);
    this.element.appendChild(task);
  }
}

class DayListCreator {

  constructor(){
    this.dayNameField = document.getElementById("newDayName");
    this.dayCapacityField = document.getElementById("newDayCapacity");
    this.newListName = null;
  }

  clear(){
    this.newListName = null;
    this.dayNameField.value = ""
    this.dayCapacityField.value = ""
  }

  static create(name, capacity){
    var placeholderList = document.getElementById('addListColumn');
    var wrapper = createElement('div',['day-wrapper']);
    var dayList = createElement('div',['list', 'day'], {'data-hours': capacity});
    dayList.innerHTML = `<h1>${name}</h1><p>${capacity} hours remaining</p>`
    var deleteButton = createElement('button', ['delete'], {'type':'button'});
    deleteButton.innerHTML = 'X';
    dayList.insertBefore(deleteButton, dayList.firstChild);
    wrapper.appendChild(dayList);

    placeholderList.insertAdjacentElement('beforeBegin', wrapper);

    var event = new CustomEvent('daycreated', { 'detail': dayList });
    document.dispatchEvent(event);

    deleteButton.addEventListener('click', (event) => {
      const day = event.target.parentNode;
      const listName = day.getElementsByTagName('h1')[0].innerHTML;
      if(confirm(`Remove list "${listName}"?`)){
        const list = day.parentNode;
        const frame = list.parentNode;
        frame.removeChild(list);
      }
    });

    return dayList;
  }

  static register(){
    var creator = new DayListCreator();

    creator.dayNameField.addEventListener("blur", function(event){
      if(this.value.length > 0){
        creator.newListName = this.value;
      }
    });

    creator.dayCapacityField.addEventListener("change", function(event){
      if(creator.newListName != null){
        var capacity = parseFloat(this.value);
        DayListCreator.create(creator.newListName, capacity);      
      }
      creator.clear();
    });

    return creator;
  }

}