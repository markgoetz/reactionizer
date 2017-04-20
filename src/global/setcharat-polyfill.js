export default function stringSetCharAt(string, index, newChar) {
  return string
    .substring(0, index)
    .concat(
      newChar,
      string.substring(index + 1, string.length),
    );
}
