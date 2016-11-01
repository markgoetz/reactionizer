if (!Array.prototype.getMinValueIndex) {
	Array.prototype.getMinValueIndex = function() {
		var min_index = 1;
		var min_value = 999999;

		for (var m = 1; m <= this.length; m++) {
			if (this[m] < min_value) {
				min_index = m;
				min_value = this[m];
			}
		}

		return min_index;
	};
}