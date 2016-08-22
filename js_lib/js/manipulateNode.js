// parent_node의 맨 앞에 insert_node 삽입
function fPrependChild(parent_node, insert_node) {
	parent_node.insertBefore(insert_node, parent_node.firstElementChild);
}

// target_node의 바로 다음에 insert_node 삽입
function fInsertAfter(target_node, insert_node) {
	let next_node = target_node.nextSibling;
	let parent_node = target_node.parentNode;
	if( next_node ) {
		parent_node.insertBefore(insert_node, next_node);
	} else {
		parent_node.appendChild(insert_node);
	}
}

// target_node를 제거
function fRemoveNode(target_node) {
	target_node.parentNode.removeChild(target_node);
}


function fReplaceNode(target_1, target_2) {
	if(target_1.parentNode) {
		var temp = target_2.cloneNode(true);
		fInsertAfter(target_1, temp);
	}
	target_2.parentNode.replaceChild(target_1, target_2);
}
function fReplaceHTML(target_1, target_2) {
	var temp = target_2.outerHTML;
	target_2.outerHTML = target_1.outerHTML;
	target_1.outerHTML = temp;
}


// element의 노드를 attribute 생성 속성값은 배열로 받는다. 
function fCreateNode(element, attribute) {
	let node = document.createElement(element);
	if(attribute) {
		for(let i in attribute) {
			let attribute_split = attribute[i].split(":");
			node.setAttribute(attribute_split[0], attribute_split[1]);
		}
	}
	return node;
}

function fInsertText(element, text) {
	element.innerText = text;
}