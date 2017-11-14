import getMinValueIndex from './getminvalueindex-polyfill';

test('gets the minimum index of an array', () => {
    const testArray = [0, 1, 2, 3, 4];
    expect(getMinValueIndex(testArray)).toBe(0);
});