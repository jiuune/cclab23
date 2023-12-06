console.log("js is linked!");

let atoms = [];
let numAtoms = 3;

let fruitImages = [];

function preload(){
    // let img = loadImage(IMAGE_PATH);

    for(let i = 0; i < 3; i++){
        let path = "images/fruit" + i + ".png"; 
        console.log(path);

        fruitImages[i] = loadImage(path); 
    }
}

function setup(){   
    let cnv = createCanvas(800, 400);
    cnv.parent("canvasWrapper");

    for(let i = 0; i < numAtoms; i++){
        let ran = floor(random(0, 3));
        atoms.push(new Atom(fruitImages[ran]))
     }
    
    rectMode(CENTER);
}

function draw(){
    background(0);

    if(random() < 0.02){
        let ran = floor(random(0, 3));
        atoms.push(new Atom(fruitImages[ran]))
    }

    for(let i = 0; i < atoms.length; i++){

        let currentAtom = atoms[i];

        currentAtom.display();
        currentAtom.fly();
        currentAtom.checkIfOnCanvas();
        // atoms[i].checkIfTouched(mouseX, mouseY);

        currentAtom.isTouched = false;
        
        for(let j = 0; j < atoms.length; j++){
            if(i != j && currentAtom.isTouched == false){

                let otherAtom = atoms[j];
                let otherX = otherAtom.x;
                let otherY = otherAtom.y;
    
                currentAtom.checkIfTouched(otherX, otherY);
            }

            
        }
        
    }

    for(let i = atoms.length -1 ; i >= 0; i--){
        let currentAtom = atoms[i];

        if(currentAtom.isOnCanvas == false){
            atoms.splice(i, 1);
        }
    }

    fill(255);
    text(atoms.length, 200, 100);

}

class Atom{
    //dont need parameters for constructor bc atom is not in specific spot 
    constructor(fruitImage){
       
        this.img = fruitImage;

        this.x = width/2;
        this.y = random(0, height);
        this.size = 40;
        this.speed = random(4, 7);
        this.direction = random([-1, 1]); 

        if(this.direction == -1){
            this.x = width + 100;
        }else{
            this.x = - 100;
        } 

        this.isTouched = false;
        this.isOnCanvas = true;
    }

    display(){
        push();

        translate(this.x, this.y);

        if(this.isTouched == true){
            fill('red');
        }else {
            fill('white');
        }

        //rect(0, 0, this.size, this.size);

        push();
        scale(0.15);
        image(this.img, -this.img.width/2, -this.img.height/2);
        pop();


        //fill('red');
        //circle(0, 0, 5);

        pop();
    }

    fly(){
        this.x += this.speed*this.direction;
    }

    checkIfTouched(otherX, otherY){
        //bigger than left edge, smaller than right edge, bigger than upper edge, smaller than lower edge 
        
        let leftEdge = this.x - this.size/2;
        let rightEdge = this.x + this.size/2;
        let upperEdge = this.y - this.size/2;
        let lowerEdge = this.y + this.size/2;

        if(otherX > leftEdge && otherX < rightEdge && otherY > upperEdge && otherY < lowerEdge){
            this.isTouched = true;
        }else{
            this.isTouched = false;
        }
    }

    checkIfOnCanvas(){
        if (this.x < -500 || this.x > width + 500){
            this.isOnCanvas = false;
        }
    }

}