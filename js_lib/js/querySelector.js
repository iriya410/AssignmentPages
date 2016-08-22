function fQuerySelect(selector, context) {
	return fQuerySelects(selector, context)[0];
}

function fQuerySelects(selector, context) {
	if( typeof selector !== "string") {
		throw new Error("인자는 문자열만 가능");
	}
	
	if(!context) {
		context = document;
	}
	return context.querySelectorAll(selector);
}

function fQuerySelector(selector, context) {
	let select = fQuerySelects(selector, context);

	if(select.length == 1) {
		return select[0];
	} else {
		return select
	}
}

function fQuerySelectItem(selector, context, iterator) {
	if(iterator) {
		return fQuerySelects(selector, context)[iterator];
	} else {
		return fQuerySelector(selector, context);
	}
}