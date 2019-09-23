/*jshint esversion: 8 */

// global variables 
var angle = Math.PI / 4;
var bgR = 61;
var bgG = 61;
var bgB = 61;
var treeR = 158;
var treeG = 75;
var treeB = 232;
var changing = false;
var angleScrow = false;
var speed = 0.01;


// build in function
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    drawConfigurator();
}


function draw() {
    //Configurator
    configurator();

    // Drawing Tree
    stroke(treeR, treeG, treeB);
    strokeWeight(1);
    translate(width / 2, height - 20);
    branch(height / 4);

    //angle varietions
    if (angleScrow) { angle += speed; }

}

function drawConfigurator() {
    /*  Buttons  */
    treeColorButton = createButton("Random Tree Collor");
    bgButton = createButton("Random Background Collor");
    autoRollButton = createButton("Auto Roll");
    angleScrowPlusBtn = createButton("+");
    angleScrowMinBtn = createButton("-");
    treeColorCb = createCheckbox('Auto Run', false);
}

function configurator() {
    // try buttons show 
    if (angleScrow) {
        angleScrowMinBtn.disabled = false;
        angleScrowMinBtn.disabled = false;
    } else {
        angleScrowMinBtn.disabled = true;
        angleScrowMinBtn.disabled = true;
    }

    // Buttons Config 
    treeColorButton.position(20, 20);
    treeColorButton.mousePressed(treeColor);

    bgButton.position(20, 20 + treeColorButton.position().y);
    bgButton.mousePressed(bgColor);
    background(bgR, bgG, bgB); // the background must appear before the text 

    autoRollButton.position(20, 20 + bgButton.position().y);
    autoRollButton.mousePressed(autoRoll);

    angleScrowPlusBtn.position(autoRollButton.position().x + autoRollButton.width, 20 + bgButton.position().y);
    angleScrowPlusBtn.mousePressed(scrowPlus);
    angleScrowMinBtn.position(angleScrowPlusBtn.position().x + angleScrowPlusBtn.width, 20 + bgButton.position().y);
    angleScrowMinBtn.mousePressed(scrowMin);


    // i've set this first then the check buttons, because if i didnt it wil wait one update to appear

    // text Info / name
    var ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Fractal Tree", width / 2, 50);
    ctx.font = "10px Arial";
    ctx.fillText("Made by Jairo Rauwers, Using P5.js", width / 2, 60);



    // Check Buttons
    treeColorCb.position(treeColorButton.width + 20, 20);
    treeColorCb.color = "White";
    treeColorCb.font = "Arial";

    // checkBox ifs
    if (treeColorCb.checked() == true) {
        if (changing == false) {
            if (treeR < 256) { treeR++; } else if (treeG < 256) { treeG++; } else if (treeB < 256) { treeB++; }
        }
        if (changing == true || treeB > 255) {
            changing = true;
            treeR--;
            treeG--;
            treeB--;
            if (treeR == 0) {
                changing = false;
                treeR = 0;
                treeG = 0;
                treeB = 0;
            }
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

    function autoRoll() { if (angleScrow) { angleScrow = false; } else { angleScrow = true; } }

    function scrowMin() { if (speed <= 0.001) { speed = 0.001; } else { speed = speed - 0.001; } }

    function scrowPlus() { speed += 0.001; }

}

// extra functions
function branch(len) {
    var lenMin = 0.65;
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 20) {
        push();
        rotate(angle / 2);
        branch(len * lenMin);
        pop();
        push();
        rotate(-angle / 2);
        branch(len * lenMin);
        pop();
        push();
        rotate(angle);
        branch(len * lenMin);
        pop();
        push();
        rotate(-angle);
        branch(len * lenMin);
        pop();
    }
}