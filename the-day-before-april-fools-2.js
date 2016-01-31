/**
 * The Day Before April Fool's 2
 * by DY
 * 
 * Enjoy my work? Subscribe to my new blog at
 * darryl-yeo.com
 * for programming tips, updates about my latest projects, and much more!
 * 
 * Oh, and happy April Fool's!
 * 
 */

var scene = 0;

var DY = function(x, y, sz){
    translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

var script = [
    {
        hopper: {
            x: -100
        },
        errorBuddy: {
            x: 270,
            facingRight: true
        }
    },
    {
        hopper: {
            x: -50,
        },
        errorBuddy: {
            speech: "It's today, right? Yup, my phone says it... my computer says it too... even the clock program I made the other day... all check, today's the day!",
            x: 270,
            textSize: 13,
            facingRight: true
        }
    },
    {
        hopper: {
            x: 70,
            xOffsetFactor: 0.99,
        },
        errorBuddy: {
            speech: "Bum ba-dee dum... this will be great!",
            facingRight: true
        }
    },
    {
        sound: "retro/jump1",
        hopper: {
            xOffsetFactor: 0.5,
            speech: "Hey, Error Buddy!",
            textSize: 32,
        },
        errorBuddy: {
            speech: "H-WOAH!!",
            x: 460,
            shaking: true,
            facingRight: true,
            textSize: 42,
            xOffsetFactor: 0.85,
        }
    },
    {
        hopper: {
            speech: "What'cha up to, Error Buddy?",
        },
        errorBuddy: {
            speech: "M-Me? Oh, I'm just planning this year's April Fool's Joke, Hopper.",
            xOffsetFactor: 0.95,
        }
    },
    {
        hopper: {
            speech: "Oh? What are you going to do?",
        },
        errorBuddy: {
            speech: "Well, uh...",
        }
    },
    {
        hopper: {
            speech: "What's wrong? I promise I won't tell!",
        },
        errorBuddy: {
            speech: "No, I was just thinking about how you played that trick on me last year, when you changed the date on my phone and made me think it was still the day before.",
            textSize: 13,
        }
    },
    {
        hopper: {
            speech: "I'm sorry, Error Buddy. That was mean of me. Will you forgive me?",
        },
        errorBuddy: {
            speech: "Well... okay, Hopper. I'll forgive you.",
        }
    },
    {
        hopper: {
            speech: "Great! So, what's your plan? Maybe I can help!",
        },
        errorBuddy: {
            speech: "Well, I was thinking of changing Winston's fill color to gray, then video-calling him just so I can watch his reaction when he sees his own face on his screen!",
            textSize: 13
        }
    },
    {
        hopper: {
            speech: "That's a brilliant idea, EB! But I think have another idea to make it even better!",
            image: getImage("creatures/Hopper-Jumping")
        },
        errorBuddy: {
            speech: "What is it, Hopper?",
        }
    },
    {
        hopper: {
            speech: "You should call Winston today to tell him to call you back tommorow!",
        },
        errorBuddy: {
            speech: "But why would that help?",
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "Well, that way Winston will be the one who walks into the prank, and you aren't the one who has to start it! He won't suspect anything that way!",
            textSize: 13,
        }
    },
    {
        errorBuddyFirst: true,
        errorBuddy: {
            speech: "Hmm... I guess that sort of makes sense. Thanks, Hopper!",
        },
        hopper: {
            speech: "Any time, EB!",
        }
    },
    {
        errorBuddyFirst: true,
        errorBuddy: {
            speech: "I'm gonna go call him right now.",
            x: 310,
            facingRight: true
        },
        hopper: {
            speech: "That's the way, EB!",
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "*Yes!*",
            textSize: 15,
            image: getImage("creatures/Hopper-Cool"),
            shaking: true
        },
        errorBuddy: {
            x: 500,
            facingRight: true
        }
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Hey, my phone isn't turning on!",
            x: 600,
        }
    },
    {
        hopper: {
            speech: "Really? Maybe your brightness is turned all the way down.",
        },
        errorBuddy: {
            speech: "Oh, how silly of me!",
            x: 600,
        }
    },
    {
        errorBuddy: {
            speech: "Where's the brightness button...? Oh, wait, there it is!",
            x: 600,
        }
    },
    {
        sound: "retro/coin",
        errorBuddy: {
            speech: "*click* Got it!",
            textSize: 25,
            x: 600,
        }
    },
    {
        hopper: {
            x: 70,
            xOffsetFactor: 0.9
        },
        errorBuddy: {
            speech: "WINSTON?!",
            textSize: 38,
            x: 600,
            shaking: true,
        }
    },
    {
        hopper: {
            x: 70,
        },
        errorBuddy: {
            speech: "Why am I already in a video call with you...?",
            textSize: 22,
            x: 450,
        }
    },
    {
        hopper: {
            x: 70,
            xOffsetFactor: 0.99
        },
        errorBuddy: {
            speech: "Hopper... what's going on...?",
            textSize: 22,
            x: 300,
            xOffsetFactor: 0.98,
        }
    },
    {
        sound: "retro/jump1",
        hopper: {
            speech: "APRIL FOOL'S!",
            textSize: 35,
            x: 125,
            xOffsetFactor: 0.6,
            image: getImage("creatures/Hopper-Jumping"),
            shaking: true,
        },
        errorBuddy: {
            speech: "OH, NOES!",
            textSize: 38,
            x: 600,
            xOffsetFactor: 0.8,
            shaking: true,
        }
    },
    {
        hopper: {
            speech: "Hee hee hee!",
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Aw, it was such a good idea, too...",
            facingRight: false,
        }
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Ugh...",
        }
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Wait a minute...",
        }
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Hopper, you aren't supposed to do that on the day BEFORE April Fool's!",
        }
    },
    {
        hopper: {
            image: getImage("creatures/Hopper-Cool")
        },
        errorBuddy: {
            speech: "Why are you smiling like that, Hopper?",
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "Oh... I might have just... changed the date on your phone again...",
            image: getImage("creatures/Hopper-Cool")
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "And on your computer... and on that clock program you made on Khan Academy the other day...",
            image: getImage("creatures/Hopper-Cool")
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "So...",
            image: getImage("creatures/Hopper-Cool")
        }
    },
    {
        errorBuddyFirst: true,
        hopper: {
            speech: "April fool's again.",
        }
    },
    {
        
    },
    {
        errorBuddyFirst: true,
        errorBuddy: {
            speech: "OH, NOES!!!",
            textSize: 42,
            shaking: true,
        },
        hopper: {
            speech: "HA-ha-ha-ha-ha...! Hee-hee-hee-hee-hee...!!",
            textSize: 25,
            image: getImage("creatures/Hopper-Cool"),
            shaking: true,
        }
    },
    {
   
        hopper: {
            speech: "BWAH-hah-hah-hah-ha!! Oh-ho-ho-ho-ho-ho!! Hee-hee-hee-hee-hee...!!",
            textSize: 20,
            x: -200,
            image: getImage("creatures/Hopper-Cool"),
            upsideDown: true,
            shaking: true,
            xOffsetFactor: 0.994,
        },
        errorBuddy: {
            speech: "Oh, noes. Oh, noes. Oh, noes. Oh, noes. Oh, noes. Oh, noes. Oh, noes...",
            textSize: 20,
            x: 450,
            shaking: true,
            xOffsetFactor: 0.98,
            facingRight: true
        }
    },
    {
   
        hopper: {
            x: -200
        },
        errorBuddy: {
            x: 450
        }
    }
];

// Set default values if they are missing
for(var s in script){
    script[s].hopper = script[s].hopper || {};
    script[s].hopper.textSize = script[s].hopper.textSize || 17;
    script[s].hopper.x = script[s].hopper.x || 110;
    script[s].hopper.facingRight = script[s].hopper.facingRight || true;
    script[s].hopper.image = script[s].hopper.image || getImage("creatures/Hopper-Happy");
    script[s].errorBuddy = script[s].errorBuddy || {};
    script[s].errorBuddy.textSize = script[s].errorBuddy.textSize || 17;
    script[s].errorBuddy.x = script[s].errorBuddy.x || 290;
    script[s].errorBuddy.facingRight = script[s].errorBuddy.facingRight || false;
    script[s].errorBuddyFirst = script[s].errorBuddyFirst || false;
}

var hopperXOffset = 0;
var errorBuddyXOffset = 0;

var speechRect = function(x, y, t, tS){
    textSize(tS);
    rect(x, y, 290, 100, 10);
    pushStyle();
    textAlign(CENTER, CENTER);
    fill(0, 0, 0, 130);
    text(t, 10 + x, 5 + y, 270, 80);
    popStyle();
};

background(250, 246, 197);

var t = 0;

draw = function() {
    resetMatrix();
    
    fill(250, 246, 197, 120);
    noStroke();
    rect(0, 0, width, height);
    
    fill(207, 130, 15);
    rect(0, 330, width, 70);
    
    if(scene === 0){
        textFont(createFont("Avenir Bold"));
        
        fill(0, 123, 255);
        textAlign(CENTER, CENTER);
        textSize(40);
        text("The Day Before\nApril Fool's 2", 200, 85 + sin(frameCount * 4) * 3);
        
        textFont(createFont("Avenir"));
        
        fill(94, 172, 255);
        textSize(30);
        textAlign(RIGHT, CENTER);
        text("by", 190, 175);
        
        DY(205, 150, 1/8);
        
        fill(150);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Click!", 200, 250);
    }else{
        DY(350, 350, 1/10);
    }
    
    var sceneData = script[scene];
    var hopper = sceneData.hopper;
    var errorBuddy = sceneData.errorBuddy;
    
    noStroke();
    pushMatrix();
    if(hopper.shaking){
        rotate(sin(frameCount * 20) * 0.2);
    }
    if(hopper.speech){
        fill(255, 182, 36);
        speechRect(20, sceneData.errorBuddyFirst ? 130 : 20, hopper.speech, hopper.textSize);
        if(hopper.x > 0){
            if(sceneData.errorBuddyFirst) {
                beginShape();
                vertex(60, 230);
                bezierVertex(55, 245, 65, 260, 75, 270);
                bezierVertex(50, 260, 40, 235, 40, 230);
                endShape();
            }else{
                beginShape();
                vertex(60, 120);
                bezierVertex(55, 200, 65, 270, 75, 270);
                bezierVertex(50, 260, 40, 155, 40, 120);
                endShape();
            }
        }
    }
    popMatrix();
    
    pushMatrix();
    translate(400, 0);
    if(errorBuddy.shaking){
        rotate(sin(frameCount * 20) * (sceneData.errorBuddyFirst ? 0.5 : 0.2));
    }
    if(errorBuddy.speech){
        fill(0, 232, 120);
        translate(-400, 0);
        speechRect(90, sceneData.errorBuddyFirst ? 20 : 130, errorBuddy.speech, errorBuddy.textSize);
        if(errorBuddy.x < 400){
            if(sceneData.errorBuddyFirst){
                beginShape();
                vertex(340, 120);
                bezierVertex(345, 200, 335, 270, 325, 270);
                bezierVertex(350, 260, 360, 155, 360, 120);
                endShape();
            }else{
                speechRect(90, 130, errorBuddy.speech, errorBuddy.textSize);
                beginShape();
                vertex(340, 230);
                bezierVertex(345, 245, 335, 260, 325, 270);
                bezierVertex(350, 260, 360, 235, 360, 230);
                endShape();
            }
        }
    }
    popMatrix();
    
    imageMode(CENTER);
    
    pushMatrix();
    translate(hopper.x + hopperXOffset, 310);
    scale(0.8);
    if(hopper.facingRight){
        scale(-1, 1);
    }
    if(hopper.upsideDown){
        rotate(180);
    }
    if(hopper.shaking){
        translate(0, sin(frameCount * 30) * 4);
    }
    image(hopper.image, 0, 0);
    popMatrix();
    
    pushMatrix();
    translate(errorBuddy.x + errorBuddyXOffset, 310);
    scale(0.8);
    if(!errorBuddy.facingRight){
        scale(-1, 1);
    }
    if(errorBuddy.shaking){
        translate(0, cos(frameCount * 30) * 20);
        rotate(-frameCount * 15);
    }
    image(getImage("creatures/OhNoes"), 0, 0);
    popMatrix();
    
    if(scene === script.length - 1){
        cursor(HAND);
        
        fill(0, 0, 0, 40);
        textSize(50);
        textFont(createFont("Avenir Bold"));
        text("THE END!", 200, 50);
        
        textFont(createFont("Avenir"));
        fill(255, 255, 255);
        rect(25, 90, 350, 210, 15);
        fill(0, 0, 0, 200);
        textSize(21);
        text("Enjoy my work?\nSubscribe to my new blog at\n\n\nfor programming tips, updates about my latest projects, and much more!", 40, 100, 320, 180);
        textSize(30);
        text("darryl-yeo.com", 200, 180);
        
        fill(255, 255, 255, 170);
        textSize(17);
        text('(A little more than "lol" in the Tips and\nThanks would be very appreciated!)', 180, 365);
    }else{
        cursor(ARROW);
    }
    
    hopperXOffset *= hopper.xOffsetFactor || 0.95;
    errorBuddyXOffset *= errorBuddy.xOffsetFactor || 0.95;
    
    t++;
    if(scene === 3 && t === 4 && keyCode === ENTER){
        noLoop();
    }
};

mouseClicked = function(){
    if(scene === script.length - 1 || (mouseX > 205 && mouseX < 255 && mouseY > 14 && mouseY < 190 && scene === 0) || (mouseY > 350 & mouseY < 390 & mouseX > 350 & mouseX < 390 && scene !== 0)){
        println("Created by Darryl Yeo");
        println("Find me and my latest projects online at");
        println("darryl-yeo.com!");
    }
    
    var oldHopperX = script[scene].hopper.x;
    var oldErrorBuddyX = script[scene].errorBuddy.x;
    
    scene = min(scene + 1, script.length - 1);
    
    var newHopperX = script[scene].hopper.x;
    var newErrorBuddyX = script[scene].errorBuddy.x;
    
    hopperXOffset = oldHopperX - newHopperX;
    errorBuddyXOffset = oldErrorBuddyX - newErrorBuddyX;
    
    playSound(getSound(script[scene].sound));
    
    t = 0;
};
