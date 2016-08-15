function isType(data) {
	return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
}

function equal(data1, data2) {
	return data1 == data2;
}

function strictEqual(data1, data2) {
	return data1 === data2;
}

function validate(data, type) {
	if( isType(type) != "string" ) { throw new Error("type parameter only string") }

	return strictEqual( isType(data), type);
}