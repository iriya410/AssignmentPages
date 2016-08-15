function camelCase(property) {
	return property.replace(/-./g, function(select) {
		return select.replace(/-/, "").toUpperCase();
	});
}