const DIGITS = '0123456789abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_';
const BASE = DIGITS.length;

function getMaxValue(string) {
  let value = 0;

  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) > value) {
      value = string.charAt(i);
    }
  }

  return value;
}

function getBlockSize(bitCount) {
  return Math.floor(Math.log(BASE) / Math.log(bitCount));
}

function compressBlock(block) {
  return DIGITS.charAt(block);
}

function decompressBlock(block) {
  return DIGITS.indexOf(block);
}

export function compress(string) {
  let remainingString = string;
  const bits = Number(getMaxValue(string)) + 1;
  const blockSize = getBlockSize(bits);
  let compressedString = '';

  while (remainingString.length > 0) {
    const block = remainingString.slice(-blockSize);
    const numericBlock = Number.parseInt(block, bits);
    compressedString = compressBlock(numericBlock) + compressedString;

    remainingString = remainingString.slice(0, -blockSize);
  }

  return compressedString;
}

export function decompress(string, bits) {
  const blockSize = getBlockSize(bits);

  let decompressedString = '';
  for (let i = 0; i < string.length; i++) {
    const numericBlock = decompressBlock(string[i]);
    let block = numericBlock.toString(bits);

    while (block.length < blockSize) {
      block = `0${block}`;
    }

    decompressedString += block;
  }

  return decompressedString;
}
