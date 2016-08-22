function getStyle(element, property, pseudo) {
	if(element.nodeType !== document.ELEMENT_NODE) {
		new error("element 인자는 ELEMENT_NODE여야 한다.")
	}
	if(typeof property !== "string") {
		new error("property 인자는 문자열이여야 한다.");
	}
	if(typeof pseudo !== "string" && pseudo) {
		new error("pseudo 인자는 문자열이여야 한다.")
	}

	if(window.getComputedStyle) {
		return getComputedStyle(element, pseudo)[property];
	} else {
		return element.currentStyle[property];
	}
}