window.onload = function(){
	DnD.register();
	DayListCreator.register();
	TaskCreator.register();
	HeightAdjust.refresh();

	document.addEventListener('daycreated', (event) => {
		HeightAdjust.day(event.detail);
	});

	document.addEventListener('taskcreated', (event) => {
		HeightAdjust.task(event.detail);
	});

};