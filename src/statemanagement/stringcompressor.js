export default class StringCompressor {
  static DIGITS = '0123456789abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
  static BASE = StringCompressor.DIGITS.length;

  static _getMaxValue(string) {
    let value = 0;

    for (let i = 0; i < string.length; i++) {
      if (string.charAt(i) > value) {
        value = string.charAt(i);
      }
    }

    return value;
  }

  _getBlockSize(bitCount) {
    return Math.floor(Math.log(StringCompressor.BASE) / Math.log(bitCount));
  }

  _compressBlock(block) {
    return StringCompressor.DIGITS.charAt(block);
  }

  _decompressBlock(block) {
    return StringCompressor.DIGITS.indexOf(block);
  }

  compress(string) {
    let remainingString = string;
    const bits = Number(StringCompressor._getMaxValue(string)) + 1;
    const blockSize = this._getBlockSize(bits);
    let compressedString = '';

    while (remainingString.length > 0) {
      const block = remainingString.slice(-blockSize);
      const numericBlock = Number.parseInt(block, bits);
      compressedString = this._compressBlock(numericBlock) + compressedString;

      remainingString = remainingString.slice(0, -blockSize);
    }

    return compressedString;
  }

  decompress(string, bits) {
    const blockSize = this._getBlockSize(bits);

    let decompressedString = '';
    for (let i = 0; i < string.length; i++) {
      const numericBlock = this._decompressBlock(string[i]);
      let block = numericBlock.toString(bits);

      while (block.length < blockSize) {
        block = `0${block}`;
      }

      decompressedString += block;
    }

    return decompressedString;
  }
}
