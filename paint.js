var canvas = document.getElementById('myCanvas');
var clean = document.getElementById('btnClean');
var save = document.getElementById('btnSave');
var download = document.getElementById('btnDownload');
var ctx = canvas.getContext('2d');

var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

ctx.lineWidth = 3;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = '#2a2a2a';

canvas.addEventListener('mousedown', function(e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
    canvas.removeEventListener('mousemove', onPaint, false);
}, false);

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};

/*----------- Limpiar canvas -----------*/

clean.addEventListener('click', function(){
  ctx.clearRect(0,0, canvas.width, canvas.height);
},false);

/*----------- Cargar visualizacion de dibujo y poder descargar -----------*/

save.addEventListener('click', function(){
  var dataURL = canvas.toDataURL();
  document.getElementById('canvasImg').src = dataURL;
  download.href = dataURL;
});
