// Click to brake!

/**
 * Introducing the Leef - The first race car to run completely on photosynthesis.
 * by DY
 * 
 * Programming Experience: 24 months+  |  Understanding of Intro to JS Course: 100%  |  Non-Summer of Scripting Student
 * 
 * The spelling was intentional so as not to collide with the namespace of the Nissan Leaf.
 */

// The maximum speed of the car. Large, negative values make for some crazy backwards-driving shenanigans.
var maxSpeed = 3.00;

//How many frames before the car starts rolling.
var startDelay = 150;

// How many frames before the camera starts panning out.
var cameraDelay = 250;






imageMode(CENTER);
cursor(HAND);

// How far the car is into the brake (between 0 and 1)
var brakeFactor = 0;

// Draws a leaf at the specified x, y, rotation, scale, and optional stroke color.
var leaf = function(x, y, r, xs, ys, innerStroke){
    pushMatrix();
    translate(x, y);
    scale(xs/10, ys/10);
    rotate(r);
    translate(79, -203);
    translate(-22, 66);
    
    pushStyle();
    beginShape();
    vertex(121, -151);
    bezierVertex(100, -35, 17, -48, -43, 0);
    bezierVertex(-121, 61, -86, 170, 11, 145);
    bezierVertex(38, 140, 85, 117, 108, 64);
    bezierVertex(136, 0, 142, -58, 122, -151);
    endShape();
    noFill();
    stroke(innerStroke || color(15, 97, 0, 60));
    strokeWeight(9);
    bezier(112, -63, 87, 3, -38, 29, -79, 203);
    strokeWeight(5);
    bezier(65, 3, 73, 4, 104, -1, 119, -10);
    bezier(20, 44, 53, 45, 74, 46, 109, 33);
    bezier(-23, 95, 16, 102, 74, 91, 84, 86);
    bezier(33, 10, 30, -2, 35, -31, 41, -39);
    bezier(-14, 55, -20, 42, -18, 6, -9, -11);
    bezier(-52, 109, -62, 77, -55, 31, -51, 15);
    popStyle();
    
    //image(getImage("avatars/leaf-green"), 34, 32, 300, 300);

    popMatrix();
};

// Draws a log wheel at the specified x, y, rotation speed, and rotation offset.
var wheel = function(x, y, speed, offset){
    pushMatrix();
    translate(x, y);
    rotate(frameCount * speed + offset);
    rectMode(CENTER);
    rect(0, 0, 42, 42, 90);
    strokeWeight(1);
    for(var w = 30; w > 0; w -= 8){
        rotate(19);
        rect(0, 0, w, w, 0.5 * w);
    }
    popMatrix();
};

// Draws the Leef car at the specified x, y, rotation, and scale.
var leef = function(speed, x, y, r, xs, ys){
    pushMatrix();
        translate(x, y);
        rotate(r);
        scale(xs, ys);
        
        //Blowing Leaves (don't show if braking)
        if(maxSpeed * speed > 0){
            fill(134, 255, 41, 190);
            stroke(63, 168, 42, 50);
            strokeWeight(18);
            for(var p = 0; p < 20; p += 0.5){
                var f = (frameCount * 0.006 + p / 20) % 1;
                pushMatrix();
                var a = 10 + f * 180 * speed + 82;
                translate(/*-65 - f * speed * 800*/0 + cos(a) * 700, -294 + noise(p * 165) * 10 + sin(a) * 227);
                rotate(sin(p * 65) * 10 * frameCount);
                scale(2.3 * pow(0.1, f));
                scale(0.8, 1);
                
                //fill(255 * (1 - f) * min(frameCount * 0.005, 1));
                leaf(0, 0, 20, 0.8, 0.8);
                popMatrix();
            }
        }
        
        //Skew based on speed
        scale(1, 6);
        rotate(-constrain(speed, -4, 4));
        scale(1, 1/6);
        rotate(constrain(speed, -4, 4) * 5.5);
        
        //Wheels
        fill(199, 149, 0);
        stroke(173, 92, 21);
        strokeWeight(4);
        wheel(-80, 0 + sin(frameCount * 20 * speed) * 2 * constrain(speed, -2, 2), speed * 5, 0);
        wheel(80, 0 + sin(frameCount * 20 * speed) * 2 * constrain(speed, -2, 2), speed * 5, 140);
        
        //Leaf
        fill(165, 242, 0);
        stroke(135, 201, 48);
        strokeWeight(6);
        leaf(-113, -77 + sin(frameCount * 32) * 2 * constrain(speed, -2, 2), 57, 8, 8);
    popMatrix();
};

//Draws the track.
var trackRotation = 0;
var trackDetails = [];
for(var t = 0; t < 90; t++){
    trackDetails.push({
        radius: random(-60, 60),
        rotation: random(360),
        length: random(2, 6)
    });
}
var track = function(){
    fill(170, 199, 73);
    pushMatrix();
        translate(0, 202);
        scale(1, 0.3);
        scale(2.3);
        
        //Sand/Field
        stroke(255, 246, 145);
        strokeCap(SQUARE);
        strokeWeight(59);
        arc(0, 0, 300, 300, -1, 181);
        strokeWeight(15);
        arc(0, 0, 300, 300, 179, 361);
        
        //Leaf Pattern
        noFill();
        pushMatrix();
            translate(0, -24);
            rotate(trackRotation);
            stroke(0, 0, 0, 30);
            for(var a = 0; a < 360; a += 30){
                pushMatrix();
                rotate(a);
                leaf(0, -55, -91, -cos(a + trackRotation) * 0.1 + 1, 0, color(0, 0, 0, 30));
                popMatrix();
            }
            leaf(-15, 23, 0, 2, 0, color(0, 0, 0, 30));
        popMatrix();
        
        //Track Markings
        noFill();
        stroke(128, 102, 0);
        for(var t = 0; t < trackDetails.length; t++){
            var trackDetail = trackDetails[t];
            pushMatrix();
            var a = trackDetail.rotation + trackRotation;
            rotate(a);
            strokeWeight((a % 360 < 180) ? 2 : 0.8);
            arc(0, 0, 300 + trackDetail.radius * ((a % 360 < 180) ? 1 : 0.2), 300 + trackDetail.radius, 0, trackDetail.length);
            popMatrix();
        }
    popMatrix();
};

//Draws all the fans around the track.
var avatars = [
    getImage("avatars/leafers-seed"),
    getImage("avatars/leafers-seedling"),
    getImage("avatars/leafers-sapling"),
    getImage("avatars/leafers-tree"),
    getImage("avatars/leafers-ultimate"),
    getImage("avatars/piceratops-seed"),
    getImage("avatars/piceratops-seedling"),
    getImage("avatars/piceratops-sapling"),
    getImage("avatars/piceratops-tree"),
    getImage("avatars/piceratops-ultimate"),
    getImage("avatars/aqualine-seed"),
    getImage("avatars/aqualine-seedling"),
    getImage("avatars/aqualine-sapling"),
    getImage("avatars/aqualine-tree"),
    getImage("avatars/aqualine-ultimate"),
    getImage("avatars/primosaur-seed"),
    getImage("avatars/primosaur-seedling"),
    getImage("avatars/primosaur-sapling"),
    getImage("avatars/primosaur-tree"),
    getImage("avatars/primosaur-ultimate"),
    getImage("avatars/duskpin-seed"),
    getImage("avatars/duskpin-seedling"),
    getImage("avatars/duskpin-sapling"),
    getImage("avatars/duskpin-tree"),
    getImage("avatars/duskpin-ultimate"),
    getImage("avatars/starky-seed"),
    getImage("avatars/starky-seedling"),
    getImage("avatars/starky-sapling"),
    getImage("avatars/starky-tree"),
    getImage("avatars/starky-ultimate")
];
var fanPositions = [];
for(var f = 0; f < 90; f++){
    fanPositions.push({
        image: floor(random(avatars.length)),
        angle: f * 360/90 + random(20),
        radiusScale: random(1, 1.3),
        jumpSpeed: random(10, 20),
        jumpHeight: random(0, 10)
    });
}
var fans = function() {
    /*
    for(var a = 200 + trackRotation % 10; a < 340; a += 10){
        image(avatars[floor(random(avatars.length))], cos(a) * 244, 117 + sin(a) * 44, 30, 30);
    }*/
    for(var f = 0; f < fanPositions.length; f++){
        var fan = fanPositions[f];
        var a = fan.angle + trackRotation;
        var fanSize = 20 * ((a % 360 < 180) ? 1.6 : 1) - cos(a) * 1;
        var fanRadiusScale = fan.radiusScale * (a % 360 < 180) ? 1 : 0.94;
        image(
            avatars[fan.image],
            cos(a) * 391 * fanRadiusScale,
            217 + sin(a) * 143 * fanRadiusScale - fanSize / 2 + sin(frameCount * fan.jumpSpeed) * fan.jumpHeight,
            fanSize, fanSize
        );
    }
};

var easeOutBack = function(pos) {
    var s = 10;
    
    return s * pos * pow(1/s, pos);
    //return pos * pos * -2 + 5 * pos;
};

var draw = function() {
    background(219, 255, 214);
    
    pushMatrix();
        //Zooms/pans the camera at the beginning
        translate(width / 2, -370 * pow(0.998, max(frameCount - cameraDelay, 0)));
        scale(1 + 1.5 * pow(0.998, max(frameCount - cameraDelay, 0)));
        
        track();
        
        //The Leef's speed increases steadily until maxSpeed is reached. Brakes if mouse is pressed.
        var leefSpeed = constrain((frameCount - startDelay)/600, 0, maxSpeed) * (1 - easeOutBack(brakeFactor));
        
        leef(leefSpeed, 0, 286, 0, 0.4);
        /*
        leef(
            200 - cos(frameCount) * 70,
            286 + sin(frameCount) * 70,
            atan((sin(frameCount) - sin(frameCount + 1)) / (cos(frameCount) - cos(frameCount + 1)) / 2),
            0.5 * sin(frameCount), 0.5);
            */
        
        //image(getImage("avatars/leafers-ultimate"), 0, 153, 60, 60);
        
        fans();
    popMatrix();
    
    //Black overlay at the beginning
    fill(0, 0, 0, 255 * (1 - frameCount/startDelay));
    noStroke();
    rect(0, 0, 400, 400);
    
    brakeFactor = constrain(mouseIsPressed ? brakeFactor + 0.05 : brakeFactor - 0.05, 0, 1);
    
    trackRotation += leefSpeed * (1-brakeFactor);
};
