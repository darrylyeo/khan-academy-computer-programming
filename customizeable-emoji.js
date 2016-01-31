/**
 * Customizable Emoji
 * by DY
 * 
 * How are you feeling today? Express yourself by moving your mouse!
 * The y axis controls happiness.
 * The x axis controls eyebrow furrow.
 * Click on the left or right to switch an eye.
 * 
 * For example messages, click the chat button!
 * 
 * Programming Experience: 24 months+  |  Understanding of Intro to JS Course: 100%  |  Non-Summer of Scripting Student
 */

/** Function Documentation **/
/**
 * emoji(x, y, faceSize, happiness*, hue*, eyes*, eyebrowFurrow*, sweat*, sweatAlpha*);
 * emoji(args);
 * 
 * Draws an emoticon with the desired features. You can call the function two ways:
      -> with parameters passed in the order listed below, or
      -> with a single object passed containing properties as listed below.
 * Look at the code at the bottom for an example.
        
        @parameter x                (any number) horizontal position
        @parameter y                (any number) vertical position
        @parameter rotation         (any angle) angle to rotate
        @parameter faceSize         (any number) radius
            -> positive numbers for right-side-up face
            -> negative numbers for upside-down face
        @parameter happiness        (0.00 - 1.00 or function) controls much of the emotion
            -> 1.0 for a huge smile (100% happiness)
            -> 0.0 for a frown (0% happiness)
            -> 0.5 for a blank face (50% happiness)
            -> a function for dynamic happiness calculation (return a number between 0 and 1)
                    e.g. function(){ return 0.5 + sin(frameCount) * 0.3; } 
        @parameter hue              (0 - 255) position in the color wheel
            -> 35 for a regular smiley yellow
            -> wraps back around if greater than 255
        @parameter eyeType          (array or 0, 1, 2) the type of each eye
            -> WIDE or 0 for open eyes with blank pupils ("O_O")
            -> OPEN or 1 for open eyes (":)")
            -> CLOSE or 2 for closed eyes ("XD")
            -> [OPEN, CLOSE] for left eye open, right eye closed (";)")
        @parameter eyebrowFurrow    (0.00 - 1.00) how furrowed the eyebrows are
            -> 0.0 for relaxed eyebrows
            -> 0.4 for eyebrows directly above eyes
            -> 0.8 for angry eyebrows (">:(")
            -> 1.0 for angrier eyebrows (">:)")
        @parameter sweat            (boolean) forehead sweat
        @parameter sweatAlpha       (0 - 255) how visible the forehead sweat is
            -> 0 for auto (alpha varies based on happiness)
 */

// Time
var t = floor(random(100, 1000));
// Constant for the WIDE eye type
var WIDE = 0;

// Object storing a message and another object containing some corresponding emoji parameters
var Message = function(message, emojiParameters){
    this.message = message;
    this.emojiParameters = emojiParameters;
};

// An array of messages. Feel free to add more messages and emojis if you come up with them!
var messages = [
    new Message("I JUST WON THE LOTTERY!!!", {
        happiness: 1.00,
        eyes: OPEN,
        eyebrowFurrow: 0.00
    }),
    new Message("The moment you realize your\nphone is in the washer", {
        happiness: 0.48,
        //hue: 125,
        eyes: WIDE,
        eyebrowFurrow: 0.11,
        sweatAlpha: 200
    }),
    new Message("Lol, that comic about Hopper and Oh Noes\nwas the funniest thing ever!", {
        happiness: function(){return map(sin(t * 40), -1, 1, 0.85, 1.00);},
        eyes: CLOSE,
        eyebrowFurrow: 0.30
    }),
    new Message("Stop...making...so...much...noise...!", {
        happiness: 0.00,
        hue: 25,
        eyes: CLOSE,
        eyebrowFurrow: 0.00,
        sweat: false
    }),
    new Message("These contests are so much fun!", {
        happiness: 0.70,
        //hue: 55,
        eyes: OPEN,
        eyebrowFurrow: 0.30
    }),
    new Message("These errors are so annoying!", {
        happiness: 0.4,
        hue: 15,
        eyes: OPEN,
        eyebrowFurrow: 0.85
    }),
    new Message("Ouch! I stepped on a Lego brick!", {
        happiness: 0.5,
        eyebrowFurrow: 0,
        eyes: [CLOSE, WIDE],
    }),
    new Message("Yes! My favorite song's on!", {
        happiness: 0.8,
        eyebrowFurrow: 0.47,
        eyes: CLOSE,
    }),
    new Message("Time to unleash my EVIL plan!\nEEE-HEE-HEE-HEE!!", {
        happiness: 0.90,
        eyes: WIDE,
        eyebrowFurrow: 1.0
    }),
    new Message("Don't you just love emojis?", {
        rotation: 15,
        happiness: 0.85,
        eyes: [OPEN, CLOSE],
        eyebrowFurrow: 0.0
    }),
];

// The currently highlighted message.
var currentMessage = 0;
// The vertical scroll position of the messages.
var messagesScrollY = 0;
// The padding for the messages area.
var messagesPadding = 40;
// The height of each message.
var messageHeight = 50;

// The background color.
var backgroundColor = color(255, 251, 173);
// The distance between the emojis in the background.
var backgroundEmojiSpacing = 75;

// The eye parameter of the main emoji.
var emojiEyes = [OPEN, OPEN];

// Whether the messages UI is open.
var uiOpen = false;
// What percent of the UI opening animation has completed.
var uiOpenTransition = 0;

// String representations of all eye types.
var eyeTypes = ["Wide", "Open", "Closed"];

// Helper function for setting defaults and constraints for an object of parameters. (You see, there was this one emoji who overexpressed itself and fatally injured its face at 110% happiness. We now try to avoid such incidents.)
var emojiParameterDefaults = function(p){
    var newParameters = {};
    for(var key in p){
        newParameters[key] = p[key];
    }
    
    newParameters.x = p.x === undefined ? width / 2 : p.x;
    newParameters.y = p.y === undefined ? height / 2 : p.y;
    newParameters.faceSize = p.faceSize || 300;
    
    newParameters.happiness = typeof p.happiness === "function" ? p.happiness() : p.happiness;
    newParameters.happiness = constrain(newParameters.happiness, 0, 1);

    newParameters.hue = (p.hue === undefined ? 35 : p.hue) % 255;
    
    newParameters.eyes = p.eyes === undefined ? OPEN : p.eyes;
    if(typeof newParameters.eyes === "number"){
        newParameters.eyes = [newParameters.eyes];
    }
    newParameters.eyebrowFurrow = constrain(p.eyebrowFurrow || 0, 0, 1);
    
    newParameters.sweat = p.sweat === undefined ? true : p.sweat;
    
    return newParameters;
};

// The emoji() function. Documentation is at the top of this program.
var emoji = function(x, y, faceSize, rotation, happiness, hue, eyes, eyebrowFurrow, sweat, sweatAlpha){
    // An object containing the parameters.
    var parameters;
    if(typeof arguments[0] === "object"){
        // If passed on object of parameters, use that object
        parameters = arguments[0];
    }else{
        // Otherwise, construct an object out of the function parameters.
        parameters = {
            x: x,
            y: y,
            faceSize: faceSize,
            rotation: rotation,
            happiness: happiness,
            hue: hue,
            eyes: eyes,
            eyebrowFurrow: eyebrowFurrow,
            sweat: sweat,
            sweatAlpha: sweatAlpha
        };
    }
    // Constrain and set defaults to the parameters
    parameters = emojiParameterDefaults(parameters);
    
    // Reassign the function parameters
    x = parameters.x;
    y = parameters.y;
    faceSize = parameters.faceSize;
    rotation = parameters.rotation;
    happiness = parameters.happiness;
    // A frown is just a smile turned upside-down!
    var sadness = 1 - happiness;
    hue = parameters.hue;
    eyes = parameters.eyes;
    eyebrowFurrow = parameters.eyebrowFurrow;
    sweat = parameters.sweat;
    sweatAlpha = parameters.sweatAlpha;
    
    // Draw the emoji. The shape of the mouth and eyes are mostly controlled by mathematical functions of the "happiness" (or inverse "sadness") values, where each aspect is contained inside of variables.
    colorMode(HSB);
    pushMatrix();
        translate(x, y);
        // We're drawing a 100x100 face. Scale to the desired size.
        scale(faceSize / 100);
        // Emojis have the power to levitate. The happier they are, the more intense it gets.
        translate(0, sin(frameCount * 8 + x * 14 + y * 14 * 3600) * 5 * happiness);
        rotate(rotation);
        
        // Face
        fill(hue, 200, 255);
        stroke(hue, 255, 200);
        strokeWeight(4);
        ellipse(0, 0, 100, 100);
        
        // Mouth
        var mouthY = 30 - happiness * 20;
        var mouthScaleX = 0.35 + max(happiness, 0.0) * 0.65;
        var mouthScaleY = max(happiness, 0.47) * 2 - 1;
        var mouthOpen = happiness > 0.5;
        pushMatrix();
            translate(0, mouthY);
            fill(hue, 255, 160);
            if(!mouthOpen){
                noFill();
            }
            /*
            stroke(hue, 255, 160);
            strokeCap(SQUARE);
            if(happiness < 0.58
                //&& happiness > 0.46
                ){
                strokeJoin(ROUND);
            }
            beginShape();
            if(mouthOpen){
                vertex(-29 * mouthScaleX, 0);
            }
            /*/
            stroke(hue, 255, 160);
            strokeCap(ROUND);
            strokeJoin(ROUND);
            beginShape();
            //*/
            vertex(-30 * mouthScaleX, 0);
            bezierVertex(-23 * mouthScaleX, 30 * mouthScaleY, 23 * mouthScaleX, 30 * mouthScaleY, 30 * mouthScaleX, 0);
            endShape(mouthOpen ? CLOSE : undefined);
        popMatrix();
        
        // Eyes
        var openEyeStrokeWeight = max(sadness * 4, 3);
        var openEyeX = 13;
        var openEyeY = happiness * -15;
        var openEyeWidth = 10 - openEyeStrokeWeight + max(0.25 - happiness, 0) * 20;
        var openEyeHeight = 33 - sadness * 30 - openEyeStrokeWeight;
        var closedEyeStrokeWeight = max(happiness * 5, 3);
        var closedEyeX = 6;
        var closedEyeY = openEyeY + 2;
        var wideEyeWidth = min((openEyeWidth + openEyeHeight) / 2, 15);
        var wideEyeHeight = 3 + openEyeHeight * 0.9;
        stroke(hue, 255, 160);
        for(var i = 0; i < 2; i++){
            scale(-1, 1);
            noFill();
            switch(eyes[i % eyes.length]){
                case WIDE:
                    strokeWeight(3);
                    ellipse(openEyeX, openEyeY, wideEyeWidth, wideEyeHeight);
                    break;
                case OPEN:
                    fill(hue, 255, 160);
                    strokeWeight(openEyeStrokeWeight);
                    ellipse(openEyeX, openEyeY, openEyeWidth, openEyeHeight);
                    break;
                case CLOSE:
                    strokeWeight(3);
                    //strokeCap(SQUARE);
                    //arc(11, closedEyeY + closedEyeHeight * 0.5 * sin(120), closedEyeWidth, closedEyeHeight, -110, -30);
                    pushMatrix();
                    translate(closedEyeX, closedEyeY);
                    rotate(10);
                    scale(0.9 - sadness * 0.1, 1.2 - sadness * 0.3);
                    bezier(0, 0, 6, -7, 13, -7, 17, -7);
                    bezier(0, 0, 6, -2, 13, -2, 19, 0);
                    popMatrix();
                    break;
            }
        }
        
        // Eyebrows
        var eyebrowHeight = openEyeHeight + 14;
        var eyebrowArcWidth = 18 + map(eyebrowFurrow, 0, 1, 0, 5);
        var eyebrowArcOffsetX = max(0.25 - happiness, 0) * 20;
        var eyebrowArcStartAngle = map(eyebrowFurrow, 0, 1, -90, -170);//-80 + eyebrowFurrow * 10;
        var eyebrowArcEndAngle = eyebrowArcStartAngle + map(eyebrowFurrow, 0, 1, 50, 90);
        var eyebrowLineWidth = 11;
        noFill();
        strokeWeight(2);
        for(var i = 0; i < 2; i++){
            scale(-1, 1);
            pushMatrix();
                translate(openEyeX, openEyeY);
                //arc(13, openEyeY, openEyeWidth * 2.6, openEyeHeight + 14, -90 - eyebrowAngleOffset + eyebrowAngleNarrow, -40 - eyebrowAngleOffset - eyebrowAngleNarrow);
                if(eyebrowFurrow < 0.75){
                    arc(eyebrowArcOffsetX, 0, eyebrowArcWidth, eyebrowHeight, eyebrowArcStartAngle, eyebrowArcEndAngle);
                }else{
                    translate(0, -5);
                    line(cos(eyebrowArcStartAngle) * eyebrowLineWidth, sin(eyebrowArcStartAngle) * eyebrowHeight / 2, cos(eyebrowArcEndAngle) * eyebrowLineWidth, sin(eyebrowArcEndAngle) * eyebrowHeight / 2);
                }
            popMatrix();
        }
        
        // Sweat
        sweatAlpha = sweatAlpha || (1/3 - happiness) * 255*3;
        if(sweat && sweatAlpha > 0){
            fill(hue, 50, 255, sweatAlpha);
            stroke(hue, 10, 255, sweatAlpha);
            strokeWeight(20);noStroke();
            pushMatrix();
                translate(-29, -22);
                rotate(10);
                scale(0.1);
                scale(0.7, 1);
                translate(0, 125);
                beginShape();
                vertex(0, -125);
                bezierVertex(-40, -30, -127, 49, -55, 115);
                bezierVertex(-25, 141, 25, 141, 55, 115);
                bezierVertex(127, 49, 40, -30, 0, -125);
                endShape();
            popMatrix();
        }
        
        fill(hue, 240, 180);
        stroke(hue, 240, 180);
    popMatrix();
    colorMode(RGB);
};

// Draws text with a shadow.
var shadowText = function(t, x, y, c1, c2){
    fill(c1);
    text(t, x + 1, y + 1);
    fill(c2);
    text(t, x, y);
};

// Converts a decimal to a percent and appends a "%".
var percent = function(decimal){
    return (decimal * 100).toFixed(0) + "%";
};

// DY Buttons and Textboxes
// www.khanacademy.org/cs/dy-buttons-and-textboxes/6092441764495360
{

//Defaults
var DEFAULT_BUTTON_FILL = color(255, 214, 79, 200);
var DEFAULT_BUTTON_STROKE = color(209, 162, 31);
var DEFAULT_BUTTON_TEXTFILL = color(186, 121, 0);
var DEFAULT_BUTTON_RADIUS = 10;
var DEFAULT_BUTTON_STROKEWEIGHT = 2;
var DEFAULT_BUTTON_MOUSE_OVER_FILL = color(255, 255, 255, 250);
var DEFAULT_BUTTON_MOUSE_OVER_TEXTFILL = color(0, 0, 0);
var DEFAULT_BUTTON_MOUSE_OVER_STROKE = color(255, 255, 255);

var DEFAULT_SWITCH_BUTTON_TEXT_SIZE = 10;

var mouseOverRect = function(x, y, w, h){
    return mouseX > x && mouseY > y &&
           mouseX < x + w && mouseY < y + h;
};

var buttons = {};

var mouseOverButton;
var mouseOverMessageButton = false;

var invisibleButton = function(x, y, w, h, t, isMessage, isTextBox, isSwitchButton){
    //Submit a button only if not already
    var b = {x: x, y: y, w: w, h: h, t: t, isMessage: isMessage, isTextBox: isTextBox, isSwitchButton: isSwitchButton};
    var buttonAlreadyPushed = false;
    buttons[t] = b;
};

var ibtn = invisibleButton;

var button = function(x, y, w, h, t, tS, f, s, tF, r, sW, mOF, mOTF, mOS, isSwitchButton, switchButtonBool){
    //Set optional parameters if unspecified
    f = f || DEFAULT_BUTTON_FILL;
    s = s || DEFAULT_BUTTON_STROKE;
    sW = sW || DEFAULT_BUTTON_STROKEWEIGHT;
    r = r || DEFAULT_BUTTON_RADIUS;
    mOF = mOF || DEFAULT_BUTTON_MOUSE_OVER_FILL;
    mOS = mOS || DEFAULT_BUTTON_MOUSE_OVER_STROKE;
    
    var mouseIsOverButton = t === mouseOverButton;
    
    //Rect
    fill(mouseIsOverButton ? mOF : f);
    stroke(mouseIsOverButton ? mOS : s);
    strokeWeight(sW);
    rect(x, y, w, h, r);
    
    //Set optional parameters if unspecified
    tF = tF || DEFAULT_BUTTON_TEXTFILL;
    mOTF = mOTF || DEFAULT_BUTTON_MOUSE_OVER_TEXTFILL;
    
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

var textBox = function(x, y, w, h, id, txt, txtSize, txtAlign){
    //fill(255, 255, 255, 50);
    //noStroke();
    //rect(x, y, w, h);
    
    //fill(0);
    textSize(txtSize ? txtSize : 16);
    textAlign(txtAlign || LEFT, CENTER);
    var lines = txt.split("\n");
    for(var l = 0; l < lines.length; l++){
        text(
            lines[l],
            txtAlign === LEFT ? x + 3 : (txtAlign === RIGHT ? x + w - 3 : x + w/2),
            y + h / 2 + (l - (lines.length - 1) / 2) * txtSize * 1.2
        );
    }
    
    //Editor line blinks 15 out of every 30 frames
    if(id === selectedTextBox && frameCount % 30 < 15){
        var lineX = txtAlign === LEFT ? x + textWidth(lines[lines.length - 1]) + 4 : x + w - 3;
        var lineYOffset = (lines.length - 1) * txtSize * 1.2 / 2;
        //stroke(0);
        strokeWeight(2);
        line(lineX, y + h / 2 - textAscent() + lineYOffset, lineX, y + h / 2 + txtSize / 2 + lineYOffset);
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
    for(var id in buttons){
        var button = buttons[id];
        if(mouseOverRect(button.x, button.y,
                         button.w, button.h)){
            mouseOverButton = button.t;
            mouseOverMessageButton = button.isMessage;
            mouseOverTextBox = button.isTextBox;
            mouseOverSwitchButton = button.isSwitchButton;
            break;
        }
    }
};

var clearButtonsAndTextBoxes = function(){
    buttons = [];
    textBoxes = [];
};

}

// Renders the messages area and returns a screenshot.
var getMessagesArea = function(){
    background(232, 231, 214);
    
    // Don't let the user scroll too far.
    messagesScrollY = constrain(messagesScrollY, 0, messages.length * messageHeight + messagesPadding);
    
    // Draw each message and its corresponding emoji.
    for(var m = 0; m < messages.length; m++){
        // Vertical position of the message
        var y = height / 2 + messagesPadding + m * messageHeight - messagesScrollY;
        
        // Render it only if the bottom edge is below the top and the top edge is below the bottom
        if(y + messageHeight / 2 > height / 2 && y - messageHeight / 2 < height){
            // Get the message and emoji parameters
            var messageData = messages[m];
            
            // Alternate sides
            var emojiOnLeft = m % 2;
            
            // Copy the object of parameters
            var emojiParameters = {};
            for(var key in messageData.emojiParameters){
                emojiParameters[key] = messageData.emojiParameters[key];
            }
            // Add some more parameters
            emojiParameters.x = emojiOnLeft ? messagesPadding : width - messagesPadding;
            emojiParameters.y = y;
            emojiParameters.faceSize = 45;
            
            // Highlight the current message
            if(m === currentMessage){
                fill(247, 243, 234);
                noStroke();
                rectMode(CENTER);
                rect(width / 2, y, width, messageHeight - 10);
                ellipse(emojiParameters.x, y, emojiParameters.faceSize * 1.5, emojiParameters.faceSize * 1.5);
                rectMode(CORNER);
            }
            
            // Draw the emoji
            emoji(emojiParameters);
            
            // Render the message
            textBox(
                emojiOnLeft ? 75 : messagesPadding - emojiParameters.faceSize / 2,
                y - messageHeight / 2 + 5,
                width - messagesPadding - 75 + emojiParameters.faceSize / 2,
                messageHeight - 10,
                m,
                messageData.message,
                15,
                emojiOnLeft ? LEFT : RIGHT
            );
        }
    }
    
    // Return a screenshot of this area
    return get(0, height / 2, width, height / 2);
};

textFont(createFont("Avenir Condensed Medium"));

draw = function() {
    // If the UI is open, get the object of emoji parameters from the "messages" array.
    // Otherwise, construct a set of parameters using the mouse position to control "happiness" and "eyebrowFurrow".
    var emojiParameters = emojiParameterDefaults(uiOpen ? messages[currentMessage].emojiParameters : {
        x: width / 2,
        y: height / 2,
        faceSize: 300,
        happiness: map(mouseY, 0, height, 1, 0),
        hue: 35,
        eyes: emojiEyes,
        eyebrowFurrow: map(mouseX, 0, width, 0, 1),
        sweat: true
    });
    
    // Helper variables for the state of the UI. Used as conditions for showing/hiding elements.
    var uiOpenOrTransitioning = uiOpen || uiOpenTransition > 0;
    var uiClosedOrTransitioning = !uiOpen || uiOpenTransition < 1;
    
    // Render the messages area and save the screenshot - we'll be drawing over it.
    var messagesArea;
    if(uiOpenOrTransitioning){
        messagesArea = getMessagesArea();
    }
    
    pushMatrix();
        // Scale out if the UI is open.
        scale(1 - uiOpenTransition / 2);
        
        // Draw the background.
        background(backgroundColor);
        
        // Background Emojis
        if(!uiOpen || uiOpenTransition < 1){
            for(var x = 0; x <= width / backgroundEmojiSpacing; x++){
                for(var y = 0; y <= height / (backgroundEmojiSpacing * sqrt(3)/2); y++){
                    var xPosition = (x + (y % 2 === 0) * 0.5) * backgroundEmojiSpacing;
                    var yPosition = y * backgroundEmojiSpacing * sqrt(3)/2;
                    emoji(
                        xPosition,
                        yPosition,
                        backgroundEmojiSpacing * 0.85,
                        sin(x * 40 + y * 40 + t * 8) * 4,
                        noise(x * 30, y * 30, t * 0.01) * 4 - 1.3,
                        (noise((x + t * 0.02) * 0.15, y * 0.15) * 1000) % 255,
                        1
                    );
                }
            }
        }
        
        // Overlay
        noStroke();
        if(uiClosedOrTransitioning){
            fill(red(backgroundColor), green(backgroundColor), blue(backgroundColor), 160 + uiOpenTransition * 95);
            rect(0, 0, width, height);
        }
        
        if(uiOpenOrTransitioning){
            // Polka Dots to replace background emojis
            for(var x = 0; x <= width / backgroundEmojiSpacing; x++){
                for(var y = 0; y <= height / (backgroundEmojiSpacing * sqrt(3)/2); y++){
                    var xPosition = (x + (y % 2 === 0) * 0.5) * backgroundEmojiSpacing;
                    var yPosition = y * backgroundEmojiSpacing * sqrt(3)/2;
                    fill(255, 223, 148, uiOpenTransition * 255);
                    noStroke();
                    ellipse(xPosition, yPosition, backgroundEmojiSpacing * 0.85, backgroundEmojiSpacing * 0.85);
                }
            }
            
            // Stats area next to emoji
            fill(214, 199, 101);
            rect(width, 0, width, height);
            
            // Make an object containing some of the emoji parameters, as they would read in English.
            var emojiStats = {
                "Happiness" : percent(emojiParameters.happiness),
                "Eyes" : eyeTypes[emojiParameters.eyes[0]] + (emojiParameters.eyes.length - 1 ? ", " + eyeTypes[emojiParameters.eyes[1]] : ""),
                "Eyebrow Furrow" : percent(emojiParameters.eyebrowFurrow),
                //"Sweat" : emojiParameters.sweat,
            };
            
            // Draw some percentage pies to represent happiness and eyebrow furrow.
            noFill();
            stroke(255, 255, 255, 50);
            strokeWeight(6);
            ellipse(width + 80, 80, 86, 86);
            ellipse(width * 2 - 80, height - 80, 86, 86);
            fill(255, 255, 255, 50);
            noStroke();
            arc(width + 80, 80, 80, 80, -90, -90 + 360 * emojiParameters.happiness);
            arc(width * 2 - 80, height - 80, 80, 80, -90, -90 + 360 * emojiParameters.eyebrowFurrow);
            
            // Display the stats.
            //*
            var y = 45;
            textAlign(CENTER, CENTER);
            for(var key in emojiStats){
                var value = emojiStats[key];
                fill(255, 255, 255, 150);
                textSize(32);
                text(key, width * 1.5, y);
                fill(255);
                textSize(48);
                text(value, width * 1.5, y + 45);
                y += 125;
            }
            /*/
            fill(255);
            textSize(25);
            var y = 25;
            for(var key in emojiStats){
                var value = emojiStats[key];
                textAlign(LEFT, CENTER);
                text(key, width + 20, y);
                textAlign(RIGHT, CENTER);
                text(value, width * 2 - 20, y);
                y += 35;
            }
            */
            
            // Messages Area
            //fill(232, 231, 214);
            //rect(0, height, width * 2, height);
            image(messagesArea, 0, height, width * 2, height);
        }
        
        // Draw the main emoji!
        emoji(emojiParameters);
    popMatrix();
    
    if(uiClosedOrTransitioning){
        // Display the dynamic stats
        textSize(15);
        textAlign(LEFT, TOP);
        shadowText("Happiness: " + percent(emojiParameters.happiness), 10, 8 - uiOpenTransition * 50, color(255), color(117, 105, 28));
        textAlign(RIGHT, TOP);
        shadowText("Eyebrow Furrow: " + percent(emojiParameters.eyebrowFurrow), 390, 8 - uiOpenTransition * 50, color(255), color(117, 105, 28));
    }
    
    // A button that opens the UI
    btn(width - 50, height - 35, 40, 50, "Open Chat", 0);
    // Chat icon
    pushMatrix();
    translate(width - 30, height - 18);
    rectMode(CENTER);
    rect(0, 0, 22, 17, 4);
    triangle(0, 10, -4, 10, -5, 13);
    rectMode(CORNER);
    popMatrix();
    
    // Scroll the messages with arrow keys
    if(keyIsPressed){
        if(keyCode === UP){
            messagesScrollY += 5;
        }else if(keyCode === DOWN){
            messagesScrollY -= 5;
        }
    }
    
    // Increment time
    t++;
    
    // Advance the UI transition and keep it between 0 and 1
    uiOpenTransition = constrain(uiOpenTransition + (uiOpen ? 0.1 : -0.1), 0, 1);
    
    // Run a button check
    checkIfMouseOverButton();
};

mouseClicked = function(){
    // If the mouse is over a text box, activate it
    if(mouseOverTextBox){
        selectedTextBox = mouseOverButton;
    }
    
    // Run events depending on the currently hovered button
    switch(mouseOverButton){
        case "Open Chat":
            // Open/Close the UI
            uiOpen = !uiOpen;
            break;
        default:
            // Toggle an eye type depending on which side the mouse is on
            if(!uiOpen){
                var side = mouseX > width/2 ? 1 : 0;
                var eye = emojiEyes[side];
                emojiEyes[side] = (eye + 1) % 3;
            }
    }
};

mouseMoved = function(){
    // Update cursor type
    if(mouseOverTextBox){
        this.cursor(TEXT);
    }else if(mouseOverButton){
        this.cursor(HAND);
    }else if(uiOpen && mouseY > height / 2){
        this.cursor(MOVE);
        // Calculate which message is being hovered over
        currentMessage = constrain(round((mouseY - height / 2 + messagesScrollY - messagesPadding) / messageHeight), 0, messages.length - 1);
    }else{
        this.cursor(ARROW);
    }
};

mouseDragged = function(){
    if(uiOpen){
        messagesScrollY += pmouseY - mouseY;
    }
};

// Returns the new string after a key is typed
var updateStringAfterType = function(string){
    string = string ? string : "";
    
    if(keyCode === BACKSPACE || keyCode === DELETE || keyCode === LEFT){
        return string.slice(0, string.length - 1);
    }else if(keyCode !== SHIFT && keyCode !== ALT){
        return string + key.toString();
    }else{
        return string;
    }
};

keyPressed = function(){
    // Update text box values
    if(typeof selectedTextBox === "number"){
        messages[selectedTextBox].message = updateStringAfterType(messages[selectedTextBox].message);
    }
};
