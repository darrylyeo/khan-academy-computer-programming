/**
 * Congratuations, Summer of Scripters!
 * by DY
 * 
 * You finally made it through a whole summer of scripting!
 * Chances are, you made something no one ever made before, and
 * learned many new skills all along the way. You stuck through
 * it all, no matter what challenge may have come your way, no
 * matter how good others seem in comparison to you. You
 * learned something new, so you won. Be proud of yourself!
 * 
 * In your recognition, the avatars have bought you a brand-new
 * trampoline. Of course, it probably isn't brand-new by now.
 * 
 * Loosely based on the animated sun shape found at
 * www.khanacademy.org/summer-of-scripting
 * 
 * Programming Experience: 24 months+  |  Understanding of Intro to JS Course: 100%  |  Non-Summer of Scripting Student
 */

var hideConfetti = false;
var maxConfetti = 100;

var sunRays = 35;






var avatars = [];
var Avatar = function(image, isHopper){
    if(Array.isArray(image)){
        this.images = image;
    }else{
        this.image = image;
    }
    this.reset();
    avatars.push(this);
};
Avatar.prototype.reset = function(){
    if(this.images){
        this.image = this.images[floor(random(this.images.length))];
    }
    this.x = width * random(-1, 1);
    this.y = height * 1.1;
    this.xSpeed = -this.x * 0.01;/*random(30) * (this.x < 0 ? 1 : -1);*/
    this.ySpeed = -random(20, 30);
    this.yAcceleration = random(0.5, 1);
    this.r = 20 * random(-1, 1);
    this.rSpeed = round(random(1.5)) ?
        -this.r * 0.03 :
        random(10, 20) * (this.x < 0 ? 1 : -1);
    this.s = random(0.4, 0.6);
};
Avatar.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.ySpeed += this.yAcceleration;
    this.r += this.rSpeed;
    
    if(this.y > height * 1.5/* && round(random(140)) === 0*/){
        this.reset();
    }
};
Avatar.prototype.draw = function(){
    if(abs(this.x) < width / 2 + 20 && this.y < height + 20){
        pushMatrix();
        translate(this.x, this.y);
        rotate(this.r);
        scale(this.s);
        imageMode(CENTER);
        image(this.image, 0, 0);
        popMatrix();
    }
};

// An array allows for multiple Hopper types. If you like, add all of the avatar evolutions!
new Avatar([
    getImage("creatures/Hopper-Jumping"),
    getImage("creatures/Hopper-Happy"),
    getImage("creatures/Hopper-Cool"),
    getImage("seasonal/hopper-partying"),
]);
new Avatar(getImage("creatures/OhNoes"));
new Avatar(getImage("creatures/Winston"));
new Avatar(getImage("avatars/leafers-tree"));
new Avatar(getImage("avatars/piceratops-ultimate"));
new Avatar(getImage("avatars/aqualine-ultimate"));
new Avatar(getImage("avatars/primosaur-ultimate"));
new Avatar(getImage("avatars/starky-ultimate"));
new Avatar(getImage("avatars/duskpin-ultimate"));

var confettiImages = [
    getImage("avatars/leaf-green"),
    getImage("avatars/leaf-orange"),
    getImage("avatars/leaf-blue"),
    getImage("avatars/leaf-grey"),
    getImage("avatars/leaf-red"),
    getImage("avatars/leaf-yellow"),
    getImage("space/star"),
];

var confetti = [];
var Confetti = function(){
    if(confetti.length < maxConfetti){
        this.reset();
        confetti.push(this);
    }
};
Confetti.prototype.reset = function(){
    this.image = confettiImages[floor(random(confettiImages.length))];
    this.x = width * 0.7 * random(-1, 1);
    this.y = -height / 2 - 20;
    this.xSpeed = random(2) * (this.x < 0 ? 1 : -1);
    this.ySpeed = random(4, 10);
    this.r1 = random(360);
    this.r1Speed = 10 * random(-1, 1);
    this.scale = random(0.1, 0.2);
    this.flipFactor = 0;
    this.flipSpeed = random(0.1, 0.2);
    this.r2 = random(360);
    this.r2Speed = 20 * random(-1, 1);
};
Confetti.prototype.update = function(){
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.r1 += this.r1Speed;
    this.r2 += this.r2Speed;
    this.flipFactor += this.flipSpeed;
    
    if(this.y > height + 20){
        this.reset();
    }
};
Confetti.prototype.draw = function(){
    if(abs(this.x) < width / 2 + 20 && this.y < height + 20){
        pushMatrix();
        translate(this.x, this.y);
        scale(this.scale);
        rotate(this.r1);
        scale(1, map(sin(this.flipFactor), 0, 1, -1, 1));
        imageMode(CENTER);
        rotate(this.r2);
        image(this.image, 0, 0);
        popMatrix();
    }
};

var easeInOutBack = function(pos) {
    pos = constrain(pos, 0, 1);
    var s = 1.70158;
    return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s)) : 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
};

var myText = function(t, x, y){
    pushMatrix();
    translate(x, y);
    noFill();
    // var whyDoesOhNoesWantMeToAssignAnonymousObjectLiteralsToVariables =
    // (Turns out it's invalid JavaScript otherwise – thanks, Oh Noes!)
    // Thanks to Matthias @MatthiasSaihttam for suggesting the use of parentheses instead.
    ({
        "CONGRATS": function(){
arc(-109.5, 0, 25.5, 39, 50, 310);
ellipse(-81, 0, 24, 37.5);
line(-60, -18.75, -60, 18.75);
line(-60, -18.75, -42, 18.75);
line(-42, -18.75, -42, 18.75);
arc(-21, 0, 24, 37.5, 10, 320);
line(-18, 3, -9, 3);
line(0, -18.75, 0, 18.75);
arc(0, -6.75, 37.5, 24, -90, 90);
line(9, 5.25, 18, 19.5);
arc(37.5, 0, 21, 39, -180, 0);
line(27, 0, 27, 18.75);
line(27, 3, 48, 3);
line(48, 0, 48, 18.75);
line(57, -18.75, 78, -18.75);
line(67.5, -18.75, 67.5, 18.75);
arc(96.75, -9.75, 19.5, 19.5, 90, 340);
arc(96.75, 9.75, 21, 19.5, -90, 160);
line(117, 18.75, 115.5, 23.25);
    },
        "SUMMER OF": function(){
arc(-102.375, -6.825, 13.65, 13.65, 90, 340);
arc(-102.375, 6.825, 14.7, 13.65, -90, 160);
arc(-76.65, 3.15, 14.7, 21, 0, 180);
line(-84, -13.125, -84, 3.15);
line(-69.3, -13.125, -69.3, 3.15);
line(-57.75, -13.125, -57.75, 13.125);
line(-57.75, -13.125, -50.4, 5.25);
line(-43.05, -13.125, -50.4, 5.25);
line(-43.05, -13.125, -43.05, 13.125);
line(-31.5, -13.125, -31.5, 13.125);
line(-31.5, -13.125, -24.15, 5.25);
line(-16.8, -13.125, -24.15, 5.25);
line(-16.8, -13.125, -16.8, 13.125);
line(-5.25, -13.125, -5.25, 13.125);
line(-5.25, -13.125, 7.35, -13.125);
line(-5.25, 0, 5.25, 0);
line(-5.25, 13.125, 7.35, 13.125);
line(18.9, -13.125, 18.9, 13.125);
arc(18.9, -4.725, 26.25, 16.8, -90, 90);
line(25.2, 3.675, 31.5, 13.65);
ellipse(65.1, 0, 16.8, 26.25);
line(85.05, -13.125, 85.05, 13.125);
line(85.05, -13.125, 97.65, -13.125);
line(85.05, 0, 95.55, 0);
},
        "SCRIPTERS": function(){
arc(-105.75, -9.75, 19.5, 19.5, 90, 340);
arc(-105.75, 9.75, 21, 19.5, -90, 160);
arc(-76, 0, 25.5, 39, 50, 310);
line(-59.5, -18.75, -59.5, 18.75);
arc(-59.5, -6.75, 37.5, 24, -90, 90);
line(-50.5, 5.25, -41.5, 19.5);
line(-31, -18.75, -31, 18.75);
line(-20, -18.75, -20, 18.75);
arc(-20, -6.75, 37.5, 24, -90, 90);
line(0, -18.75, 21, -18.75);
line(10.5, -18.75, 10.5, 18.75);
line(30, -18.75, 30, 18.75);
line(30, -18.75, 48, -18.75);
line(30, 0, 45, 0);
line(30, 18.75, 48, 18.75);
line(57, -18.75, 57, 18.75);
arc(57, -6.75, 37.5, 24, -90, 90);
line(66, 5.25, 75, 19.5);
arc(93.75, -9.75, 19.5, 19.5, 90, 340);
arc(93.75, 9.75, 21, 19.5, -90, 160);
line(112.5, -18.75, 112.5, 9);
ellipse(112.5, 18.75, 1.5, 1.5);
}
    })[t]();
    popMatrix();
};

var t = 0;

translate(width / 2, height / 2);//scale(0.1);

draw = function() {
    var a1 = easeInOutBack((t - 20) / 140);
    var a2 = easeInOutBack((t - 30) / 140);
    
    var sunColor = lerpColor(
        color(247, 206, 0),
        color(255, 153, 0),
        pow(sin(t * 3), 2)
    );
    
    fill(255, 246, 143, 150);
    stroke(sunColor);
    strokeWeight(14 + sin(t * 3) * 6);
    rectMode(CENTER);
    rect(0, 0, width, height);

    pushMatrix();
        if(a1 > 0){
            scale(a1);
            rotate(40 * a1);
        }
        scale(1 + sin(t * 4) * 0.03);
        rotate(t/2);
        
        fill(sunColor);
        stroke(sunColor);
        strokeWeight(18*6/2);
        strokeCap(SQUARE);
        for(var a = 0; a < sunRays; a++){
            pushMatrix();
            rotate(a*360/sunRays);
            arc(0, 0, mag(width, width), mag(width, width), 0, 180/sunRays);
            popMatrix();
        }
        
        fill(sunColor);
        noStroke();
        ellipse(0, 0, 320, 320);
        
        fill(255, 255, 255, 50);
        noStroke();
        ellipse(0, 0, 300, 300);
    popMatrix();
    
    
    pushMatrix();
        if(a1 > 0){
            scale(a1);
            rotate(40 * (1 - a1));
        }
        rotate(2 * sin(t * 9));
        scale(0.9 + sin(t * 4) * 0.03);
        
        noFill();
        //*
        stroke(143, 124, 0);
        strokeWeight(5);
        myText("CONGRATS", 1, -53);
        myText("SUMMER OF", 1, 0);
        myText("SCRIPTERS", 1, 47);
        /*/
        stroke(255, 234, 127);
        strokeWeight(8);
        myText("CONGRATS", 0, -65);
        myText("SUMMER OF", 0, -11);
        myText("SCRIPTERS", 0, 36);
        //*/
        stroke(sunColor);
        stroke(255);
        strokeWeight(4);
        myText("CONGRATS", 0, -54);
        myText("SUMMER OF", 0, -1);
        myText("SCRIPTERS", 0, 46);
    popMatrix();
    
    if(!hideConfetti){
        if(floor(random(10)) === 0){
            new Confetti();
        }
        for(var c = 0; c < confetti.length; c++){
            confetti[c].update();
            confetti[c].draw();
        }
    }
    for(var a = 0; a < avatars.length; a++){
        avatars[a].update();
        avatars[a].draw();
    }
    
    t++;
};

keyPressed = function(){
    noLoop();
    redraw();
};
