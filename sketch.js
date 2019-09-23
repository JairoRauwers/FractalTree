/*jshint esversion: 8 */

// global variables 
var angle = Math.PI / 4;
var bgR = 61;
var bgG = 61;
var bgB = 61;
var treeR = 158;
var treeG = 75;
var treeB = 232;

// build in function
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    drawConfigurator();
}


function draw() {
    //Configurator
    configurator();

    background(bgR, bgG, bgB);

    // Drawing Tree
    stroke(treeR, treeG, treeB);
    strokeWeight(2);
    translate(width / 2, height - 20);
    branch(200);

}

function drawConfigurator() {
    /*  Buttons  */
    treeColorButton = createButton("Random Tree Collor");
    bgButton = createButton("Random Background Collor");
    treeColorCb = createCheckbox('Auto Run', false);
}

function configurator() {
    // Buttons Config 
    treeColorButton.position(20, 20);
    treeColorButton.mousePressed(treeColor);

    bgButton.position(20, 20 + treeColorButton.height);
    bgButton.mousePressed(bgColor);

    treeColorCb.position(treeColorButton.width + 20, 20);
    treeColorCb.color = "White";
    treeColorCb.font = "Arial";

    // text Info / name
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Fractal Tree", width / 2, 50);
    ctx.font = "10px Arial";
    ctx.fillText("Made by Jairo Rauwers, Using P5.js", width / 2, 60);


    // checkBox ifs
    if (treeColorCb.checked() == true) {
        if (treeR > 256) { treeR++; }
        if (treeG > 256) { treeG++; }
        if (treeB > 256) { treeB++; }
        if (treeR > 255 && treeG > 255 && treeB > 255) {
            treeR = 0;
            treeG = 0;
            treeB = 0;
        }
    }

    // buttons Functions
    function bgColor() {
        bgR = random(255);
        bgG = random(255);
        bgB = random(255);
    }

    function treeColor() {
        treeR = random(255);
        treeG = random(255);
        treeB = random(255);

    }

}

// extra functions
function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 4) {
        push();
        rotate(angle);
        branch(len * 0.67);
        pop();
        push();
        rotate(-angle);
        branch(len * 0.67);
        pop();
    }
}