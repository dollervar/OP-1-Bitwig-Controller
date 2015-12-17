function toHexStr(str) {
	var array = []
    for (var i = 0; i < str.length; i++){
        array[i] = str.charCodeAt(i);//.toString(16);
		return array
	};
}
