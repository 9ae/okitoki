class DnD {

  constructor() {
    this.dragged = null;
  }

  dayHasTime(day, task) {
    let capacity = parseFloat(day.getAttribute("data-hours"));
    for (var i = 0; i < day.children.length; i++) {
      let node = day.children[i];
      if (node.className == "task") {
        capacity -= parseFloat(node.getAttribute("data-hours"));
      }
    }
    let taskTime = parseFloat(task.getAttribute("data-hours"));
    capacity -= taskTime;
    return capacity > 0;
  }

  clearHoverClass(classes) {
    if (classes.contains("available")) {
      classes.remove("available");
    }
    if (classes.contains("overbook")) {
      classes.remove("overbook");
    }
  }

  static register() {
    var dnd = new DnD();

    document.addEventListener("dragstart", event => {
      console.log(event.type);
      if (event.target.className != "task") {
        return;
      }
      dnd.dragged = event.target;
      dnd.dragged.classList.add('active');
    }, false);

    document.addEventListener("dragend", event => {
      console.log(event.type);
      if (dnd.dragged != null) {
        dnd.dragged.classList.remove('active');
      }
    }, false);

    document.addEventListener("dragover", event => {
      event.preventDefault();
    }, false);

    document.addEventListener("dragenter", event => {
      console.log(event.type);
      if (dnd.dragged == null) {
        return;
      }
      var targetClasses = event.target.classList;
      if (targetClasses.contains("day") && !targetClasses.contains("inactive")) {
        let hoverClass = dnd.dayHasTime(event.target, dnd.dragged) ? "available" : "overbook";
        targetClasses.add(hoverClass);
      }
    }, false);

    document.addEventListener("dragleave", event => {
      console.log(event.type);
      if (dnd.dragged == null) {
        return;
      }
      var targetClasses = event.target.classList;
      if (targetClasses.contains("day")) {
        dnd.clearHoverClass(targetClasses);
      }
    }, false);

    document.addEventListener("drop", event => {
      console.log(event.type);
      event.preventDefault();
      if (dnd.dragged == null) {
        return;
      }
      if (event.target.classList.contains("day") && !event.target.classList.contains("inactive")) {

        const movedFromParent = dnd.dragged.parentNode;
        const movedFromDay = movedFromParent.classList.contains("day");

        dnd.dragged.parentNode.removeChild(dnd.dragged);
        event.target.appendChild(dnd.dragged);

        dnd.clearHoverClass(event.target.classList);
        dnd.dragged.classList.remove("active");

        var event = new CustomEvent('taskaddedto', { 'detail': event.target });
        document.dispatchEvent(event);

        if (movedFromDay) {
          var event2 = new CustomEvent('taskremovedfrom', { 'detail': movedFromParent });
          document.dispatchEvent(event2);
        }

        dnd.dragged = null;
      }
    }, false);
    return dnd;
  }
}