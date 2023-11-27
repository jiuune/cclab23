console.log("js is linked!");
let karateChop;
let readyToChop = true;
let backgroundImage;
let fruit1;
let cherryImage;

let fruitImageArray = [];
let numFruitImages = 3;

function preload(){

    karateChop = loadSound("sounds/karate.m4a");
    backgroundImage = loadImage("images/gradient-bkg.png");
    cherryImage = loadImage("images/cherry.png")

    for (let i = 0; i < numFruits; i++){
        let path = "images/fruit" + i + ".png";
        let img = loadImage(path);

        fruitImageArray.push(img);
    }
}

function setup(){   
    let cnv = createCanvas(400, 400);
    cnv.parent("canvasWrapper");
    
    //fruit1 = new Fruit(width/2, height/2, cherryImage);
    for(let i = 0; i < numFruits; i++){
        let f = new Fruit(random(width), random(height), fruitImageArray[0]);

    }
}

function draw(){
    background(0);
    image(backgroundImage, 0, 0, 400, 400);

    if(mouseIsPressed = true){ 
        //distance btw current mouse position & moust position in previous frame
        let distance = dist(pMouseX, pMouseY, mouseX, mouseY); 

        if(distance > 30){
            karateChop.play();
            readyToChop = false;
        }else if (distance < 10) {
            readyToChop = true;
        }

        stroke(255);
        line(pmouseX, pmouseY, mouseX, mouseY);
    }

    Fruit.display();

}

function mousePressed() {
    //karateChop.play();
}

class Fruit{

    constructor(startX, startY, fruitImg){
        this.x = startX;
        this.y = startY;

        this.img = fruitImg;
    }

    display(){
        push();
        translate(this.x, this.y);
        circle(0, 0, 50);

        image(this.img, -25, -25, 50, 50);
    
        pop();

    }
}