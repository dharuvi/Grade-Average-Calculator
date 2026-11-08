const test = require('node:test');
const assert = require('node:assert');
const { calculateAverage, letterGrade } = require('../grade.js');

// The two worked examples for the report (checked by hand first).
test('example 1: 85, 92, 78 averages 85 and is a B', () => {
  const avg = calculateAverage([85, 92, 78]); // 255 / 3
  assert.strictEqual(avg, 85);
  assert.strictEqual(letterGrade(avg), 'B');
});

test('example 2: 90 and 89 average 89.5 and stay a B (boundary case)', () => {
  const avg = calculateAverage([90, 89]);
  assert.strictEqual(avg, 89.5);
  assert.strictEqual(letterGrade(avg), 'B');
});

test('deleting the last course gives no average instead of NaN', () => {
  assert.strictEqual(calculateAverage([]), null);
  assert.strictEqual(letterGrade(null), null);
});

test('letter grade lines fall where expected', () => {
  assert.strictEqual(letterGrade(90), 'A');
  assert.strictEqual(letterGrade(59.9), 'F');
});
