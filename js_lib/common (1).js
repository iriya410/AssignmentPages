// 모던 자바 스크립트 모듈 패턴
(function(global){
	"use strict";
	// Manipulate
	//////////////////////////////////////////////////
	function f_prependChild (parent_node, insert_node) {
		parent_node.insertBefore(insert_node, parent_node.firstElementChild);
	}

	function f_insertAfter(target_node, insert_node) {
		let next_node = target_node.nextSibling;
		let parent_node = target_node.parentNode;
		if( next_node ) {
			parent_node.insertBefore(insert_node, next_node);
		} else {
			parent_node.appendChild(insert_node);
		}
	}

	function f_removeNode(target_node) {
		target_node.parentNode.removeChild(target_node);
	}

	function f_replaceNode(target_1, target_2) {
		if(target_1.parentNode) {
			var temp = target_2.cloneNode(true);
			fInsertAfter(target_1, temp);
		}
		target_2.parentNode.replaceChild(target_1, target_2);
	}
	function f_replaceHTML(target_1, target_2) {
		var temp = target_2.outerHTML;
		target_2.outerHTML = target_1.outerHTML;
		target_1.outerHTML = temp;
	}

	function f_createNode(element, attribute) {
		let node = document.createElement(element);
		if(attribute) {
			for(let i in attribute) {
				let attribute_split = attribute[i].split(":");
				node.setAttribute(attribute_split[0], attribute_split[1]);
			}
		}
		return node;
	}

	function f_insertText(element, text) {
		element.innerText = text;
	}
	//////////////////////////////////////////////////

	// Search
	//////////////////////////////////////////////////
	function f_querySelect(selector, context) {
		return f_querySelects(selector, context)[0];
	}

	function f_querySelects(selector, context) {
		if( typeof selector !== "string") {
			throw new Error("인자는 문자열만 가능");
		}
		
		if(!context) {
			context = document;
		}
		return context.querySelectorAll(selector);
	}

	function f_querySelector(selector, context) {
		let select = f_querySelects(selector, context);

		if(select.length == 1) {
			return select[0];
		} else {
			return select
		}
	}

	function f_querySelectItem(selector, context, iterator) {
		if(iterator) {
			return f_querySelects(selector, context)[iterator];
		} else {
			return f_querySelector(selector, context);
		}
	}

	function f_prevElement(select_element) {
		if(!f_isElement(select_element))
			f_errorMsg("전달된 인자는 요소노드여야 합니다.");

		if(select_element.previousElementSibling)
			return select_element.previousElementSibling;

		do {
			select_element = select_element.previousSibling;
		} while(select_element && !f_isElement(select_element))

		return select_element;
	}

	function f_nextElement(select_element) {
		if(!f_isElement(select_element))
			f_errorMsg("전달된 인자는 요소노드여야 합니다.");

		if(select_element.nextElementSibling)
			return select_element.nextElementSibling;

		do {
			select_element = select_element.nextSibling;
		} while(select_element && !f_isElement(select_element))

		return select_element;
	}

	function f_firstElement(select_element) {
		if(!f_isElement(select_element))
			f_errorMsg("전달된 인자는 요소노드여야 합니다.");

		return select_element.children[0];
	}

	function f_lastElement(select_element) {
		if(!f_isElement(select_element))
			f_errorMsg("전달된 인자는 요소노드여야 합니다.");

		return select_element.children[select_element.children.length - 1];
	}
	//////////////////////////////////////////////////

	// Validate
	//////////////////////////////////////////////////
	function f_isType(data) {
		return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
	}

	function f_equal(data1, data2) {
		return data1 == data2;
	}

	function f_strictEqual(data1, data2) {
		return data1 === data2;
	}

	function f_validateType(data, type) {
		if( f_isType(type) != "string" ) { throw new Error("type parameter only string") }

		return f_strictEqual( f_isType(data), type);
	}

	function f_isElement(element) {
		return f_strictEqual(element.nodeType, 1);
	}

	function f_isElementName(element, name) {
		if(!f_isElement(element))
			f_errorMsg("첫번째 인자는 요소여야 합니다.");

		if(!f_validateType(name, "string"))
			f_errorMsg("두번째 인자는 문자열이여야 합니다.");

		return element.nodeName.toLowerCase() === name;
	}
	//////////////////////////////////////////////////

	// Get
	//////////////////////////////////////////////////
	function f_getStyle(element, property, pseudo) {
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

	function f_getUnit(value) {
		for(var i=0, length=f_getUnit.units.length; i<length; i++) {
			if(value.indexOf(f_getUnit.units[i]) > -1) {
				return f_getUnit.units[i];
			}
		}
		return null;
	}
	f_getUnit.units = "px rem em % vw vh vmin vmax".split(" ");

	function f_removeUnit(value) {
		return value.replace(f_getUnit(value), "")*1;
	}
	//////////////////////////////////////////////////

	// Set
	//////////////////////////////////////////////////
	function f_setStyle(element, property, value) {
		if(element.nodeType !== document.ELEMENT_NODE) {
			new error("element 인자는 ELEMENT_NODE여야 한다.")
		}
		if(typeof property !== "string") {
			new error("property 인자는 문자열이여야 한다.");
		}
		element.stype[property] = value;
	}
	//////////////////////////////////////////////////

	// Taransform
	//////////////////////////////////////////////////
	function f_camelCase(property) {
		return property.replace(/-./g, function(select) {
			return select.replace(/-/, "").toUpperCase();
		});
	}
	//////////////////////////////////////////////////

	// Info
	//////////////////////////////////////////////////
	function f_errorMsg(msg) {
		if(f_isType(msg) !== "string") {
			f_errorMsg("오류 메세지는 문자 데이터 유형이어야 합니다.");
		}
		throw new Error(msg);
	}
	//////////////////////////////////////////////////

	global.as = {
		"f_isType": f_isType,
	};
}(this));