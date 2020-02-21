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

  addTask(title, time, key){
    let task = TaskCreator.create(title, time, key);
    this.element.appendChild(task);
  }
}

class DayListCreator {

  constructor(){
    this.dayNameField = document.getElementById("newDayName");
    this.dayCapacityField = document.getElementById("newDayCapacity");
    this.newListDate = null;
    this.newListCap = null;
  }

  clear(){
    this.newListDate = null;
    this.dayNameField.value = ""
    this.dayCapacityField.value = ""
    this.newListCap = null
  }

  static create(date, capacity, key){
    var placeholderList = document.getElementById('addListColumn');
    var wrapper = createElement('div',['day-wrapper']);
    var dayList = createElement('div',['list', 'day'], {'data-hours': capacity});
    dayList.innerHTML = `<h1>${date.toDateString()}</h1><p>${capacity} hours remaining</p>`
    var deleteButton = createElement('button', ['delete'], {'type':'button'});
    deleteButton.innerHTML = '&otimes;';
    dayList.insertBefore(deleteButton, dayList.firstChild);
    wrapper.appendChild(dayList);

    placeholderList.insertAdjacentElement('beforeBegin', wrapper);

    if (key){
      setKey(dayList, key)
    } else {
      Dark.newList(date, capacity, listKey => { setKey(dayList, listKey) })
    }

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

    const checkReady = function(){
      if(creator.newListCap != null && creator.newListDate != null) {
        DayListCreator.create(creator.newListDate, creator.newListCap);
        creator.clear();
      }
    };

    creator.dayNameField.addEventListener("blur", function(event){
      if(this.value.length > 0){
        creator.newListDate = new Date(this.value);
      }

      checkReady();
    });

    creator.dayCapacityField.addEventListener("change", function(event){
      if(this.value.length > 0){
        creator.newListCap = this.value; 
      }

      checkReady();
    });

    return creator;
  }

}