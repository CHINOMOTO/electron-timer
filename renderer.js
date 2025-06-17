const display = document.getElementById("display");
const minInput = document.getElementById("min");
const secInput = document.getElementById("sec");
const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');

let interval = null;
let remaining = 0;
let endTime = null;

function updateDisplay(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  display.textContent = `${m}:${s}`;
}

document.getElementById("start").onclick = () => {
  const min = parseInt(minInput.value, 10);
  const sec = parseInt(secInput.value, 10);
  if (!interval) {
    remaining = min * 60 + sec;
    endTime = Date.now() + remaining * 1000;

    interval = setInterval(() => {
      const now = Date.now();
      remaining = Math.max(0, Math.round((endTime - now) / 1000));
      updateDisplay(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        interval = null;
        audio.play();
      }
    }, 500);
  }
};

document.getElementById("stop").onclick = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
};

document.getElementById("reset").onclick = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  updateDisplay(0);
};

updateDisplay(0);
