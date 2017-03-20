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
    this.dayCapacityField.style.display = "none"
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

        var placeholderList = document.getElementById('addListColumn');
        var wrapper = createElement('div',['day-wrapper']);
        var dayList = createElement('div',['list', 'day'], {'data-hours': capacity});
        var dayLabel = createElement('p');

        dayLabel.innerHTML = creator.newListName;
        dayList.appendChild(dayLabel);
        wrapper.appendChild(dayList);

        placeholderList.insertAdjacentElement('beforeBegin', wrapper);

        var event = new CustomEvent('daycreated', { 'detail': dayList });
        document.dispatchEvent(event);
      }
      creator.clear();
    });

    return creator;
  }

}