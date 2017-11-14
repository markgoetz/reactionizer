import stringSetCharAt from './setcharat-polyfill';

test('inserts character into string in the appropriate location', () => {
  const startString = 'test';
  const resultString = stringSetCharAt(startString, 3, 'e');
  expect(resultString).toBe('tese');
});
