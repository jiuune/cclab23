let bubbles = [];
let octopi = [];
let bubbleAmount = 100;
let octopiAmount = 5;
let octX = 0;
    
function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#BCCEA7C6');
  
  for (let i = 0; i < bubbleAmount; i+=1 ){
    let bubble = {
      x: random(0, width), 
      y: windowHeight + 200, 
      dia: random(10, 70), 
      speed: random(1, 10)
    };
    bubbles.push(bubble);
  }
  
  for (let i = 0; i < octopiAmount; i++) {
    octopi.push({
      x: random(0, width),
      y: random(0, height),
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
  
//   //placed here so text is behind some bubbles 
//   textSize(20);
//   text("OCTOPUS ESCAPE!!!", windowWidth/2.5, 50);
//   textSize(15);
//   text("pop the bubbles so that scuba divers can take a clear picture of the octopi!", windowWidth/5, 70);
  
  //second half bubbleAmount in the back
  for(let i = bubbles.length / 2; i < bubbles.length; i++) {
    drawBubble(bubbles[i]);
  }
  
  //octopi movement 
  octX += 5;
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
  if(bubble.y < 0){
    bubble.x = random(0, width);
    bubble.y = windowHeight + 200;
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
