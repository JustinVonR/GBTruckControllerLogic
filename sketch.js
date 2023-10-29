/*Misc. state variables*/
var width;
var height;
var hydraulicsOn = false;
var roofOpen = false;
var truckStopped = false;
var runHopper = false;

var compactorOn = false;
var blowerOn = false;
var cuttingBladeOn = false;

var uptime = 0;
var firstFrame = true;

/*Delays between component shutoff in milliseconds*/
const delayBladeMs = 3000;
const delayAirMs = 3000;
const delayCompactor = 10000;
const compactorCycleLen = 30000;


function setup() {
    width = windowWidth;
    height = width/2;
    createCanvas(width,height);
    activateHopper();
}

function draw() {
    uptime += floor(deltaTime);
    if(windowWidth != width) {
        width = windowWidth;
        height = width/2;
        resizeCanvas(width,height);
    }
    updateBtnState();
    drawBtns();
    drawIndicators();
    if(truckStopped && hydraulicsOn && roofOpen) {
        if (!runHopper) {
            runHopper = true;
            activateHopper();
        }
    } else {
        runHopper = false;
    }
}

function mouseClicked() {
    if(mouseX >= (width/15) && mouseX <= (width/15+width/4)) {
        if (mouseY >= (width/15) && mouseY <= (width/15+width/20)) {
            hydraulicsOn = !hydraulicsOn;
        }
        if (mouseY >= (width/15+width/10) && mouseY <= (width/15+width/10+width/20)) {
            roofOpen = !roofOpen;
        }
    }
}

function updateBtnState() {
    truckStopped = keyIsDown(32);
}

function drawBtns() {
    textSize(width/40);
    if (hydraulicsOn) {
        stroke(0);
        fill(0,255,100);
    } else {
        stroke(0);
        fill(100,0,0);
    }
    rect(width/15,width/15,width/4,width/20);
    fill(255);
    text('Hydraulics On',width/12,width/15+width/30);
    if (roofOpen) {
        stroke(0);
        fill(0,255,100);
    } else {
        stroke(0);
        fill(100,0,0);
    }
    rect(width/15,width/15+width/10,width/4,width/20);
    fill(255);
    text('Roof Open',width/12,width/15+width/10+width/30);
}

function drawIndicators() {
    textSize(width/40);
    if(compactorOn) {
        fill(255,200,0)
    } else {
        fill(50,50,50)
    }
    circle(width-width/6,width/15+width/40,width/15);
    fill(0);
    text('Compactor Power',width-width/2,width/15+width/40);

    if(blowerOn) {
        fill(255,200,0)
    } else {
        fill(50,50,50)
    }
    circle(width-width/6,width/15+width/40+width/10,width/15);
    fill(0);
    text('Air Blower Power',width-width/2,width/15+width/40+width/10);

    if(cuttingBladeOn) {
        fill(255,200,0)
    } else {
        fill(50,50,50)
    }
    circle(width-width/6,width/15+width/40+2*width/10,width/15);
    fill(0);
    text('Cutting Blade Power',width-width/1.85,width/15+width/40+2*width/10);

    if(truckStopped) {
        fill(0,255,100)
    } else {
        fill(100,0,0)
    }
    circle(width/15*2,width/15+width/40+2.5*width/10,width/15);
    fill(0);
    text('Truck Stopped',width/15,width/15+width/40+2*width/10);
}

async function activateHopper() {
    print('async function running');
    while(runHopper) {
        blowerOn = true;
        cuttingBladeOn = true;
        await wait(delayBladeMs);
    }
    cuttingBladeOn = false;
    await wait(delayAirMs);
    blowerOn = false;
    await wait(delayCompactor);
    if (!runHopper) {
        compactorOn = true;
        await wait(compactorCycleLen);
        compactorOn = false;
    }
}

function wait(msDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, msDuration);
    })
}