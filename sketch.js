var h;
var w;
var gres = 100;
var grange;
var gdim;
var t=0;
var tinterval=10;

var pool = [];
var fixed_vals = [1,2,4,8,16,32,64,128,256];


var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(20);
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  grange = 40;
  gdim = floor(w/grange);
  angleMode(DEGREES);
  initKelp();

  //disable default touch events for mobile
  var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", pdefault, false);
  el.addEventListener("touchend", pdefault, false);
  el.addEventListener("touchcancel", pdefault, false);
  el.addEventListener("touchleave", pdefault, false);
  el.addEventListener("touchmove", pdefault, false);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function pdefault(e){
  e.preventDefault()
}

var initKelp = function(){
  pool = [];
  num = floor(w/grange);
  interval = w/num;
  gres = interval;

  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var p = new Shape(i,j, random(360));
      pool.push(p);
    }
  }
  clicked(7*w/8,28*h/30);
}


var redrawKelp= function(interval){
  gres = interval;
  var ydim = pool.length/gdim;
  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var index = i*ydim+j;
      var p = pool[index];
      p.x = i*gres;
      p.y = j*gres;
      p.radius = gres/2;
    }
  }
}



var clicked = function(mx,my){
  mx%=w;
  var possible_states= fixed_vals.filter(function(val){
    return val <= (w/grange);
  });

  index = floor(map(mx,0,w,0,possible_states.length));
  num = possible_states[index];

  interval = w/num;
  tinterval = map(my,h,0,1,50);
  redrawKelp(interval);
}

var touchMoved= function(){
  clicked(touchX,touchY);
}

var touchEnded= function(){
  clicked(touchX,touchY);
}

var draw = function(){

  bcol = color(0,0,0);
  fcol = color(0,0,1);
  background(bcol);

  var ydim = pool.length/gdim;
  for(var i=0; i<w/gres; i+=1){
    for(var j=0; j<h/gres; j+=1){
      var index = i*ydim+j;
      var p = pool[index];
      p.render();
    }
  }
  t+=tinterval;
}

function Shape(i,j, angle){
  this.i = i;
  this.j = j;
  this.x = i*gres;
  this.y = j*gres;
  this.radius = gres/2;
  this.par =random(360);

  this.render = function(){
    i=this.radius*(1+cos(t+((this.x+this.y+1)/100)+this.par));
    push();
    translate(this.x, this.y);
    fill(fcol);
    noStroke();
    rect(0,i,this.radius*2,i);
    pop();
  }
}
