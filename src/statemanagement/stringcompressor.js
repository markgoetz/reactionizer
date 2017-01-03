export default class StringCompressor {
  constructor() {
    this.DIGITS = '0123456789abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
    this.BASE = this.DIGITS.length;
  }

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
    return Math.floor(Math.log(this.BASE) / Math.log(bitCount));
  }

  _compressBlock(block) {
    return this.DIGITS.charAt(block);
  }

  _decompressBlock(block) {
    return this.DIGITS.indexOf(block);
  }

  compress(string) {
    let remainingString = string;
    const bits = Number(this._getMaxValue(string)) + 1;
    const blockSize = this._getBlockSize(bits);
    let compressedString = '';

    while (string.length > 0) {
      const block = string.slice(-blockSize);
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
