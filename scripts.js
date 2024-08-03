let timer1, timer2;
let time1 = 600,
  time2 = 600; // 10 minutos por defecto
let increment1 = 0,
  increment2 = 0;
let activePlayer = 1;
let running = false;

function startClock(minutes, increment) {
  time1 = minutes * 60;
  time2 = minutes * 60;
  increment1 = increment;
  increment2 = increment;
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("time1").textContent = formatTime(time1);
  document.getElementById("time2").textContent = formatTime(time2);
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function startGame() {
  const mode = document.getElementById("mode").value;
  let minutes, increment;
  switch (mode) {
    case "2+1":
      minutes = 2;
      increment = 1;
      break;
    case "3+2":
      minutes = 3;
      increment = 2;
      break;
    case "10":
      minutes = 10;
      increment = 0;
      break;
  }
  startClock(minutes, increment);

  document.getElementById("setup-view").style.display = "none";
  document.getElementById("clock-view").style.display = "flex";

  document.getElementById("player1").style.transform = "rotate(0deg)";
  document.getElementById("player2").style.transform = "rotate(180deg)";

  if (document.getElementById("player1-color").value === "black") {
    activePlayer = 2;
  } else {
    activePlayer = 1;
  }
  running = true;
  if (activePlayer === 1) {
    timer1 = setInterval(() => countdown(1), 1000);
  } else {
    timer2 = setInterval(() => countdown(2), 1000);
  }
}

function switchPlayer(player) {
  if (running && activePlayer === player) {
    if (player === 1) {
      clearInterval(timer1);
      time1 += increment1;
      timer2 = setInterval(() => countdown(2), 1000);
    } else {
      clearInterval(timer2);
      time2 += increment2;
      timer1 = setInterval(() => countdown(1), 1000);
    }
    activePlayer = 3 - activePlayer; // Cambia de 1 a 2 y de 2 a 1
  }
}

function countdown(player) {
  if (player === 1) {
    time1--;
    if (time1 <= 0) {
      clearInterval(timer1);
      running = false;
    }
  } else {
    time2--;
    if (time2 <= 0) {
      clearInterval(timer2);
      running = false;
    }
  }
  updateDisplay();
}

function resetClock() {
  clearInterval(timer1);
  clearInterval(timer2);
  running = false;
  activePlayer = 1;
  document.getElementById("setup-view").style.display = "flex";
  document.getElementById("clock-view").style.display = "none";
  document.getElementById("player1-color").value = "white";
  document.getElementById("player2-color").value = "black";
  updateDisplay();
}

// Event listeners for color selection
document
  .getElementById("player1-color")
  .addEventListener("change", function () {
    if (this.value === "white") {
      document.getElementById("player2-color").value = "black";
    } else {
      document.getElementById("player2-color").value = "white";
    }
  });

document
  .getElementById("player2-color")
  .addEventListener("change", function () {
    if (this.value === "white") {
      document.getElementById("player1-color").value = "black";
    } else {
      document.getElementById("player1-color").value = "white";
    }
  });
