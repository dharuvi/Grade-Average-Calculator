(function () {
  var KEY = "gradeCalc.v1";
  var state = { courses: [], weighted: false };

  var form = document.getElementById("add-form");
  var nameEl = document.getElementById("name");
  var gradeEl = document.getElementById("grade");
  var creditsEl = document.getElementById("credits");
  var creditsLabel = document.getElementById("credits-label");
  var weightedEl = document.getElementById("weighted");
  var listEl = document.getElementById("list");
  var emptyEl = document.getElementById("empty");
  var errorEl = document.getElementById("error");
  var avgEl = document.getElementById("avg");
  var letterEl = document.getElementById("letter");

  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(KEY));
      if (saved && Array.isArray(saved.courses)) {
        state.courses = saved.courses;
        state.weighted = !!saved.weighted;
      }
    } catch (e) { /* ignore: start empty */ }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  function render() {
    weightedEl.checked = state.weighted;
    creditsLabel.hidden = !state.weighted;
    listEl.innerHTML = "";
    state.courses.forEach(function (c, i) {
      var li = document.createElement("li");
      var n = document.createElement("span"); n.className = "cname"; n.textContent = c.name;
      var g = document.createElement("span"); g.className = "cgrade"; g.textContent = c.grade + "%";
      li.appendChild(n); li.appendChild(g);
      if (state.weighted) {
        var cr = document.createElement("span"); cr.className = "ccredits";
        cr.textContent = c.credits + " cr"; li.appendChild(cr);
      }
      var d = document.createElement("button");
      d.type = "button"; d.className = "del"; d.textContent = "Delete";
      d.setAttribute("aria-label", "Delete " + c.name);
      d.addEventListener("click", function () { state.courses.splice(i, 1); save(); render(); });
      li.appendChild(d);
      listEl.appendChild(li);
    });
    emptyEl.hidden = state.courses.length > 0;

    var avg = Grades.calculateAverage(state.courses, state.weighted);
    if (avg === null) { avgEl.textContent = "–"; letterEl.textContent = "–"; }
    else {
      avgEl.textContent = avg.toFixed(2) + "%";
      letterEl.textContent = Grades.letterGrade(avg);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameEl.value.trim();
    var grade = parseFloat(gradeEl.value);
    var credits = state.weighted ? parseFloat(creditsEl.value) : 1;
    if (!name) { errorEl.textContent = "Please enter a course name."; return; }
    if (isNaN(grade) || grade < 0 || grade > 100) { errorEl.textContent = "Grade must be a number from 0 to 100."; return; }
    if (state.weighted && (isNaN(credits) || credits <= 0)) { errorEl.textContent = "Credits must be greater than 0."; return; }
    errorEl.textContent = "";
    state.courses.push({ name: name, grade: grade, credits: isNaN(credits) ? 1 : credits });
    save(); render();
    nameEl.value = ""; gradeEl.value = ""; nameEl.focus();
  });

  weightedEl.addEventListener("change", function () {
    state.weighted = weightedEl.checked; save(); render();
  });

  load(); render();
})();
