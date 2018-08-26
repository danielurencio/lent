var canvas = document.querySelector('canvas');
var header = document.querySelector('div#header');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var squareN = 30;
var size = window.innerWidth / squareN;

var step = 0;
var redIntensity = 255;
var colorObj = 215;
var mult = colorObj / window.innerWidth;

var mouseClicked = false;
var x,y,x_,y_;


canvas.style.background = 'linear-gradient(to right, rgb(255,0,100), rgb(255,' + colorObj + ',100))';
var reds = 'rgb(' + redIntensity +','+ 0+ x*mult + ',100)';
var grays = 'rgb('+0+x*mult+','+0+x*mult+ ','+0+x*mult + ')';


header.addEventListener('click',function(event) {


});


canvas.addEventListener('mousedown',function(event) {
		x_ = event.clientX / size;
		x_ = Math.floor(x_);

		y_ = event.clientY / size;
		y_ = Math.floor(y_);

		mouseClicked = !mouseClicked;
},false);



canvas.addEventListener('mouseup',function(event) {
	mouseClicked = !mouseClicked;
},false);



var a = 0;
function draw() {

	ctx.clearRect(0,0,canvas.width,canvas.height);

	for(var x=step; x<window.innerWidth; x += (size+step) ) {
	  for(var y=step; y<window.innerHeight; y += (size+step) ) {

		ctx.fillStyle = 'rgb(' + redIntensity +','+ 0+ x*mult + ',100)';
		//ctx.fillStyle = 'rgb('+0+x*mult+','+0+x*mult+ ','+0+x*mult + ')';
		ctx.fillRect(x,y,size,size);

	  }
	}


	if(mouseClicked) {
		a = .5;
		ctx.fillStyle = 'rgba(255,255,255,'+a+')';
		ctx.fillRect(x_*(size+step),y_*(size+step),size,size);
	} else {
		ctx.fillStyle = 'rgba(255,255,255,'+a+')';
		var b = Math.round(Math.random()*2)-1;
		var c = Math.round(Math.random()*2)-1;

		ctx.fillRect((x_+b)*(size+step),(y_+c)*(size+step),size,size);
		a -= 0.02
	}


	ctx.stroke();

	window.requestAnimationFrame(draw);
};



window.requestAnimationFrame(draw);

window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	size = window.innerWidth / squareN;
	mult = colorObj / window.innerWidth;

};
