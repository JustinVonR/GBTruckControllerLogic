var width = windowWidth;
var height = width/2;

function setup() {
    
    createCanvas(width,height);
}

function draw() {
    if(windowWidth != width) {
        width = windowWidth;
        height = width/2;
        resizeCanvas(width,height);
    }

}