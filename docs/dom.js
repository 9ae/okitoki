function registerEventByClass(className, event, listener) {
	var elements = document.getElementsByClassName(className);
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener(event, listener);
	}
}

function createElement(tag, classes = null, attributes = null) {
	var element = document.createElement(tag);
	if (classes != null) {
		for (var i = 0; i < classes.length; i++) {
			element.classList.add(classes[i]);
		}
	}

	if (attributes != null) {
		for (var key in attributes) {
			element.setAttribute(key, attributes[key]);
		}
	}
	return element;
}