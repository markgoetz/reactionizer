function StringCompressor() {
	var DIGITS = "0123456789abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
	var BASE = DIGITS.length;

	var _getMaxValue = function(string) {
		var value = 0;

		for (var i = 0; i < string.length; i++) {
			if (string.charAt(i) > value)
				value = string.charAt(i);
		}

		return value;
	};

	var _getBlockSize = function(bit_count) {
		return Math.floor(Math.log(BASE) / Math.log(bit_count));
	};

	var _compressBlock = function(block) {
		return DIGITS.charAt(block);
	};

	var _decompressBlock = function(block) {
		return DIGITS.indexOf(block);
	};

	this.compress = function(string) {
		var bits = Number(_getMaxValue(string)) + 1;
		var block_size = _getBlockSize(bits);
		var compressed_string = "";

		while (string.length > 0) {
			var block = string.slice(-block_size);
			var numeric_block = Number.parseInt(block, bits);
			compressed_string = _compressBlock(numeric_block) + compressed_string;

			string = string.slice(0,-block_size);
		}

		return compressed_string;
	};

	this.decompress = function(string, bits) {
		var block_size = _getBlockSize(bits);

		var decompressed_string = "";
		for (var i = 0; i < string.length; i++) {
			var numeric_block = _decompressBlock(string[i]);
			var block = numeric_block.toString(bits);

			while (block.length < block_size) {
				block = "0" + block;
			}

			decompressed_string = decompressed_string + block;
		}

		return decompressed_string;
	};
}

module.exports = StringCompressor;
