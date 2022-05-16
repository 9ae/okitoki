/* Task {
  name: string
  done: bool
  parent: Task | null
  est: float (hrs)
}
*/

/* Session {
  task: Task,
  day: Date
  range: [int, int] start end
} */

/* Day {
  capacity: float (hrs)
  sessions: Session[],
} */

const hrs2Secs = (hrs) => Math.round(hrs * 3600);
const dateKey = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const model = {
  tasks: [],
  dayList: {}
}

const ModelManager = {
  createTask: (name, est = 1) => {
    const obj = { name, done: false, parent: null, est };
    model.tasks.push(obj);
    return obj;
  },
  assignTaskToDate: (task, date) => {
    const sess = {
      task,
      day: date,
      range: [0, 0]
    }
    // TODO check date exist 
    model.dayList[dateKey(date)].sessions.push(sess);
  }
}

export default ModelManager;
