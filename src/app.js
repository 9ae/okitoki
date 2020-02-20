const LOCAL_STORAGE_KEY = 'okitokitasks';

window.onload = function(){
	init();

	DnD.register();
	DayListCreator.register();
	TaskCreator.register();

	document.addEventListener('daycreated', (event) => {
		HeightAdjust.day(event.detail);
	});

	document.addEventListener('taskcreated', (event) => {
		HeightAdjust.task(event.detail);
	});

	document.addEventListener('taskaddedto', (event) => {
		(new DayList(event.detail)).updateHours();
	});

	document.addEventListener('taskremovedfrom', (event) => {
		(new DayList(event.detail)).updateHours();
	});
};

function init(){
	DayListCreator.create(new Date(), 8);
	
	Dark.getTasks(function(tasks){
		tasks.map(t => TaskCreator.createUnalloc(t.title, t.est, t.key))
	})
	
	HeightAdjust.refresh();
}

function objectifyTasks(tasks){
	let todo = [];
	for(var i=0; i<tasks.length; i++){
		let e = tasks[i];
		todo.push( {
			'time': parseFloat(e.getAttribute('data-hours')),
			'title': e.getElementsByClassName('title')[0].innerHTML
		});
	}
	return todo;
}

function saveState(){
	let backlog = document.getElementById('backlog');
	let tasks = backlog.getElementsByClassName('task');
	let todo = objectifyTasks(tasks);
	
	let lists = [];
	let days = document.getElementsByClassName('day');
	for(var j=0; j<days.length; j++){
		let daylist = days[j];
		let capacity = parseFloat(daylist.getAttribute('data-hours'));
		let name = daylist.getElementsByTagName('h1')[0].innerHTML;
		let tasks = objectifyTasks(daylist.getElementsByClassName('task'));

		lists.push({
			'name': name,
			'capacity': capacity,
			'tasks': tasks
		});
	}

	let result = JSON.stringify({
		'unsorted': todo,
		'days': lists
	});

	localStorage.setItem(LOCAL_STORAGE_KEY, result);
}

function loadState(json){

	json['unsorted'].forEach((task) => {
		TaskCreator.createUnalloc(task.title, task.time);
	});

	let days = json['days'];
	days.forEach((day) => {
		let e = DayListCreator.create(day.name, day.capacity);
		let dayList = new DayList(e);
		day.tasks.forEach((task) =>{
			dayList.addTask(task.title, task.time);
		});
		dayList.updateHours();
	});
}

function clearState(){
	localStorage.clear();
	window.location.reload();	
}