let canvas = document.querySelector("#canvas");

let intervalID = null;
let flag = false;
let minX = Infinity;
let minY = Infinity;
let maxX = 0;
let maxY = 0;
let firstX = null;
let firstY = null;

const draw = (e) => {
  let ctx = e.target.getContext("2d");
  
  ctx.beginPath();
  
  if (flag && e.target.getContext) {
    if (firstX === null) firstX = e.clientX;
    if (firstY === null) firstY = e.clientY;
    if (maxX < e.clientX) maxX = e.clientX;
    if (minX > e.clientX) minX = e.clientX;
    if (maxY < e.clientY) maxY = e.clientY;
    if (minY > e.clientY) minY = e.clientY;
    ctx.beginPath();
    ctx.arc(e.clientX, e.clientY, 1, 0, 3.14);
    ctx.stroke();
  }

  if (e.type === "click") {
    ctx.clearRect(0, 0, 2000, 2000);
    ctx.closePath();
   
    if (firstX > minX  && firstX < maxX  && firstY > minY && firstY < maxY ) {
      ctx.arc(
        minX + (maxX - minX + maxY - minY) / 4,
        minY + (maxX - minX + maxY - minY) / 4,
        (maxX - minX + maxY - minY) / 4, 0, Math.PI * 2, true);
      ctx.stroke();
    }

    minX = Infinity;
    minY = Infinity;
    maxX = 0;
    maxY = 0;
    firstX = null;
    firstY = null;
  }
};

const setTimer = (e) => {
  flag = true;
  intervalID = setInterval(function () {
    addTime(e);
  }, 1000);
}

const clearTimer = () => {
  flag = false;
  clearInterval(intervalID);
  intervalID = null;
}

const chooseType = (e) => {
  e.type === "mousedown" ? setTimer(e) : clearTimer();
}

canvas.addEventListener("click", draw);
canvas.addEventListener("mousedown",chooseType);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup",chooseType);
