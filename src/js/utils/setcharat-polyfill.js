if (!String.prototype.setCharAt) {
	String.prototype.setCharAt = function(index, newChar) {
		return this.substring(0, index).concat(newChar, this.substring(index+1,this.length));
	};
}