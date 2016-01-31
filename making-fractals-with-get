/**
 * Makes a fractal using the following process:
 * Take a snapshot of the entire screen
 * Redraw it at several predefined locations and rotations
 * Repeat.
 */

// Click to generate a new fractal. Play around with the initial scene below and see how you can achieve different colors and effects.

imageMode(CENTER);

background(245);
fill(255);
noStroke();
ellipse(width/2, height/2, 300, 300);

image(getImage("avatars/piceratops-ultimate"), 75, 75, 150, 150);
image(getImage("avatars/primosaur-ultimate"), 200, 75, 150, 150);
image(getImage("avatars/duskpin-ultimate"), 325, 75, 150, 150);
image(getImage("avatars/leafers-ultimate"), 75, 325, 150, 150);
image(getImage("avatars/starky-ultimate"), 200, 325, 150, 150);
image(getImage("avatars/aqualine-ultimate"), 325, 325, 150, 150);












var fractalFrames = [];
for(var i = 0; i < floor(random(3, 4)); i++){
    fractalFrames.push({
        x: random(50, width - 50),
        y: random(50, height - 50),
        s: random(width * 0.6, width * 0.9),
        r: random(0, 120),
    });
}

frameRate(20);
draw = function(){
    if(frameCount > 5){
        var i = get(0, 0, width, height);
        for(var f = 0; f < fractalFrames.length; f++){
            var frame = fractalFrames[f];
            pushMatrix();
            translate(frame.x, frame.y);
            rotate(frame.r);
            image(i, 0, 0, frame.s, frame.s);
            popMatrix();
        }
    }
    if(frameCount > 40){
        noLoop();
    }
};

mouseClicked = function(){ Program.restart(); };
