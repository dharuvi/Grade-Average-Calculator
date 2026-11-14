// Pure calculation logic (no DOM) so it can be tested in Node and used in the browser.
(function (root) {
  // Grades are percentages (0-100). Standard US-style scale.
  function letterGrade(avg) {
    if (avg >= 90) return "A";
    if (avg >= 80) return "B";
    if (avg >= 70) return "C";
    if (avg >= 60) return "D";
    return "F";
  }

  // courses: [{name, grade, credits}]
  // weighted=false -> simple mean; weighted=true -> weighted by credits.
  function calculateAverage(courses, weighted) {
    if (!courses.length) return null;
    if (weighted) {
      var totalCredits = 0, sum = 0;
      courses.forEach(function (c) {
        totalCredits += c.credits;
        sum += c.grade * c.credits;
      });
      return totalCredits > 0 ? sum / totalCredits : null;
    }
    var total = courses.reduce(function (s, c) { return s + c.grade; }, 0);
    return total / courses.length;
  }

  var api = { letterGrade: letterGrade, calculateAverage: calculateAverage };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Grades = api;
})(typeof window !== "undefined" ? window : this);
