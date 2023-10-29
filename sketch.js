var width = windowWidth;
var height = width/2;
var ptoOn = false;
var roofOpen = false;
var truckStopped = true;

function setup() {
    
    createCanvas(width,height);
}

function draw() {
    if(windowWidth != width) {
        width = windowWidth;
        height = width/2;
        resizeCanvas(width,height);
    }
    if (mouseIsPressed) {
        fill(0);
        stroke(255);
    } else {
        fill(255);
        stroke(0);
    }
    ellipse(mouseX,mouseY,80,80)
}