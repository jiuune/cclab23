let waterfalls = [];
let numWaterfall = 100;
let numParticles = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);

  for(let i = 0; i < numWaterfall; i++){
    waterfalls.push(new Waterfall(width, height))
  }
}

function draw() {
  
  for(let i = 0; i < waterfalls.length; i++){
    waterfalls[i].update();
    waterfalls[i].display();
  }
}

class Waterfall{
  constructor(startX, startY){
    this.x = random(width);
    this.y = 0;
    this.dia = random(5, 30);
    this.c = color(255, random(100,255), random(100,255), 30);
    this.speedY = random(1, 4);
  }
  
  update(){
    this.y+=this.speedY;
    
    //re-appear
    if(this.y > height){
      this.y = 0;
      this.x = random(width);
      this.dia = random(5, 20);
      this.c = color(255, random(100,255), random(100,255), 30);
        }
    
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    circle(0, 0, this.dia);
    pop();
  }
}

class MovingWaterfall{
  constructor(startX, startY){
    this.x = random(width);
    this.y = 0;
    this.dia = random(1, 5);
    this.c = color(random(50,255), random(0, 200), random(150,255), 80);
    this.speedY = random(1, 3);
    this.curve = 0.04
    this.diaChange = -0.1;
  }
    
  update(){
    this.y+=this.speedY;
    this.dia = this.dia + this.diaChange
    
    //re-appear
    if(this.y > height){
      this.y = 0;
      this.x = random(width);
      this.dia = random(1, 5);
      this.c = color(random(50,255), random(0, 200), random(150,255), 80);
      this.dia = this.dia + this.diaChange
      this.curve += 0.01;
    }
    
    if(this.dia > 5 || this.dia < 1){
      this.diaChange = - this.diaChange;
    }
    
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    let yOffset = sin(this.y * this.curve) *20;
    circle(yOffset, 0, this.dia);
    pop();
  }
}
class OrbWaterfall{
  constructor(startX, startY){
    this.x = random(width);
    this.y = 0;
    this.dia = random(5, 20);
    this.c = color(random(0, 255), random(100,255), random(100,255), 40);
    this.speedY = random(1, 4);
    this.diaChange = 1;
  }
  
  update(){
    this.y+=this.speedY;
    this.dia = this.dia + this.diaChange
    
    //re-appear
    if(this.y > height){
      this.y = 0;
      this.x = random(width);
      this.dia = random(5, 20);
      this.c = color(random(0,255), random(100,255), random(100,255), 40);
      this.diaChange = 1;
        }
    
    if (this.dia > 20 || this.dia < 5){
      this.diaChange = - this.diaChange;
    }
    
  }
  display(){
    push();
    translate(this.x, this.y);
    fill(this.c);
    noStroke();
    circle(0, 0, this.dia);
    pop();
  }
}

function mousePressed(){
  for(let i = 0; i< numParticles; i++){
    waterfalls.push(new MovingWaterfall(random(width), 0))
  }
}

function keyPressed(){
  if(key == 'a'){
    for(let i = 0; i< numParticles; i++){
      waterfalls.push(new OrbWaterfall(random(width), 0))
    }
  }
}
