function errorMsg(msg) {
	if(isType(msg) !== "string") {
		errorMsg("오류 메세지는 문자 데이터 유형이어야 합니다.");
	}
	throw new Error(msg);
}