/** Featured on darryl-yeo.com: darryl-yeo.com/light-runner-logo **/

//Light Runner Logo
//by DY

//Requested by Light Runner (www.khanacademy.org/profile/CandyExplorer)
/** Change up the runningSpeed! */

//parameters: x pos, y pos, scale factor
var lightRunnerLogo = function(x, y, sz){
    var runningSpeed = 15;
    
    pushMatrix();
    translate(x, y);
    scale(sz);
    
    var sine = function(amplitude, displacement){
        displacement = displacement ? displacement : 0;
        return (sin(frameCount * runningSpeed + displacement) + 1) * amplitude;
    };
    
    var hSine = function(amplitude, displacement){
        return sine(amplitude / 2, displacement);
    };
    
    var absSine = function(amplitude, displacement){
        displacement = displacement ? displacement : 0;
        return abs(sin(frameCount * runningSpeed + displacement)) * amplitude;
    };
    
    var runner = function(x, y, weight){
        pushMatrix();
        translate(x, y - absSine(15));
        
        noFill();
        
        //Head
        strokeWeight(80 + weight);
        point(50, -100 + absSine(5));
        
        strokeWeight(weight);
        //Body
        line(50, -100, -30, 50);
        //Right Leg
        bezier(-30, 50, 20 - hSine(70), 60 + hSine(20), 57 - hSine(116), 60 + hSine(40), 0 - hSine(130), 130 + absSine(20, 100));
        //Left Leg
        bezier(-30, 50, -50 + hSine(70), 80 - hSine(20), -59 + hSine(116), 100 - hSine(40), -130 + hSine(130), 120 + absSine(20, 100));
        
        //Arms
        pushMatrix();
        translate(5, -10);
        
        //Right Arm
        pushMatrix();
        rotate(sine(90));
        bezier(0, 0, 45, 50, 55, 10, 105, -20);
        popMatrix();
        
        //Left Arm
        pushMatrix();
        rotate(sine(-90));
        bezier(0, 0, -65, -40, -75, 10, -105, 40);
        popMatrix();
        
        popMatrix();
        
        popMatrix();
    };
    
    textFont(loadFont("Impact", 0), 150);
    textAlign(CENTER, CENTER);
    fill(255, 255, 255, 150);
    text("LIGHT", -sine(4), -50);
    textSize(106);
    text("RUNNER", sine(4), 60);
    
    fill(0, 0, 0, 50);
    noStroke();
    ellipse(0, 160, 300 + absSine(15), 40);
    
    stroke(204, 167, 0);
    runner(0, 0, 40);
    stroke(243, 245, 171);
    runner(0, 0, 30);
    
    popMatrix();
};

var DY = function(x, y, sz){
    translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

draw = function() {
    background(222, 206, 104);
    
    noFill();
    strokeWeight(4);
    stroke(255, 255, 255, 50);
    for(var x = -frameCount % 24; x <= width + 40; x += 12){
        for(var y = -40; y <= height; y += 12){
            rect(x - y / 10, y + x / 10, 2, 2);
        }
    }
    
    lightRunnerLogo(200, 200, 1);

    fill(255);
    textFont(loadFont("sans-serif", 0), 16);
    textAlign(CENTER, CENTER);
    text("by", 335, 370);
    DY(350, 350, 1/10);
};
