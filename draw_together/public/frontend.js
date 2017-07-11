
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//draw a line

var color = 'black';
var size = 3;

function sizeChange(input) {
  size = input;
}
function colorChange(input){
  color = input;
};

//draw function
function draw (past, current, color, size) {
ctx.lineWidth = size;
ctx.strokeStyle = color;
ctx.moveTo(past[0], past[1]);  //gets an x and y position
ctx.quadraticCurveTo(   //smooths your lines out
  past[0], past[1],
  current[0], current[1]  //draws a curve from previous point to the current point
);
ctx.stroke();
ctx.closePath();
}

function eventDraw(){
var current;
var past;
var mouse_down = false;
canvas.addEventListener('mousedown', function (event) {
mouse_down = true;
});
canvas.addEventListener('mouseup', function (event) {
mouse_down = false;
past = null;   //clears out past
});
canvas.addEventListener('mousemove', function (event) {
if (mouse_down) {
  current = [event.offsetX, event.offsetY];
  if (past) {
    draw(past, current, color, size);
  }
  socket.emit('draw', past, current, color, size);
  past = [event.offsetX, event.offsetY];
}
});
}
eventDraw();

$(function () {
  socket.on('draw', function(past, current, color, size) {
    draw(past, current, color, size);
  });
});
