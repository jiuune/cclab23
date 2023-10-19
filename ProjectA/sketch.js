let bubbles = [];
let octopi = [];
let bubbleAmount = 100;
let octopiAmount = 5;
let octX = 0;
let scubaX = 100;
let scubaY = 580;
let scubaMove = 3;

function setup() {
  createCanvas(600, 600);
  background('#BCCEA7C6');
  
  for (let i = 0; i < bubbleAmount; i+=1 ){
    let bubble = {
      x: random(0, 600), 
      y: 600 - 10 , 
      dia: random(10, 70), 
      speed: random(1, 10)
    };
    bubbles.push(bubble);
  }
  
  for (let i = 0; i < octopiAmount; i++) {
    octopi.push({
      x: random(0, 600),
      y: random(0, 600),
      dia: random(20, 50)
    });
  }
  
  
  angleMode(DEGREES);
}

function draw() {
  background('#BCCEA7C6');
  
  //first half bubbleAmount in the front
  for(let i =0; i < bubbles.length / 2; i++){
    drawBubble(bubbles[i]);
  }
  
  for(let i = 0; i < octopi.length; i++) {
      drawOctopus(octopi[i]);
  }
  
  //placed here so text is behind some bubbles 
  textSize(20);
  text("OCTOPUS ESCAPE!!!", 600/2.5, 50);
  textSize(15);
  text("pop the bubbles so that scuba divers can take a clear picture of the octopi!", 600/5, 70);
  
  //second half bubbleAmount in the back
  for(let i = bubbles.length / 2; i < bubbles.length; i++) {
    drawBubble(bubbles[i]);
  }
  
  //octopi movement 
  octX += 5;
  
  //calls scubadiver
  scubaDiver();
}

function drawBubble(bubble) {
  push();
  //main bubble
  fill('lightblue');
  stroke('white');
  ellipse(bubble.x , bubble.y, bubble.dia, bubble.dia);
  
  //air bubble 
  fill('white');
  ellipse(bubble.x + (bubble.dia * 0.2), bubble.y  - (bubble.dia * 0.25), bubble.dia /8, bubble.dia /8);
  
  //second air bubble - makes the shape 
  fill('lightblue');
  noStroke();
  ellipse(bubble.x  + (bubble.dia * 0.15), bubble.y  - (bubble.dia * 0.2), bubble.dia /8, bubble.dia /8);
  
  //movement
  bubble.y = bubble.y - bubble.speed;
  
  //re-appear
  if(bubble.y < -100){
    bubble.x = random(0, 600);
    bubble.y = 600 + 200;
  }
  pop();
}

function drawOctopus(octopus) {
  push();
  // translates octopus into its position
  translate(octopus.x, octopus.y);
  
  //head
  fill('#DA9BDA');
  noStroke();

  //first loop - 8 legs
  for(i = 0; i < 8; i++){
    
    //second loop - individual legs 
    for(j = 0; j < 20; j++){ 
      push();
      rotate(45 * i);
      circle(5 * sin(j * 90 + octX), octopus.dia / 2 - j * 10, 20 - j);
      pop();
    }
  }
  
  circle(0, 0, octopus.dia);
  pop();
} 

function mousePressed() {
  //interactive feature - user clicks on bubbles 
  for(i = 0; i < bubbles.length; i++) {
    if (dist(mouseX,mouseY,bubbles[i].x, bubbles[i].y) < bubbles[i].dia / 2){
      bubbles[i].x = 10000; //moves bubble off screen
      bubbles[i].y = 10000; //moves bubble off screen 
    }
  }
}
  
function scubaDiver() {
  push();
  translate(100, scubaY);
  
  //overall face shape 
  noStroke();
  fill('rgb(5,5,50)');
  arc(0, 30, 120, 220, 180, 360, OPEN);
  
  //face
  stroke(1);
  fill('#D5C69D');
  arc(0, -27, 60, 75, 220, 320, OPEN); 
  arc(0, -27, 60, 75, 10, 170, OPEN);
  
  //outer goggles 
  stroke('white');
  fill('#7B84BA');
  strokeWeight(2);
  beginShape();
  curveVertex(5, -49);
  curveVertex(5, -49);
  curveVertex(-28, -47);
  curveVertex(-40, -32);
  curveVertex(-40, -18);
  curveVertex(-18, -10);
  curveVertex(-1, -20);
  curveVertex(17, -10);
  curveVertex(40, -18);
  curveVertex(41, -32);
  curveVertex(29, -47);
  curveVertex(5, -49);
  curveVertex(5, -49);
  endShape();
  
  // //guide circles 
  // fill('red');
  // circle(105, 341, 5);
  // circle(72, 343, 5);
  // circle(60, 358, 5);
  // circle (60, 372, 5);
  // circle(82, 380, 5);
  // circle(99, 370, 5);
  // circle(117, 380, 5);
  // circle(140, 372, 5);
  // circle(141, 358, 5);
  // circle(129, 343, 5);
  // circle(86, 340, 5);
  
  //inner googles
  stroke('white');
  fill('#A08FBF');
  strokeWeight(2);
  beginShape();
  curveVertex(3, -41);
  curveVertex(3, -41);
  curveVertex(-15, -42);
  curveVertex(-25, -39);
  curveVertex(-29, -34);
  curveVertex(-30, -25);
  curveVertex(-21, -23);
  curveVertex(-2, -33);
  curveVertex(15, -22);
  curveVertex(29, -27);
  curveVertex(27, -34);
  curveVertex(20, -42);
  curveVertex(3, -41);
  curveVertex(3, -41);
  endShape();
  
  //breathing tube
  stroke('black');
  fill('#518C87');
  strokeWeight(2);
  beginShape();
  curveVertex(-44, -23);
  curveVertex(-44, -23);
  curveVertex(-39, -95);
  curveVertex(-47, -100);
  curveVertex(-55, -95);
  curveVertex(-58, -23);
  curveVertex(-50, -3);
  curveVertex(-31, 9);
  curveVertex(-10, 10);
  curveVertex(-13, 1);
  curveVertex(-10, -3);
  curveVertex(-30, -5);
  curveVertex(-44, -23);
  curveVertex(-44, -23);
  endShape();
  
  //guide circles 
  // fill('red');
  // circle(-44, -23, 5);
  // circle(-39, -95, 5);
  // circle(-47, -93, 5);
  // circle(-55, -95, 5);
  // circle(-58, -23, 5);
  // circle(-50, -3, 5);
  // circle(-31, 9, 5);
  // circle(-10, 5, 5);
  // circle(-13, 1, 5);
  // circle(-10, -3, 5);
  // circle(-30, -5, 5);
  // circle(-44, -23, 5);
  pop(); 
  
  //movement - up & down 
  scubaY = scubaY + scubaMove;  
  
  if(scubaY > 600 + 580) {
    scubaMove = -4;
  } else if(scubaY < 0 + 580) {
    scubaMove = 4;
  }
  
}
