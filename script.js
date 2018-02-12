const spacing = window.innerWidth / 40;
const size = 10;
const speed = 5;
var particles = [];

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
  noStroke();
  blendMode(MULTIPLY);
  ellipseMode(CENTER);
  var n = 0;
  for (y = spacing; y <= window.innerHeight - spacing; y+= spacing){
    for (x = spacing; x <= window.innerWidth - spacing; x+= spacing){
      var particle = new Particle(x, y, size, n);
      particles.push(particle);
      n ++;
    }
  }
}

function draw(){
  clear();
  particles.forEach(function(particle){
    particle.draw();
  });
}


function Particle(x, y, size, id){
  this.id = id;
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = color('hsl(' + (round((140 * this.x) / window.innerWidth) + 220) + ', 100%, 50%)');
  this.xDir = ((round(random()) == 1) ? speed : -speed) + round(random(-2, 2));
  this.yDir = ((round(random()) == 1) ? speed : -speed) + round(random(-2, 2));
  this.draw = function(){
    
    fill(this.color);
    this.x += this.xDir;
    this.y += this.yDir;
    if (this.x <= 0 || this.x >= window.innerWidth) this.xDir *= -1;
    if (this.y <= 0 || this.y >= window.innerHeight) this.yDir *= -1;
    ellipse(this.x, this.y, this.size, this.size);
    //this.size *= check(this.x, this.y, this.size, this.id);
  }
}

function check(x, y, size, n){
  var result = 1;
  var index = 0;
  particles.forEach(function(other){
    if (other.id !== n){
      if( abs(x - other.x) < Math.max(size, other.size) / 2 && abs(y - other.y) < Math.max(size, other.size) / 2){
        particles.splice(index, 1);
        result = 1.25;
      }
    }
    index++;
  });
  return result;
}