var h;
var w;
var res = 100;
var gspeed=10;

var pool = [];


var setup = function(){
  colorMode(HSB, 360,1,1)
  frameRate(20);
  createCanvas(w,h);
  createCanvas(windowWidth, windowHeight);
  w = windowWidth;
  h = windowHeight;
  angleMode(DEGREES);
  init({interval:res, speed:gspeed});

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


var bw= 0;
var a = 0;

var init = function(r){
  res = r.interval;
  gspeed = r.speed;
  for(var i=0; i<w; i+=res){
    for(var j=0; j<h; j+=res){
      var p = new Shape(i,j, random(360));
      pool.push(p);
    }
  }
}



clicked= function(mx,my){
  pool = [];
  interval = w/floor(map(mx,0,w,1,20));
  speed = map(my,h,0,1,50);
  console.log(interval);
  init({interval:interval, speed:speed});
}



var touchEnded= function(){
  clicked(mouseX,mouseY);
}

var draw = function(){

  bcol = color(0,0,0);
  fcol = color(0,0,1);

  background(bcol);



  for(var i=0;i<pool.length; i++){
    var p = pool[i];
    p.update();
    p.render();
  }

}




function Shape(x,y, angle){
  this.x = x;
  this.y = y;
  this.par =random(360);
  this.radius = res/2;
  this.thickness = 100;
  this.angle = angle;
  this.angle_speed=map(Math.abs(h/2-this.y),0,h/2,10,0);
  var maxval= this.radius*2 ;
  var minval = this.radius*0.8;
  this.direction = -1;
  if(random()<0.5){this.direction=1}

  this.update = function(){
   // this.radius+=(this.direction*5);

    if(this.radius>maxval || this.radius<minval){
        this.direction*=-1;
    }


    this.angle+=this.angle_speed;

  }

  this.render = function(){
    i=this.radius*(1+cos(frameCount*gspeed+((this.x+this.y+1)/100)+this.par));
    push();
    translate(this.x, this.y);
    fill(fcol);
    noStroke();
    rect(0,i,this.radius*2,i);
    pop();
  }
}
