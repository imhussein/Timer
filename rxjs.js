class Timer {
  constructor(startBtn, pauseBtn, durationInput, interval, events) {
    this.startBtn = startBtn;
    this.pauseBtn = pauseBtn;
    this.durationInput = durationInput;
    this.interval = interval;
    if (events) {
      this.onStart = events.onStart;
      this.onComplete = events.onComplete;
      this.onPause = events.onPause;
      this.onTick = events.onTick;
    }
    this.startBtn.addEventListener("click", this.start);
    this.pauseBtn.addEventListener("click", this.pause);
  }

  get durationValue() {
    return parseFloat(this.durationInput.value);
  }

  set durationValue(value) {
    this.durationInput.value = value.toFixed(2);
  }

  start = () => {
    if (this.onStart) {
      this.onStart();
    }
    this.tick();
    this.timer = setInterval(() => {
      this.tick();
    }, this.interval);
  };

  pause = () => {
    clearInterval(this.timer);
  };

  tick() {
    if (this.durationValue <= 0) {
      this.pause();
      this.durationInput.value = 30;
    } else {
      this.durationValue = this.durationValue - 0.05;
      if (this.onTick) {
        this.onTick();
      }
    }
  }
}

const start = document.getElementById("start");
const pause = document.getElementById("pause");
const duration = document.getElementById("duration");
const circle = document.querySelector("circle");
let currentOffset = 0;
const timer = new Timer(start, pause, duration, 50, {
  onStart() {},
  onTick() {
    circle.setAttribute("stroke-dashoffset", currentOffset);
    currentOffset = currentOffset - 0.05;
  },
  onComplete() {}
});
