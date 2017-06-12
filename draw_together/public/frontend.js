var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

//draw a line
ctx.strokeStyle = 'red';


var mouse_down = false;

canvas.addEventListener('mousedown', function(event) {
  mouse_down = true;
  console.log('DOWN', event.offsetX, event.offsetY);
});
canvas.addEventListener('mouseup', function (event) {
mouse_down = false;
console.log('UP', event.offsetX, event.offsetY);
});
canvas.addEventListener('mousemove', function (event) {
  if (mouse_down) {
    console.log('MOVE', event.offsetX, event.offsetY);
  }
});

//draw function
function draw (past, current) {
ctx.moveTo(past[0], past[1]);  //gets an x and y position
ctx.quadraticCurveTo(   //smooths your lines out
  past[0], past[1],
  current[0], current[1]  //draws a curve from previous point to the current point
);
ctx.stroke();
ctx.closePath();
}

var current;
var past;
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
    draw(past, current);
  }
  past = [event.offsetX, event.offsetY];
}
});
