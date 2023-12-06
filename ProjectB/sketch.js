// console.log("js is linked!");

let titles = ["decoration", "guest list", "music", "activity"];

let decoImages = [];
let guestImages = [];
let musicImages = [];
let activityImages = [];

let backgrounds = [];

let imagePositions = [];
let stage = 0;
let chosenDeco;
let chosenGuest;
let chosenMusic;
let chosenActivity; 

let choosingState = true;
let counter = 0; 
let newbackground;

let djset;
let playlist;
let speech;
let karaoke; 

let xPos;
let yPos;

function preload(){
  for(let i = 0; i < 4; i++){
      let decoPath = "images/decorations/deco" + i + ".png"; 
      // console.log(decoPath);
      decoImages[i] = loadImage(decoPath); 
  }

  for(let i = 0; i < 4; i++){
    let guestPath = "images/guestlist/guest" + i + ".png";
    // console.log(guestPath);
    guestImages[i] = loadImage(guestPath)
  }

    for(let i = 0; i < 4; i++){
    let musicPath = "images/music/music" + i + ".png"; 
    //console.log(musicPath);
    musicImages[i] = loadImage(musicPath); 
  }

  for(let i = 0; i < 4; i++){
    let activityPath = "images/activities/activity" + i + ".png"; 
    //console.log(activityPath);
    activityImages[i] = loadImage(activityPath); 
  }

  newbackground = loadImage("images/newbackground.png");

  djset = loadSound("audio/peggygou.m4a");
  playlist = loadSound("audio/cafune.mp3");
  speech = loadSound("audio/weddingspeech.mp3");
  karaoke = loadSound("audio/karaoke.m4a");

  // console.log("done preload");
}

function setup() {
  console.log("setup");
  let cnv = createCanvas(1000, 550);
  cnv.parent("canvasWrapper");

  xPos = width / 6;
  yPos = height / 5;

  imagePositions.push(new ImagePosition(xPos * 1.5, yPos));
  imagePositions.push(new ImagePosition(xPos * 3.5, yPos));
  imagePositions.push(new ImagePosition(xPos * 1.5, yPos * 3));
  imagePositions.push(new ImagePosition(xPos * 3.5, yPos * 3));
}

function draw() {
  background(255);

  //new background if user chooses the right must-have items 
  if(counter == 4 && stage > 3){
    image(newbackground, 0, 0, 1000, 550);
  }

  for(let i = 0; i < backgrounds.length; i++) {
    backgrounds[i].display();
  } 

  if(stage <= 3) {
    textSize(20);
    fill(0);
    text("Choose 1 " + titles[stage], 2.5 * width/6, 50);

    fill(255);
    noStroke();
    rect(xPos * 1.5, yPos, 200, 200);
    rect(xPos * 3.5, yPos, 200, 200);
    rect(xPos * 1.5, yPos*3, 200, 200);
    rect(xPos * 3.5, yPos*3, 200, 200);
  }

  if (stage == 0) {
    for (let i = 0; i < 4; i ++) {
      imagePositions[i].display(decoImages[i]);
    }
  } else if (stage == 1) {
    for (let i = 0; i < 4; i ++) {
      imagePositions[i].display(guestImages[i]);
    }
  } else if (stage == 2) {
      for (let i = 0; i < 4; i ++) {
      imagePositions[i].display(musicImages[i]);
    }
  } else if (stage == 3) {
    for (let i = 0; i < 4; i ++) {
    imagePositions[i].display(activityImages[i]);
    }
  }

  //allows users to set position of their selected item
  if(!choosingState) {
    backgrounds[stage - 1].setPosition(mouseX, mouseY);
    backgrounds[stage - 1].display();
  }

  //if users don't choose must-have items they recieve this message 
  if(counter < 4 && stage > 3) {
    textSize(30);
    fill('red');
    text("You failed!! Time to file for bankruptcy!", 1.5 * width/6, 50);
  }
}

function chooseImage(index) {
  if(stage == 0) {
    backgrounds.push(new BackgroundImage(mouseX, mouseY, decoImages[index]));
  } else if(stage == 1) {
    backgrounds.push(new BackgroundImage(mouseX, mouseY, guestImages[index]));
  } else if(stage == 2) {
    backgrounds.push(new BackgroundImage(mouseX, mouseY, musicImages[index]));
  } else if(stage == 3) {
    backgrounds.push(new BackgroundImage(mouseX, mouseY, activityImages[index]));
  }

  choosingState = false;
  stage += 1;
}

function keyPressed() {
  console.log(key);
  if(key == 'a'){
    backgrounds[stage - 1].increaseSize();
  } else if(key == 's') {
    backgrounds[stage - 1].decreaseSize();
  }
}

function mousePressed() {

  if(!choosingState) {
    choosingState = true;

  } else {
    if (mouseX >= xPos * 1.5 && mouseX <= (xPos * 1.5 + 200) && mouseY >= yPos && mouseY <= (yPos + 200)){
      //plays music corresponding with the choice users make 
      if(stage == 2){
        djset.play();
        counter += 1;
      }
      //counter - keeping track of right & wrong choices 
      if(stage == 3){
        counter += 1;
      }
      chooseImage(0);
    } else if(mouseX >= xPos * 3.5 && mouseX <= (xPos * 3.5 + 200) && mouseY >= yPos && mouseY <= (yPos + 200)){
      if(stage == 2){
        playlist.play();
      }
      if(stage == 1){
        counter += 1; 
      }
      chooseImage(1);
    }else if(mouseX >= xPos * 1.5 && mouseX <= (xPos * 1.5 + 200) && mouseY >= yPos * 3 && mouseY <= (yPos * 3+ 200)){
      if(stage == 2){
        speech.play();
      }
      if(stage == 0){
        counter += 1; 
      }
      chooseImage(2);
    } else if(mouseX >= xPos * 3.5 && mouseX <= (xPos * 3.5 + 200) && mouseY >= yPos * 3 && mouseY <= (yPos * 3+ 200)){
      if(stage == 2){
        karaoke.play();
      }
      chooseImage(3);
    }
  }

}

class ImagePosition {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.img = image;
  }
  display(img) {
    push();
    translate(this.x, this.y);
    scale(0.2);
    image(img, 0, 0);
    pop();
  }
}

class BackgroundImage {
  //class for placing user choice in the background 
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.scale = 1;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  increaseSize() {
    this.scale += 0.25;
  }

  decreaseSize() {
    this.scale -= 0.25;
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(this.scale);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }
}

/*
class decorations{
  constructor(img, x, y){
    this.img = img;
    this.x = x;
    this.y = y;
    this.status = true; 
  }
  display(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, 200, 200);
    pop();
  }
}

class guestlist{
    constructor(img, x, y){
      this.img = img;
      this.x = x;
      this.y = y;
    }
    display(){
      push();
      translate(this.x, this.y);
      image(this.img, 0, 0, 200, 200);
      pop();
    }
}

class music{
  constructor(img, x, y){
    this.img = img;
    this.x = x;
    this.y = y;
    this.status = false
  }
  display(){
    push();
    translate(this.x, this.y);
    image(this.img, 0, 0, 200, 200);
    pop();
  }
}
*/
