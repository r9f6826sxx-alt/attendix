let timetable = {};
let baseA = 0;
let baseT = 0;
let extraA = 0;
let extraT = 0;

function setInitial() {
  baseA = parseInt(document.getElementById("baseA").value);
  baseT = parseInt(document.getElementById("baseT").value);
  update();
}

function addClass() {
  let day = document.getElementById("day").value;
  let subject = document.getElementById("subject").value;
  let hours = parseInt(document.getElementById("hours").value);

  if (!timetable[day]) timetable[day] = [];
  timetable[day].push([subject, hours]);

  alert("Added!");
}

function loadToday() {
  let day = new Date().getDay();
  let list = timetable[day];

  let container = document.getElementById("today");
  container.innerHTML = "";

  if (!list) {
    container.innerHTML = "No classes";
    return;
  }

  list.forEach((c, i) => {
    container.innerHTML += `
      <div class="card">
        ${c[0]}
        <br>
        <button class="present" onclick="markPresent(${i})">Present</button>
        <button class="absent" onclick="markAbsent(${i})">Absent</button>
      </div>
    `;
  });
}

function markPresent(i) {
  let day = new Date().getDay();
  let hours = timetable[day][i][1];

  extraA += hours;
  extraT += hours;
  update();
}

function markAbsent(i) {
  let day = new Date().getDay();
  let hours = timetable[day][i][1];

  extraT += hours;
  update();
}

function update() {
  let totalA = baseA + extraA;
  let totalT = baseT + extraT;

  let percent = totalT === 0 ? 0 : (totalA / totalT) * 100;
  document.getElementById("result").innerText = percent.toFixed(2) + "%";
}

window.onload = loadToday;
