// Core logic for the Grade Average Calculator (kept separate from the page so CI can test it).
function calculateAverage(grades) {
  if (!Array.isArray(grades) || grades.length === 0) return null; // empty list: no average, not NaN
  const total = grades.reduce((sum, g) => sum + g, 0);
  return total / grades.length;
}

// Uses the UNROUNDED average so 89.5 is never shown as "90" next to a B.
function letterGrade(average) {
  if (average === null) return null;
  if (average >= 90) return 'A';
  if (average >= 80) return 'B';
  if (average >= 70) return 'C';
  if (average >= 60) return 'D';
  return 'F';
}

if (typeof module !== 'undefined') module.exports = { calculateAverage, letterGrade };
