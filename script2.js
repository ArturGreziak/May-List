const canvas = document.getElementById('canvas');
const newProjectBtn = document.getElementById('new__project');
const sizeInput = document.getElementById('size');
const colorInput = document.getElementById('color');

let context = canvas.getContext('2d');
let isMouseDown = false;
let color = "#000";
let size = 10;
let x,y;

function drawCircle(x, y){
  context.beginPath();
  context.arc(x, y, size, 0, Math.PI * 2);
  context.filleStyle = color;
  context.fill();
}

function drawLine(x1, y1, x2, y2){
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = color;
  context.lineWidth = size * 2;
  context.stroke();
}

newProjectBtn.addEventListener('click', function (e){
  context.clearRect(0, 0, canvas.width, canvas.height);
})

sizeInput.addEventListener('change', function (e){
  size = document.getElementById('size').value;
})

colorInput.addEventListener('change', function (e){
  color = document.getElementById('color').value;
})

canvas.addEventListener("mousedown", function(e){
    isMouseDown = true;

    x = e.offsetX;
    y = e.offsetY;
});

canvas.addEventListener("mousemove", function(e){
    if(!isMouseDown) return;

   let x2 = e.offsetX;
   let y2 = e.offsetY;

   drawCircle(x2, y2);
   drawLine(x, y, x2, y2);

   x = x2;
   y = y2;
})

canvas.addEventListener("mouseup", function(e){
  isMouseDown = false;

  x = null;
  y = null;

})