export default function getMinValueIndex(a) {
  let minIndex = 0;
  let minValue = 999999;

  for (let m = 0; m < this.length; m++) {
    if (a[m] < minValue) {
      minIndex = m;
      minValue = this[m];
    }
  }

  return minIndex;
}
