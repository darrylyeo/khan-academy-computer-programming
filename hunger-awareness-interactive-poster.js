var automaticPlay = false;

var defaultTransitionLength = 50;

var scene = 0;

var frame = function(x, y, s, transitionTime){
    this.x = x;
    this.y = y;
    this.s = s;
    //The transition from the previous frame to *this* frame
    this.transitionTime = transitionTime ? transitionTime : defaultTransitionLength;
    this.timeNeededToComplete = 0;
    this.copy = function(){
        return new frame(x, y, s);
    };
    this.isEqual = function(f){
        return this.x === f.x && this.y === f.y && this.s === f.s;
    };
};

var frames = [
    new frame(0, 0, 1),
    new frame(400, 0, 1, 50),
    new frame(400, 190, 1, 20),
    new frame(0, 190, 1, 20),
    new frame(0, -120, 3/2, 20),
    new frame(0, -160, 2, 20),
    new frame(0, 0, 10, 100),
    new frame(120, 250, 7, 20),
    new frame(0, 0, 15, 50),
    new frame(-400, -100, 1, 50),
    new frame(-70, -100, 3/2, 50),
    new frame(0, -80, 1/8, 50)
];

var currentCam = frames[scene].copy();
currentCam.xSpeed = 0;
currentCam.ySpeed = 0;
currentCam.sSpeed = 0;
    
var camTo = frames[scene].copy();

var setCamSpeed = function(){
    camTo = frames[scene].copy();
    
    currentCam.xSpeed = (camTo.x - currentCam.x) / frames[scene].transitionTime;
    currentCam.ySpeed = (camTo.y - currentCam.y) / frames[scene].transitionTime;
    currentCam.sSpeed = (camTo.s - currentCam.s) / frames[scene].transitionTime;
};

var sceneTimers = [];
for(var i = 0; i < frames.length; i++){
    sceneTimers[i] = -frames[i].transitionTime;
}

//Changes throughout drawEverything() to keep the opacities in check.
var drawingScene = 0;

var currentSceneTimer = function(){
    return sceneTimers[scene];
};

var currentDrawingSceneTimer = function(){
    return sceneTimers[drawingScene];
};

var increaseSceneTimers = function(){
    for(var s = 0; s <= scene; s++){
        sceneTimers[s]++;
    }
};

var nextScene = function(){
    //"Complete" the current scene
    sceneTimers[scene] = frames[scene].timeNeededToComplete;
    
    //Next scene (unless last scene)
    scene += scene < frames.length - 1 ? 1 : 0;
    
    //Set the next transition
    setCamSpeed();
};

//Defaults
var DEFAULT_BUTTON_FILL = color(255, 255, 255, 50);
var DEFAULT_BUTTON_STROKE = color(4, 227, 19);
var DEFAULT_BUTTON_TEXTFILL = color(0, 97, 6);
var DEFAULT_BUTTON_RADIUS = 5;
var DEFAULT_BUTTON_STROKEWEIGHT = 3;
var DEFAULT_BUTTON_MOUSE_OVER_FILL = color(255, 255, 255, 250);
var DEFAULT_BUTTON_MOUSE_OVER_TEXTFILL = color(0, 0, 0);
var DEFAULT_BUTTON_MOUSE_OVER_STROKE = color(255, 255, 255);

var DEFAULT_SWITCH_BUTTON_TEXT_SIZE = 10;

var TITLE_TEXT_FILL = color(255, 51, 0);
var BODY_TEXT_FILL = color(0, 97, 6);

var colorWithOpacity = function(c, o){
    return color(red(c), green(c), blue(c), min(o, alpha(c)));
};

//This function also serves to calculate the time a frame needs to complete.
var fadeInColor = function(c, fadeInTime, fadeSpeed){
    frames[scene].timeNeededToComplete = max(fadeInTime + ceil(255 / fadeSpeed),
                                             frames[scene].timeNeededToComplete);
    return colorWithOpacity(c, (currentDrawingSceneTimer() - fadeInTime) * fadeSpeed);
};

var fadeInAlpha = function(fadeInTime, fadeSpeed){
    return (currentDrawingSceneTimer() - fadeInTime) * fadeSpeed;
};

var mouseOverRect = function(x, y, w, h){
    return mouseX > x - currentCam.x && mouseY > y - currentCam.y &&
           mouseX < x - currentCam.x + w && mouseY < y - currentCam.y + h;
};

var buttons = [];

var mouseOverButton;
var mouseOverMessageButton = false;

var invisibleButton = function(x, y, w, h, t, isMessage, isTextBox, isSwitchButton){
    //Submit a button only if not already
    var b = {x: x, y: y, w: w, h: h, t: t, isMessage: isMessage, isTextBox: isTextBox, isSwitchButton: isSwitchButton};
    var buttonAlreadyPushed = false;
    for(var i = 0; i < buttons.length; i++){
        if(b.x === buttons[i].x && b.y === buttons[i].y &&
        b.w === buttons[i].w && b.h === buttons[i].h &&
        b.t === buttons[i].t){
            buttonAlreadyPushed = true;
            break;
        }
    }
    if(!buttonAlreadyPushed){buttons.push(b);}
};

var ibtn = invisibleButton;

var button = function(x, y, w, h, t, tS, f, s, tF, r, sW, mOF, mOTF, mOS, isSwitchButton, switchButtonBool){
    //Set optional parameters if unspecified
    f = f ? f : DEFAULT_BUTTON_FILL;
    s = s ? s : DEFAULT_BUTTON_STROKE;
    sW = sW ? sW : DEFAULT_BUTTON_STROKEWEIGHT;
    r = r ? r : DEFAULT_BUTTON_RADIUS;
    mOF = mOF ? mOF : DEFAULT_BUTTON_MOUSE_OVER_FILL;
    mOS = mOS ? mOS : DEFAULT_BUTTON_MOUSE_OVER_STROKE;
    
    var mouseIsOverButton = t === mouseOverButton;
    
    //Rect
    fill(mouseIsOverButton ? mOF : f);
    stroke(mouseIsOverButton ? mOS : s);
    strokeWeight(sW);
    rect(x, y, w, h, r);
    
    //Set optional parameters if unspecified
    tF = tF ? tF : DEFAULT_BUTTON_TEXTFILL;
    mOTF = mOTF ? mOTF : DEFAULT_BUTTON_MOUSE_OVER_TEXTFILL;
    
    //Text
    fill(mouseIsOverButton ? mOTF : tF);
    stroke(mouseIsOverButton ? mOTF : tF);
    textAlign(CENTER, CENTER);
    textSize(tS);
    text(isSwitchButton ? (switchButtonBool ? "ON" : "OFF") : t, x + w / 2, y + h / 2);
    
    ibtn(x, y, w, h, t, undefined, undefined, isSwitchButton);
};

var btn = button;

var mouseOverSwitchButton = false;

var switchButton = function(x, y, w, h, id, bool, txtSize){
    txtSize = txtSize ? txtSize : DEFAULT_SWITCH_BUTTON_TEXT_SIZE;
    btn(x, y, w, h,
        id, txtSize,
        undefined,
        bool ? color(8, 242, 47) : color(245, 10, 45),
        color(255, 255, 255),
        undefined, undefined, undefined,
        bool ? color(8, 242, 47) : color(245, 10, 45),
        bool ? color(8, 242, 47) : color(245, 10, 45), true, bool);
};//x, y, w, h, t, tS, f, s, tF, r, sW, mOF, mOTF, mOS

var sbtn = switchButton;

var textBoxes = [];

var mouseOverTextBox;
var selectedTextBox;

var textBox = function(x, y, w, h, id, txt, txtSize){
    fill(255, 255, 255, 200);
    noStroke();
    rect(x, y, w, h);
    
    fill(0);
    textSize(txtSize ? txtSize : 16);
    textAlign(LEFT, CENTER);
    text(txt, x + 3, y + h / 2);
    
    //Editor line blinks 15 out of every 30 frames
    if(id === selectedTextBox && frameCount % 30 < 15){
        stroke(0);
        strokeWeight(2);
        line(x + textWidth(txt) + 4, y + 3, x + textWidth(txt) + 4, y + h - 3);
    }
    
    ibtn(x, y, w, h, id, false, true);
    
    //Submit a text box only if not already
    var textBoxAlredyPushed = false;
    for(var i = 0; i < textBoxes.length; i++){
        if(id === textBoxes[i]){
            textBoxAlredyPushed = true;
            break;
        }
    }
    
    if(!textBoxAlredyPushed){textBoxes.push(id);}
};

var tBox = textBox;

var checkIfMouseOverButton = function(){
    mouseOverButton = undefined;
    mouseOverMessageButton = undefined;
    mouseOverTextBox = undefined;
    mouseOverSwitchButton = undefined;
    for(var f = buttons.length - 1; f >= 0; f--){
        if(mouseOverRect(buttons[f].x, buttons[f].y,
                         buttons[f].w, buttons[f].h)){
            mouseOverButton = buttons[f].t;
            mouseOverMessageButton = buttons[f].isMessage;
            mouseOverTextBox = buttons[f].isTextBox;
            mouseOverSwitchButton = buttons[f].isSwitchButton;
            break;
        }
    }
};

var clearButtonsAndTextBoxes = function(){
    buttons = [];
    textBoxes = [];
};

var toFrame = function(f){
    var frm = frames[f];
    translate(frm.x, frm.y);
    scale(frm.s, frm.s);
    
    drawingScene = f;
};

var fromFrame = function(f){
    var frm = frames[f];
    scale(1/frm.s, 1/frm.s);
    translate(-frm.x, -frm.y);
};

//All color functions must include o as their opacity
var food = function(foodName, o, x, y, s){
    translate(x, y);
    scale(s);
    switch(foodName){
        case "apple":
            fill(255, 81, 0, o);
            rotate(-8);
            ellipse(-13, 0, 60, 75);
            rotate(16);
            ellipse(13, 0, 60, 75);
            rotate(-8);
            noFill();
            stroke(171, 74, 0, o);
            strokeWeight(3);
            arc(10, -31, 20, 50, 180, 286);
            fill(85, 255, 0, o);
            break;
        
    }
    scale(1/s);
    translate(-x, -y);
};

var drawEverything = function(){
    //A circle backdrop that appears in frame 6
    toFrame(6);
        //Transition for frame 6 i s 100...
        rotate(min((currentDrawingSceneTimer() + 100) * 360/100, 360));
        
        fill(fadeInColor(color(0, 123, 255, 50), -50, 2));
        noStroke();
        ellipse(0, 0, 150, 150);
    fromFrame(6);
    
    toFrame(0);
        fill(255, 0, 0);
        textAlign(CENTER, CENTER);
        textSize(60);
        text("Hunger In", 0, -125);
        textSize(70);
        text("America", 0, -69);
        
        //btn(120, 170/* + sin(frameCount * 6) * 3*/, 160, 60,
            //"START", 38);
    fromFrame(0);
    
    toFrame(1);
        fill(fadeInColor(BODY_TEXT_FILL, 20, -8));
        textSize(30);
        text("Click!", -400, 70);
        
        fill(fadeInColor(TITLE_TEXT_FILL, 20, 8));
        textSize(40);
        text("Hunger.", 0, -125);
        
        textSize(20);
        
        fill(fadeInColor(BODY_TEXT_FILL, 80, 8));
        text("What do you think of when you hear that word?", -180, -80, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 140, 8));
        text("Growling tummies?", -180, 0, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 180, 8));
        text("Hunger pains?", -180, 30, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 220, 8));
        text("Skinny children in Africa?", -180, 60, 360, 70);
    fromFrame(1);
    
    toFrame(2);
        textSize(20);
        
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        text("What do you think it means to be hungry?", -180, -50, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 100, 8));
        text("Perhaps you're fortunate enough not to know it.", -180, 40, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 180, 8));
        text("Perhaps you aren't.", -180, 110, 360, 70);
    fromFrame(2);
    
    toFrame(3);
        textSize(20);
        
        fill(fadeInColor(BODY_TEXT_FILL, 40, 8));
        text("The truth is...", -180, -80, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 100, 8));
        text("People are hungry ALL AROUND US.", -180, -40, 360, 70);
        
        fill(fadeInColor(BODY_TEXT_FILL, 160, 8));
        text("Do you even realize it?", -180, 0, 360, 70);
    fromFrame(3);
    
    toFrame(4);
        textSize(25);
        
        fill(fadeInColor(color(255, 255, 255), 100, 8));
        noStroke();
        //rect(0, 0, 400, 400);
        
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        text("We don't like to think about it.", 0, -150);
        
        textSize(36);
        fill(fadeInColor(BODY_TEXT_FILL, 100, 8));
        text("But THIS IS REAL.", 0, -110);
        
        noFill();
        stroke(fadeInColor(BODY_TEXT_FILL, 100, 8));
        strokeWeight(3);
        line(0, -80, 0, -60);
        line(-5, -65, 0, -60);
        line(5, -65, 0, -60);
        ellipse(0, 20, 275, 125);
    fromFrame(4);
    
    toFrame(5);
        textSize(22);
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        text("Don't believe it? Look around you.", 0, -200);
    fromFrame(5);
    
    toFrame(8);
        fill(255, 255, 255, 100);fill(fadeInColor(color(255, 255, 255, 100), -20, 8));
        noStroke();
        rect(-200, -200, 66, 400);
        rect(-134, -200, 400, 59);
        rect(134, -141, 66, 341);
        rect(-134, 141, 268, 59);
    fromFrame(8);
    
    toFrame(6);
        noStroke();
        fill(fadeInColor(color(234, 0, 255, 100), 670, 8));
        ellipse(115, 115, 208, 200);
        
        rotate(10);
        fill(fadeInColor(color(0, 153, 255, 100), 600, 8));
        rect(66, -58, 129, 53);
        rotate(-10);
        
        fill(fadeInColor(color(196, 255, 0, 200), 340, 8));
        noStroke();
        beginShape();
        vertex(-200, -205);
        vertex(-90, -205);
        bezierVertex(-141, 171, 51, 12, 14, 133);
        bezierVertex(3, 178, -200, 206, -200, 170);
        endShape();
        //triangle(-200, -143, 64, 140, -200, 165);
        
        fill(fadeInColor(color(255, 187, 0, 200), 100, 8));
        noStroke();
        triangle(-70, -131, 200, -169, 200, -47);
        
        fill(fadeInColor(color(0, 255, 119, 100), 20, 8));
        noStroke();
        quad(-200, -210, 200, -210, 200, -159, -200, -65);
        
        fill(fadeInColor(TITLE_TEXT_FILL, 20, 8));
        textAlign(LEFT, TOP);
        textSize(27);
        text("1 OUT OF 6 AMERICANS is\nfood insecure.", -180, -185);
        
        fill(fadeInColor(BODY_TEXT_FILL, 100, 8));
        textAlign(RIGHT, TOP);
        textSize(15);
        text("They're struggling every day\njust to bring food to\nthe table.", 0, -140, 190, 75);
        
        fill(fadeInColor(BODY_TEXT_FILL, 180, 8));
        textSize(13);
        rotate(-14);
        textAlign(LEFT, CENTER);
        text("Perhaps they rely on food stamps...", -170, -100);
        rotate(14);
        
        fill(fadeInColor(BODY_TEXT_FILL, 260, 8));
        textSize(12);
        rotate(18);
        textAlign(RIGHT, CENTER);
        text("if they don't already make that much.", 170, -91);
        rotate(-18);
        
        food("apple", fadeInAlpha(340, 8), -135, 5);
        fill(fadeInColor(color(255, 255, 255), 340, 8));
        textAlign(CENTER, CENTER);
        textSize(30);
        text(constrain(currentDrawingSceneTimer() - 340 - 8, 0, 16), -135, -4);
        textSize(12);
        text("MILLION", -135, 21);
        
        fill(fadeInColor(BODY_TEXT_FILL, 350, 8));
        textSize(11);
        text("CHILDREN ARE HUNGRY.", -128, 55);
        
        fill(fadeInColor(BODY_TEXT_FILL, 430, 8));
        textAlign(LEFT, TOP);
        textSize(12);
        text("These children can't develop\ntheir cognitive and behaviorial skills\nand CAN'T FOCUS WELL IN SCHOOL.", -195, 65);
        
        fill(fadeInColor(BODY_TEXT_FILL, 530, 8));
        textSize(20);
        text("And it's not their fault!", -195, 110);
        
        rotate(3);
        fill(fadeInColor(TITLE_TEXT_FILL, 600, 8));
        textAlign(CENTER, CENTER);
        textSize(15);
        text("What can be\nthe cause of this?", 138, -33 + 15);
        rotate(-3);
        
        fill(fadeInColor(color(255, 255, 255), 680, 8));
        textSize(13);
        text("It's not necessarily poverty.", 114, 73 + 15);
        
        fill(fadeInColor(color(255, 255, 255), 760, 8));
        text("It's not that we're running out\nof food, either.", 114, 129);
    fromFrame(6);
    
    toFrame(7);
        fill(fadeInColor(TITLE_TEXT_FILL, 20, 8));
        textSize(35);
        textAlign(CENTER, CENTER);
        text("It's unemployment.", 100, 335);
    fromFrame(7);
    
    toFrame(8);
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        textAlign(LEFT, TOP);
        textSize(15);
        text("Many people in rural communities lack the resources to consistently get to a dependable food source.", -143 - 46, -106 - 85, 393, 100);
        
        fill(fadeInColor(BODY_TEXT_FILL, 100, 8));
        textAlign(RIGHT, BOTTOM);
        textSize(13);
        text("...Such as gas.", 245 - 46, -54 - 91);
        
        fill(fadeInColor(TITLE_TEXT_FILL, 180, 8));
        textAlign(LEFT, TOP);
        textSize(12);
        text("That's no reason to be hungry.", -148 - 48, -54 - 85, 64, 130);
        
        fill(fadeInColor(BODY_TEXT_FILL, 260, 8));
        textAlign(LEFT, TOP);
        textSize(12);
        text("Yet people ALL AROUND US are starving, right here in the United States.", -148 - 48, 0 - 85, 64, 150);
        
        fill(fadeInColor(TITLE_TEXT_FILL, 320, 8));
        textAlign(CENTER, CENTER);
        textSize(40);
        text(constrain(currentDrawingSceneTimer() - 320, 0, 49), -120 - 48, 170 - 85);
        textSize(13);
        text("MILLION\nPEOPLE.", -120 - 48, 207 - 85);
    fromFrame(8);

    toFrame(9);
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        textAlign(CENTER, CENTER);
        textSize(16);
        text("These people need help.", 0, -75);
        
        fill(fadeInColor(BODY_TEXT_FILL, 70, 8));
        text("Our help.", 0, -50);
        
        textSize(26);
        fill(fadeInColor(TITLE_TEXT_FILL, 130, 8));
        text("Your help.", 0, 0);
        
        textSize(16);
        text("You can be the person who makes a difference\nin their lives.", 0, 50);
    fromFrame(9);
    
    toFrame(10);
        fill(fadeInColor(BODY_TEXT_FILL, 20, 8));
        textAlign(RIGHT, CENTER);
        textSize(30);
        text("Help us end it.", 0, 100);
        
        noFill();
        stroke(fadeInColor(BODY_TEXT_FILL, 40, 8));
        strokeWeight(3);
        line(-100, 85, -75, 60);
        line(-82.5, 60, -75, 60);
        line(-75, 67.5, -75, 60);
    fromFrame(10);
    
    toFrame(11);
        fill(fadeInColor(TITLE_TEXT_FILL, 20, 8));
        textAlign(CENTER, CENTER);
        textSize(30);
        text("Donate to the food drive.", 0, 500);
        
        fill(fadeInColor(BODY_TEXT_FILL, 60, 8));
        textAlign(CENTER, CENTER);
        textSize(15);
        text("Thank you for your attention.", 0, 560);
        
        fill(fadeInColor(color(255, 255, 255), 70, 8));
        textSize(11);
        text("This poster © 2014 DY. All rights reserved.", 0, 670);
        
        if(currentDrawingSceneTimer() === 20){
            println("http://feedingamerica.org/");
        }
    fromFrame(11);
    //These people may look just like you do. They're regular people, like you. They may be college graduates. They may not look like they're hungry, but they are. Did you know that
    //These people need help. Our help. Your help.
    //And you can start to make a difference right now.
    //Help us end hunger in America. Donate to the BCS food drive.
    
    /*
    toFrame();
        
    fromFrame();
    */
};

var debugMode = false;

draw = function() {
    clearButtonsAndTextBoxes();
    
    background(133, 255, 122);
    
    textFont(createFont("Avenir"));
    
    //Move the camera and round it off if it's close to where it's going
    /*
    if(abs(camTo.x - currentCam.x) <= currentCam.xSpeed){
        currentCam.x = camTo.x;
    }else{
        currentCam.x += currentCam.xSpeed;
    }
    if(abs(camTo.y - currentCam.y) <= currentCam.ySpeed){
        currentCam.y = camTo.y;
    }else{
        currentCam.y += currentCam.ySpeed;
    }
    if(abs(camTo.s - currentCam.s) <= currentCam.sSpeed){
        currentCam.s = camTo.s;
    }else{
        currentCam.s += currentCam.sSpeed;
    }*/
    
    if(currentSceneTimer() < 0){
        currentCam.x += currentCam.x !== camTo.x ? currentCam.xSpeed : 0;
        currentCam.y += currentCam.y !== camTo.y ? currentCam.ySpeed : 0;
        currentCam.s += currentCam.s !== camTo.s ? currentCam.sSpeed : 0;
    }
    
    //To account for weird decimals...
    if(currentSceneTimer() >= 0){
        currentCam.x = camTo.x;
        currentCam.y = camTo.y;
        currentCam.s = camTo.s;
    }
    
    resetMatrix();
    
    //Center Origin
    translate(width / 2, height / 2);
    
    //scale(1/2, 1/2);
    translate(-currentCam.x, -currentCam.y);
    scale(1 / currentCam.s);
    drawEverything();
    
    checkIfMouseOverButton();
    
    resetMatrix();
    
    if(debugMode){
        fill(0);
        textAlign(LEFT, CENTER);
        textSize(13);
        text("Scene: " + scene, 5, 375);
        text("Scene Time: " + currentSceneTimer(), 5, 390);
        textAlign(RIGHT, CENTER);
        text("CamX: " + currentCam.x, 395, 360);
        text("CamY: " + currentCam.y, 395, 375);
        text("CamS: " + currentCam.s, 395, 390);
        text("frame1.x: " + frames[0].x, 200, 390);
    }
    
    increaseSceneTimers();
};

keyPressed = function(){
    debugMode = !debugMode;
};

mouseClicked = function(){
    nextScene();
    /*
    if(mouseOverButton){
        nextScene();
    }
    switch(mouseOverButton){
        case "START":
            
            break;
    }*/
};
