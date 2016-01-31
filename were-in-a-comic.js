/**
 * "We're In A Comic!" – An Animated Story
 * by DY
 * 
 * Typography set in the Fun Font, made with DY's MyFont API:
 * darryl-yeo.com/myfont-api
 * 
 * Programming Experience: 24 months+  |  Understanding of Intro to JS Course: 100%  |  Non-Summer of Scripting Student
 */

// Runs this many frames per draw() call. Increase at your own risk.
var animationSpeed = 1;

// The comic pans this many times faster than you drag your mouse
var dragSensitivity = 1.2;








// The number of frames elapsed since the beginning of the animation, used for the timing of panel entrances and character movement
var time = 0;

// Used to calculate the size of each panel
var rowSize = 3;
var columnSize = 4;
var panelMargin = 9;

// Variables for the size of each panel
var panelWidth = width / rowSize - panelMargin,
panelHeight = height / columnSize - panelMargin;

// An array of panel screenshots.
var panels = [];
// An array storing the elapsed number of frames for each panel.
var panelTimers = [];
// At what times a screenshot is taken and a new panel is generated
var panelEntranceTimes = [0, 300, 500, 650, 780, 950, 1050, 1150, 1250, 1350, 1450, 1500, 1730, 1820, 1970, 2120, 2240, 2380, 2509, 2660, 2810, 2950, 3090, 3290, 3430, 3570, 3710];

// The camera - stores data for cumulative translations and a "zoomed out" mode.
var cam = {
    // What point to scale from
    origin: new PVector(panelWidth / 2, panelHeight / 2),
    // The target position of the camera; pannable by dragging
    position: new PVector(0, 0),
    // How far away from the target position the camera is.
    offset: new PVector(0, 0),
    // At what percent of the offset the camera is at
    offsetFactor: 0,
    // How far to zoom into the comic (relative to "zoomed out" mode)
    scale: min(rowSize, columnSize) * 0.95,
    
    // If in zoomed out mode
    zoomedOut: false,
    // The position of the camera in zoomed out mode; pannable by dragging (the translations above do not apply to "zoomed out" mode)
    zoomedOutPosition: new PVector(0, 0),
    // No zooming necessary
    zoomedOutScale: 1,
    
    // Sets the target position to the given point
    goTo: function(position){
        this.position = position;
    },
    // Sets the target position to the given point, and sets the offset variable to be the difference between the old and new positions (for a smooth transition)
    glideTo: function(position){
        this.offset = this.position;
        this.offset.sub(position);
        this.offsetFactor = 0;
        
        this.goTo(position);
    },
    // Update camera positions
    update: function(x, y){
        // Increases the offset multiplier by 1/80 until it reaches 1
        this.offsetFactor = min(this.offsetFactor + 1/80, 1);
        //this.offset.mult(0.92);
        
        // Constrain the range of panning positions so that the comic does not leave the screen
        this.position.x = constrain(this.position.x - panelMargin / 2, 0, width - width / rowSize) + panelMargin / 2;
        this.position.y = constrain(this.position.y - panelMargin / 2, 0, height / columnSize * (floor((panels.length - 1) / rowSize))) + panelMargin / 2;
        
        // ("Zoomed out" mode can only scroll vertically)
        this.zoomedOutPosition.x = 0;
        this.zoomedOutPosition.y = constrain(this.zoomedOutPosition.y, 0, 1000);
    },
    // Pans the camera horizontally
    moveByX: function(x){
        if(this.zoomedOut){
            this.zoomedOutPosition.x += x * cam.scale;
        }else{
            this.position.x += x;
        }
    },
    // Pans the camera vertically
    moveByY: function(y){
        if(this.zoomedOut){
            this.zoomedOutPosition.y += y * cam.scale;
        }else{
            this.position.y += y;
        }
    }
};

// An object containing all the character objects
var characters = {};
// The names of the character objects, used as keys
var characterNames = ["errorBuddy", "hopper"];
// The properties that have smooth transitions when changed - all make use of an "offset" property like the camera, which decreases slowly over time until each property plus its offset equals the target value.
var characterTransitionableProperties = ["x", "y", "scale", "rotation"];
// Using each character name as a key, add a character object with a default set of properties
for(var c = 0; c < characterNames.length; c++){
    characters[characterNames[c]] = {
        x: -30,
        y: panelHeight - 30,
        xOffset: 0,
        yOffset: 0,
        scale: 1,
        scaleOffset: 0,
        rotation: 0,
        rotationOffset: 0,
        decelerationFactor: 0.95,
        rotationDecelerationFactor: 0.95,
        image: getImage("cute/Blank"),
        facingRight: true,
        jumping: false,
        spinning: false,
        text: "",
        textAlign: CENTER,
        textColor: color(0),
        textX: 0,
        textY: -30,
        textSize: 8,
    };
}

// When the time variable is equal to a numeric key in this script, the properties of each listed character are replaced with the ones specified. This acts as an automated list of keyframes.
var script = {
    0: {
        errorBuddy: {
            image: getImage("creatures/OhNoes"),
            textColor: color(122, 219, 100),
        },
        hopper: {
            x: panelWidth + 30,
            xOffset: 0,
            image: getImage("creatures/Hopper-Happy"),
            reverse: true,
            facingRight: false,
            text: "",
            textColor: color(217, 182, 100),
        }
    },
    80: {
        errorBuddy: {
            x: panelWidth / 2 - 10,
            scale: 0.8,
        }
    },
    150: {
        errorBuddy: {
            text: "Whoa, where am I?",
        }
    },
    325: {
        errorBuddy: {
            x: panelWidth / 2 + 10,
            y: panelHeight - 30,
            scale: 1,
            facingRight: false,
            text: "What is this place?",
        }
    },
    500: {
        errorBuddy: {
            x: 30,
            facingRight: true,
            text: "Hopper, do you\nknow where we are?",
            textAlign: LEFT,
        },
        hopper: {
            x: panelWidth - 30,
        }
    },
    650: {
        errorBuddy: {
            text: "",
        },
        hopper: {
            facingRight: true,
            text: "To be honest, I'm\nnot too sure, EB.",
            textAlign: RIGHT,
        }
    },
    780: {
        errorBuddy: {
            x: 30,
            text: "",
        },
        hopper: {
            facingRight: false,
            text: "Maybe we could\nlook around.\n",
        }
    },
    830: {
        errorBuddy: {
            text: "Good idea.",
            textAlign: LEFT,
            textY: -25,
        },
    },
    950: {
        errorBuddy: {
            x: 20,
            y: panelHeight - 35,
            scale: 0.7,
            facingRight: false,
            text: "",
        },
        hopper: {
            x: panelWidth / 2 + 2,
            scale: 1.1,
            facingRight: true,
            text: "",
        }
    },
    1050: {
        errorBuddy: {
            x: panelWidth - 25,
            scale: 0.4,
            facingRight: true,
        },
        hopper: {
            x: 20,
            scale: 1,
            facingRight: false,
        }
    },
    1150: {
        hopper: {
            x: 10,
            y: panelHeight - 32,
            scale: 0.2,
            facingRight: true,
        },
        errorBuddy: {
            x: panelWidth / 2 + 15,
            y: panelHeight - 20,
            scale: 0.9,
            facingRight: false,
        }
    },
    1160: {
        hopper: {
            rotation: -180,
            rotationDecelerationFactor: 0.5,
        }
    },
    1250: {
        hopper: {
            x: panelWidth / 2 - 17,
            y: panelHeight - 20,
            scale: 1.3,
            rotation: 0,
        },
        errorBuddy: {
            x: panelWidth / 2 + 25,
            y: panelHeight - 35,
            scale: 0.2,
            facingRight: true,
        }
    },
    1350: {
        hopper: {
            x: panelWidth / 2 - 15,
            scale: 1.6,
        },
        errorBuddy: {
            x: 20,
            y: panelHeight - 35,
            scale: 0.3,
            facingRight: false,
        }
    },
    1450: {
        hopper: {
            x: panelWidth / 2 - 10,
            y: panelHeight - 25,
            scale: 3,
        },
        errorBuddy: {
            y: -20,
            scale: 0.2,
            decelerationFactor: 0.98,
            rotation: -270,
            facingRight: true,
        }
    },
    1550: {
        hopper: {
            text: "Hey, I think I see something!",
            textAlign: LEFT,
            textX: 3,
            textY: -19,
            textSize: 2.5
        },
    },
    1630: {
        errorBuddy: {
            x: panelWidth - 20,
            y: panelHeight - 28,
            rotation: 360*10+180,
            decelerationFactor: 0.95,
            textAlign: RIGHT,
            text: "AAAAAAAAAAAAAAA!",
            textSize: 20,
        }
    },
    1652: {
        errorBuddy: {
            x: panelWidth - 10,
            y: panelHeight - 28,
            decelerationFactor: 0.9,
            textAlign: CENTER,
            text: "OOF!"
        }
    },
    1749: {
        errorBuddy: {
            rotation: 180,
            rotationDecelerationFactor: 0
        }
    },
    1750: {
        errorBuddy: {
            y: panelHeight - 34,
            rotation: 0,
            decelerationFactor: 0.7,
            rotationDecelerationFactor: 0.7,
            facingRight: false,
            text: ""
        },
        hopper: {
            text: ""
        }
    },
    1760: {
        errorBuddy: {
            y: panelHeight - 28,
        }
    },
    1820: {
        errorBuddy: {
            x: panelWidth - 32,
            y: panelHeight - 5,
            scale: 2,
            decelerationFactor: 0.95,
            rotationDecelerationFactor: 0.95,
            text: "What is it, Hopper?",
            textX: -8,
            textY: -35,
            textAlign: RIGHT,
            textSize: 4,
        },
        hopper: {
            x: 27,
            y: panelHeight - 12,
            scale: 2,
            text: ""
        }
    },
    1970: {
        errorBuddy: {
            text: "",
        },
        hopper: {
            text: "There appears to be a\nrectangular window\nright over here.",
            textX: 8,
            textY: -25,
            textSize: 4,
        }
    },
    2120: {
        hopper: {
            text: "* With a creature\nstaring right at us! *",
            textSize: 3,
        }
    },
    2240: {
        hopper: {
            x: 23,
            text: "",
        },
        errorBuddy: {
            text: "* Really? *",
            textSize: 3,
        }
    },
    2300: {
        hopper: {
            text: "* Yeah, check it out! *",
            textX: 11,
        },
    },
    2380: {
        hopper: {
            x: 10,
            y: panelHeight - 20,
            scale: 1,
            text: "",
        },
        errorBuddy: {
            x: panelWidth - 25,
            y: panelHeight - 20,
            scale: 5,
            //image: getImage("ohnoes-hmm"),
            text: "",
        }
    },
    2510: {
        hopper: {
            x: 26,
            y: panelHeight - 30,
            textAlign: LEFT,
            textX: 0,
            textY: -30,
            textSize: 6,
        },
        errorBuddy: {
            y: panelHeight - 30,
            scale: 1,
            image: getImage("creatures/OhNoes"),
            text: "* You're right, Hopper! *",
            textAlign: RIGHT,
            textX: 0,
            textY: -30,
            textSize: 6,
        }
    },
    2660: {
        errorBuddy: {
            text: "* Do you think it knows\nwhat we're saying? *",
        }
    },
    2810: {
        hopper: {
            x: 32,
            text: "* Hmm, let me try something. *",
        },
        errorBuddy: {
            text: "",
        }
    },
    2950: {
        hopper: {
            x: panelWidth / 2,
            scale: 2,
            decelerationFactor: 0.8,
            image: getImage("creatures/Hopper-Jumping"),
            text: "HEY OUT\nTHERE!!!",
            textAlign: CENTER,
            textY: -4,
            textSize: 16,
            jumping: true,
        },
        errorBuddy: {
            x: -20,
            y: -40,
            rotation: 360 * -3,
            decelerationFactor: 0.95,
            text: "HWOAH!!!",
            textAlign: CENTER,
            textSize: 12,
            textY: -17,
        }
    },
    3090: {
        hopper: {
            x: 30,
            scale: 1,
            image: getImage("creatures/Hopper-Happy"),
            text: "Wow, did you see that?",
            textAlign: LEFT,
            textY: -30,
            textSize: 8,
            jumping: false,
        },
        errorBuddy: {
            x: panelWidth - 20,
            y: panelHeight - 30,
            scale: 0.3,
            rotation: 90 + 360 * 3,
            decelerationFactor: 0.99,
            rotationDecelerationFactor: 0.98,
            text: ""
        }
    },
    3290: {
        hopper: {
            text: "There are floating words\nthat match everything I'm saying!",
            textSize: 6,
        },
        errorBuddy: {
            text: ":P",
            textSize: 12,
            textY: -30,
        }
    },
    3430: {
        hopper: {
            x: 40,
            scale: 1,
            image: getImage("creatures/Hopper-Happy"),
            text: "That can only\nmean one thing...",
        },
        errorBuddy: {
            text: "",
        }
    },
    3570: {
        hopper: {
            x: panelWidth / 2,
            scale: 2.2,
            decelerationFactor: 0.8,
            image: getImage("creatures/Hopper-Jumping"),
            text: "WE'RE IN\nA COMIC!!!",
            textAlign: CENTER,
            textY: -6,
            textSize: 16,
            jumping: true,
        },
        errorBuddy: {
            y: -40,
            rotation: 360 * -3,
            decelerationFactor: 0.95,
            text: "HWOAH!!!",
            textSize: 12,
            textY: -17,
        }
    },
    3710: {
        hopper: {
            scale: 2.5,
            text: "AWESOME!!!",
            textSize: 10,
            spinning: true,
        },
        errorBuddy: {
            text: "",
        }
    },
};

//var maxTime = Object.keys(script).slice(-1).pop();

// If a panel number is specified, updates its screenshot; otherwise, adds a new panel screenshot. The corresponding panel timer is incremented.
var updatePanel = function(panel){
    if(panel !== undefined){
        panels[panel] = get(0, 0, panelWidth * cam.scale, panelHeight * cam.scale);
    }else{
        panels.push(get(0, 0, panelWidth * cam.scale, panelHeight * cam.scale));
    }
    panelTimers[panel]++;
    if(!panelTimers[panel]){
        panelTimers[panel] = 0;
    }
};

// (Unused Functions)
{
/*var expDecay = function(num, t, factor){
    return pow(factor || 0.95, max(t, 0)) * num;
};*/

var runFunctionAtTime = function(t, func){
    if(time === t){
        func();
    }
};

var runFunctionInInterval = function(start, stop, func){
    if(time >= start/* && time < stop*/){
        func();
    }
};
}

// The MyFont API, along with my very own Fun Font. This library renders strings of text as Processing.js shapes as specified in a "MyFont" object, thus allowing you to create your own font.
// darryl-yeo.com/myfont-api
{
var Char=function(id,len,render){this.id=id;this.width=len;this.draw=render;};var currentMyText={font:undefined,fill:color(0,0,0),size:30,weight:3,xAlign:LEFT,yAlign:BASELINE,trailSpace:2,leading:3};var MyFont=function(naturalHeight,parts,characterInfo){this.nH=25;this.nHH=naturalHeight/2;this.p=parts;this.characterInfo=characterInfo;};var funFont=new MyFont(25,{hL:function(w,y){line(0,y,w,y);},vL:function(x,h){h=h?h:funFont.nH;line(x,-h/2,x,h/2);},lL:function(){funFont.p.vL(0);},tL:function(w){funFont.p.hL(w,-funFont.nHH);},bL:function(w){funFont.p.hL(w,funFont.nHH);},bO:function(w){ellipse(8,0,w,funFont.nH);},p:function(){ellipse(0,funFont.nHH,1,1);}},[new Char("placeholder",16,function(){strokeWeight(2);point(0,-funFont.nHH);point(0,0);point(0,funFont.nHH);point(this.width/2,funFont.nHH);point(this.width,-funFont.nHH);point(this.width,0);point(this.width,funFont.nHH);point(this.width/2,-funFont.nHH);}),new Char(" ",2,function(b){}),new Char(".",2,function(b){funFont.p.p();}),new Char(":",2,function(b){ellipse(0,-3,1,1);funFont.p.p();}),new Char("'",0,function(b){line(1,-funFont.nHH,0,-funFont.nHH+3);}),new Char("\"",4,function(b){line(1,-funFont.nHH,0,-funFont.nHH+3);line(5,-funFont.nHH,4,-funFont.nHH+3);}),new Char(",",0,function(b){line(1,funFont.nHH,0,funFont.nHH+3);}),new Char("!",2,function(b){line(0,-funFont.nHH,0,6);funFont.p.p();}),new Char("?",8,function(b){pushStyle();textAlign(LEFT, CENTER);textSize(37);fill(currentMyText.fill);text("?", -4, 0);popStyle();}),new Char("-",10,function(b){line(0,0,10,0);}),new Char("+",10,function(b){line(0,0,10,0);line(5,-5,5,5);}),new Char("*",12,function(b){line(0,0,12,0);line(3,-5,9,5);line(9,-5,3,5);}),new Char("_",10,function(b){funFont.p.bL(this.width);}),new Char("|",1,function(b){line(0,-funFont.nHH-1,0,funFont.nHH+1);}),new Char("&",11,function(b){line(2,-3,12,funFont.naturalHeightHalf);arc(6,-6.25,10,11.5,155,270);arc(6,-8.25,7,7.5,-90,45);line(8,-5,0,3);arc(4,7,11,11.5,90,225);arc(4,2.75,16,20,20,90);}),new Char("A",14,function(b){arc(7,0,14,26,-180,0);line(0,0,0,funFont.nHH);funFont.p.hL(this.width,2);line(14,0,14,funFont.nHH);}),new Char("B",11,function(b){funFont.p.lL();arc(0,-7.5,23,12,-90,90);arc(0,6.5,25,14,-90,90);}),new Char("C",15,function(b){arc(8+b/2,0,17,26,50,310);}),new Char("D",13,function(b){funFont.p.lL();arc(0,0.5,26,26,-90,90);}),new Char("E",12,function(b){funFont.p.lL();funFont.p.tL(this.width);funFont.p.hL(10);funFont.p.bL(this.width);}),new Char("F",12,function(b){funFont.p.lL();funFont.p.tL(this.width);funFont.p.hL(10);}),new Char("G",16,function(b){arc(8,0,this.width,funFont.nH,10,320);line(this.width-6,2,this.width,2);}),new Char("H",14,function(b){funFont.p.lL();funFont.p.hL(this.width);funFont.p.vL(14);}),new Char("I",1,function(b){funFont.p.vL(1);}),new Char("J",10,function(b){line(this.width,-funFont.nHH,this.width,8);arc(this.width/2,8,this.width,10,0,180);}),new Char("K",12,function(b){funFont.p.vL();line(0,3,this.width,-funFont.nHH);line(4,0,this.width,funFont.nHH);}),new Char("L",12,function(b){funFont.p.vL();funFont.p.bL(this.width);}),new Char("M",14,function(b){funFont.p.vL();line(0,-funFont.nHH,this.width/2,5);line(this.width,-funFont.nHH,this.width/2,5);funFont.p.vL(this.width);}),new Char("N",12,function(b){funFont.p.lL();line(0,-funFont.nHH,12,funFont.nHH);funFont.p.vL(12);}),new Char("O",16,function(b){funFont.p.bO(this.width);}),new Char("P",12,function(b){funFont.p.lL();arc(0,-4.5,25,16,-90,90);}),new Char("Q",16,function(b){funFont.p.bO(this.width);line(10,6,15,13);}),new Char("R",12,function(b){funFont.p.vL();arc(0,-4.5,25,16,-90,90);line(6,3.5,12,13);}),new Char("S",13,function(b){arc(this.width/2,-6.5,13,13,90,340);arc(this.width/2,6.5,14,13,-90,160);}),new Char("T",14,function(b){funFont.p.tL(this.width);funFont.p.vL(7);}),new Char("U",14,function(b){arc(7,3,14,20,0,180);line(0,-funFont.nHH,0,3);line(14,-funFont.nHH,14,3);}),new Char("V",16,function(b){line(0,-funFont.nHH,this.width/2,funFont.nHH);line(this.width,-funFont.nHH,this.width/2,funFont.nHH);}),new Char("W",16,function(b){line(0,-funFont.nHH,3,funFont.nHH);line(3,funFont.nHH,this.width/2,-5);line(this.width-3,funFont.nHH,this.width/2,-5);line(this.width-3,funFont.nHH,this.width,-funFont.nHH);}),new Char("X",12,function(b){line(0,-funFont.nHH,12,funFont.nHH);line(0,funFont.nHH,12,-funFont.nHH);}),new Char("Y",16,function(b){line(0,-funFont.nHH,this.width/2,2);line(this.width,-funFont.nHH,this.width/2,2);line(this.width/2,funFont.nHH,this.width/2,2);}),new Char("Z",14,function(b){funFont.p.tL(this.width);line(0,funFont.nHH,this.width,-funFont.nHH);funFont.p.bL(this.width);})]);var myTextFont=function(f){if(typeof fontName==="string"){textFont(createFont(f,0),0);}else{currentMyText.font=f;}};var myTextFill=function(r,g,b,a){fill(r,g,b,a);currentMyText.fill=color(r,g,b,a);};var myTextSize=function(tS){textSize(tS);currentMyText.size=tS;};var myTextWeight=function(weight){currentMyText.weight=weight;};var myTextAlign=function(align,yAlign){textAlign(align,yAlign);currentMyText.xAlign=align;currentMyText.yAlign=yAlign;};var myTextTrailSpace=function(trailSpace){currentMyText.trailSpace=trailSpace;};var myTextLeading=function(leading){textLeading(leading);currentMyText.leading=leading;};var myText=function(t,x,y,width,height){t=t.toUpperCase();if(currentMyText.font){var onLine=0;pushStyle();pushMatrix();translate(x,y);scale(currentMyText.size/30);var paragraphWidth=0;for(var c=0;c<t.length;c++){var characterString=t[c];if(characterString==="\n"){break;}var character=currentMyText.font.characterInfo[0];for(var cI=0;cI<currentMyText.font.characterInfo.length;cI++){var currentCharacter=currentMyText.font.characterInfo[cI];if(currentCharacter.id===characterString){character=currentCharacter;break;}}paragraphWidth+=character.width+currentMyText.trailSpace+currentMyText.weight;}switch(currentMyText.xAlign){case CENTER:translate(-paragraphWidth/2,0);break;case RIGHT:translate(-paragraphWidth,0);break;}for(var c=0;c<t.length;c++){var characterString=t[c];if(characterString==="\n"){popMatrix();popStyle();myText(t.substring(c+1),x,y+currentMyText.leading);return;}noFill();stroke(currentMyText.fill);strokeWeight(currentMyText.weight);strokeCap(ROUND);var character=currentMyText.font.characterInfo[0];for(var cI=0;cI<currentMyText.font.characterInfo.length;cI++){var currentCharacter=currentMyText.font.characterInfo[cI];if(currentCharacter.id===characterString){character=currentCharacter;break;}}character.draw(currentMyText.weight);translate(character.width+currentMyText.trailSpace+currentMyText.weight,0);}popMatrix();popStyle();}else{text(t,x,y);}};myTextFont(funFont);
}

// My Logo
var DY = function(x, y, s){
    var nHH=12.5;var yW=16;pushMatrix();translate(x,y);scale(s/400);noFill();pushMatrix();translate(-140,0);scale(10);stroke(0,174,255);strokeWeight(1);line(0,-nHH,0,nHH);arc(0,0.5,26,26,-90,90);popMatrix();translate(10,0);scale(28/3);stroke(255,183,74);strokeWeight(4);line(-2,-nHH,yW/2-2,2);line(yW-2,-nHH,yW/2-2,2);line(yW/2-2,nHH,yW/2-2,2);popMatrix();
};

// The easing function used for the panel movement and camera glide
var easeInOut = function(pos) {
    pos = constrain(pos, 0, 1);
    //return (pos===1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    if ((pos/=0.5) < 1) {return 0.5*Math.pow(pos,3);}
    return 0.5 * (Math.pow((pos-2),3) + 2);
};

// Calculates the coordinates of the pth panel
var positionOfPanel = function(p){
    return p === -1 ?
        new PVector(-panelMargin / 2 - panelWidth * 2, panelMargin / 2) :
        new PVector(
            p % rowSize * (panelWidth + panelMargin) + panelMargin / 2,
            floor(p/rowSize) * (panelHeight + panelMargin) + panelMargin / 2
        );
};

// Calculates the offset of the last panel for a smooth transition
var offsetOfLastPanel = function(){
    var lastPanelPosition = positionOfPanel(panels.length - 1);
    var lastPanelOffset = positionOfPanel(panels.length - 2);
    lastPanelOffset.sub(lastPanelPosition);
    lastPanelOffset.mult(1 - easeInOut(panelTimers[panels.length - 1] / 80));
    return lastPanelOffset;
};

// Draws the main animation. You can't see this directly - an image screenshot will be taken of the area before being drawn over as a comic panel, along with all the previous comic panels.
var drawComic = function(){
    // If there is a keyframe defined for the current time
    if(script[time]){
        // Get the instructions
        var currentScriptLine = script[time];
        // For each character listed in the instructions
        for(var characterName in currentScriptLine){
            // Summon the corresponding character
            var character = characters[characterName];
            // Store that character's instructions in a variable
            var newCharacterProperties = currentScriptLine[characterName];
            
            // Save the character's current properties before changing its properties
            var oldCharacterProperties = {};
            for(var key in character){
                oldCharacterProperties[key] = character[key];
            }
            
            // For each property listed in the script, update the character's corresponding properties
            for(var key in newCharacterProperties){
                character[key] = newCharacterProperties[key];
            }
            
            //For each transitionable property...
            for(var p = 0; p < characterTransitionableProperties.length; p++){
                var property = characterTransitionableProperties[p];
                // Get the corresponding offset property
                var propertyOffset = property + "Offset";
                // If the character previously had this property, has just been assigned that property, and was not explicitly set an offset for that property
                if (oldCharacterProperties[property] !== undefined &&
                    newCharacterProperties[property] !== undefined &&
                    newCharacterProperties[propertyOffset] === undefined){
                    // Set the property's offset value to the difference between the previous and current values of the property
                    character[propertyOffset] = oldCharacterProperties[property] - character[property];
                }
            }
        }
    }
    
    
    // Let's draw the scene now!
    
    background(240);
    
    // Get the current panel's position - we'll need it for the ground
    var panelPosition = positionOfPanel(panels.length - 1);
    panelPosition.add(offsetOfLastPanel());
    
    // Draw the ground.
    fill(255);
    stroke(179);
    strokeWeight(1);
    beginShape();
    vertex(-5, panelHeight + 1);
    for(var x = -5; x <= panelWidth + 5; x += 5){
        // Use noise() to make the ground, using the current panel's position to make it continuous across panels. (Cool!)
        vertex(x, panelHeight - 50 + noise((x + panelPosition.x) * 0.015, panelPosition.y * 0.05) * 30 + random(0.5));
    }
    vertex(panelWidth + 5, panelHeight + 1);
    endShape();
    
    // Calling all actors!
    imageMode(CENTER);
    for(var characterName in characters){
        // Get the character object
        var character = characters[characterName];
        pushMatrix();
            // Translate to its position
            translate(character.x + character.xOffset, character.y + character.yOffset);
            // Scale to its scale
            scale(character.scale + character.scaleOffset);
            pushMatrix();
                // If the character's image isn't facing right to begin with, reverse the x-axis
                scale(character.reverse ? -1 : 1, 1);
                // If the character is facing left, reverse the x-axis
                scale(character.facingRight ? 1 : -1, 1);
                // If the character is "jumping", translate vertically up and down over time
                translate(0, abs(sin(time * 10)) * -20 * character.jumping);
                // If the character is "spinning", rotate over time
                rotate(character.rotation + character.rotationOffset + time * -10 * character.spinning);
                
                // Finally, draw the character!
                image(character.image, 0, 0, character.image.width*0.27, character.image.height*0.27);
            popMatrix();
            
            // Render some text if the character is speaking
            myTextAlign(character.textAlign);
            myTextFill(character.textColor);
            myTextSize(character.textSize);
            myTextLeading(character.textSize + 2);
            myTextWeight(3);
            myTextTrailSpace(2);
            // Make the text anchor to the corresponding side of the character's image: A textAlign of LEFT anchors left-justified text to the left side of the image; CENTER anchors center-justified text to the center of the image, etc.
            var alignmentOffset = {
                    // LEFT
                    "37": -17.5,
                    // CENTER
                    "3": 0,
                    // RIGHT
                    "39": 17.5
                }[character.textAlign];
            // Render the text.
            myText(
                character.text,
                character.textX + alignmentOffset,
                character.textY - (character.text.split(/\r\n|\r|\n/).length - 1) * character.textSize + sin(time * 25) * 0.4
            );
        popMatrix();
        
        // Slowly decrease the offset values of the transitionable properties using their corresponding decelerationFactor to make the transition smooth
        character.xOffset *= character.decelerationFactor;
        character.yOffset *= character.decelerationFactor;
        character.scaleOffset *= character.decelerationFactor;
        character.rotationOffset *= character.rotationDecelerationFactor;
    }
    
    // If the current time is a panelEntranceTime
    var panelToAdd = panelEntranceTimes.indexOf(time);
    if(panelToAdd > -1){
        // Add that panel
        updatePanel(panelToAdd);
        // Set the camera's target position to that panel's position.
        cam.glideTo(positionOfPanel(panelToAdd));
    }
    //Update the screenshot of the last panel, where we can see the animation in real time
    updatePanel(panels.length - 1);
};

var run = function() {
    // Render the comic (screenshots will be taken)
    pushMatrix();
        scale(cam.scale);
        drawComic();
    popMatrix();
    
    // Let's draw the comic strip!
    background(255);
    
    imageMode(CORNER);
    
    // Get the position and offset of the last panel
    var lastPanelPosition = positionOfPanel(panels.length - 1);
    var lastPanelOffset = offsetOfLastPanel();
    
    /*
    if(panelTimers[panels.length - 1] < 80){
        var camPosition = lastPanelOffset.get();
        camPosition.add(lastPanelPosition);
        //cam.goTo(camPosition);
    }*/
    
    pushMatrix();
        // Make the necessary camera transformations
        if(cam.zoomedOut){
            translate(-cam.zoomedOutPosition.x, -cam.zoomedOutPosition.y);
            scale(cam.zoomedOutScale);
        }else{
            translate(width/2, height/2);
            scale(cam.scale);
            translate(-cam.offset.x * (1 - easeInOut(cam.offsetFactor)), -cam.offset.y * (1 - easeInOut(cam.offsetFactor)));
            translate(-cam.position.x, -cam.position.y);
            translate(-cam.origin.x, -cam.origin.y);
        }
        
        // For every saved panel screenshot...
        for(var p = 0; p < panels.length; p++){
            pushMatrix();
                // Translate to its position (plus an offset if the last panel)
                if(p === panels.length - 1){
                    translate(lastPanelOffset.x, lastPanelOffset.y);
                }
                translate(positionOfPanel(p).x, positionOfPanel(p).y);
                
                // Make an outline 
                stroke(179);
                strokeWeight(4);
                rect(0, 0, panelWidth, panelHeight);
                
                // Draw the saved screenshot.
                image(panels[p], 0, 0, panelWidth, panelHeight);
            popMatrix();
        }
    popMatrix();
    
    // When the mouse is dragged, pan the camera
    if(mouseIsPressed){
        cam.moveByX(-(mouseX - pmouseX) / cam.scale * dragSensitivity);
        cam.moveByY(-(mouseY - pmouseY) / cam.scale * dragSensitivity);
    }
    // When an arrow key is pressed, pan the camera
    if(keyIsPressed){
        switch(keyCode){
            case LEFT:
                cam.moveByX(-5);
                break;
            case RIGHT:
                cam.moveByX(5);
                break;
            case UP:
                cam.moveByY(-5);
                break;
            case DOWN:
                cam.moveByY(5);
                break;
        }
    }
    
    // Update the camera's position
    cam.update();
    
    // Increment time
    time++;// = min(time + 1, parseInt(maxTime, 0) + 50);
};

/*
// If the time is advanced at the start, run the comic up until that point
for(var t = 0; t < startTime; t++){
    run();
}*/

// Whether time should increment.
var running = false;

// Debug mode/debugging variables (can be toggled with SHIFT)
var debugMode = false;
var previousMillis = 0;

// Hand cursor to start
cursor(HAND);

draw = function() {
    frameRate(debugMode ? 0 : 50);
    
    background(255);
    
    if(running){
        for(var i = 0; i < animationSpeed; i++){
            run();
        }
    }
    
    // Title screen - shows if not running or key "s" is pressed (I use it as an overlay to make the screenshot
    if(!running || (key && key.toString() === "s")){
        fill(250, 250, 250, 200);
        noStroke();
        rect(0, 0, width, height);
        pushMatrix();
            translate(width / 2, height / 2);
            
            myTextAlign(CENTER);
            myTextFill(100);
            myTextTrailSpace(2);
            myTextWeight(3);
            
            myTextSize(40);
            myText('"We\'re In A Comic!"', 0, -115);
            
            myTextSize(30);
            myText('by', -30, -53);
            DY(24, -55, 77);
            
            myTextSize(19);
            myText('While the comic is playing, try:', 0, 25);
            myTextLeading(20);
            myTextSize(14);
            myText('Panning the comic with the mouse or arrow keys\nPressing "ENTER" for a full page view', 0, 58);
            
            myTextSize(10);
            myTextWeight(4);
            myTextTrailSpace(3);
            myTextLeading(13);
            myText('Typography used is the "Fun Font",\nmade with DY\'s MyFont API', 0, 149);
        popMatrix();
    }
    
    // Display debug information
    if(debugMode){
        fill(156);
        textSize(13);
        textAlign(LEFT, BOTTOM);
        text(time + " frames | " + (1000/(millis() - previousMillis)).toFixed(2) + " fps", 10, 390);
        textAlign(RIGHT, BOTTOM);
        text(cam.position.x + "\n" + cam.position.y, 390, 390);
        
        previousMillis = millis();
    }
};

keyPressed = function(){
    /*
    switch(key.toString()){
        case ",":
            time -= 20;
            break;
        case ".":
            time += 20;
            break;
    }*/
    switch(keyCode){
        case ENTER:
            // Toggle camera "zoomed out" mode
            cam.zoomedOut = !cam.zoomedOut;
            break;
        case SHIFT:
            // Toggle debug mode
            debugMode = !debugMode;
            break;
    }
};

// Start running when clicked
mouseClicked = function(){
    running = true;
    cursor(MOVE);
};
