// Run with: node test.js
const assert = require("assert");
const { calculateAverage, letterGrade } = require("./grades.js");

function check(label, got, want) {
  assert.strictEqual(got, want, label + ": got " + got + ", want " + want);
  console.log("PASS", label, "->", got);
}
const r2 = (x) => Math.round(x * 100) / 100;

// Example 1: simple average of 85, 90, 78 = 253/3 = 84.33 -> B
let c1 = [{grade: 85, credits: 1}, {grade: 90, credits: 1}, {grade: 78, credits: 1}];
check("Ex1 average", r2(calculateAverage(c1, false)), 84.33);
check("Ex1 letter", letterGrade(calculateAverage(c1, false)), "B");

// Example 2: 95, 92, 91 = 278/3 = 92.67 -> A
let c2 = [{grade: 95, credits: 1}, {grade: 92, credits: 1}, {grade: 91, credits: 1}];
check("Ex2 average", r2(calculateAverage(c2, false)), 92.67);
check("Ex2 letter", letterGrade(calculateAverage(c2, false)), "A");

// Optional weighted: (90*4 + 70*2)/6 = 83.33 -> B
let c3 = [{grade: 90, credits: 4}, {grade: 70, credits: 2}];
check("Weighted average", r2(calculateAverage(c3, true)), 83.33);

// Edge cases
check("Empty list", calculateAverage([], false), null);
check("Boundary 90", letterGrade(90), "A");
check("Boundary 89.99", letterGrade(89.99), "B");
check("Boundary 59.9", letterGrade(59.9), "F");
console.log("\nAll tests passed.");
