//Nikola Tesla Logo
//by DY

//Requested by Nikola Tesla⚡™ (www.khanacademy.org/profile/TheElectricMage/)

var nikolaTeslaLogo = function(x, y, s){
    pushMatrix();
    translate(x, y);
    scale(s);
    
    var nikola = function(x, y, s){
        noFill();
        pushMatrix();
        translate(x, y);
        scale(s);
        line(-103, -25, -103, 25);
        line(-103, -25, -77, 25);
        line(-77, -25, -77, 25);
        line(-61, -25, -61, 25);
        line(-45, -25, -45, 25);
        line(-45, 6, -21, -25);
        line(-37, 0, -21, 25);
        ellipse(3, 0, 32, 50);
        line(31, -25, 31, 25);
        line(31, 25, 51, 25);
        arc(77, 0, 28, 52, -180, 0);
        line(63, 0, 63, 25);
        line(63, 4, 91, 4);
        line(91, 0, 91, 25);
        popMatrix();
    };
    
    var esla = function(x, y){
        noFill();
        pushMatrix();
        translate(x, y);
        //line(-116.25, -31.25, -81.25, -31.25);
        //line(-98.75, -31.25, -98.75, 31.25);
        line(-66.25, -31.25, -66.25, 31.25);
        line(-66.25, -31.25, -36.25, -31.25);
        line(-66.25, 0, -41.25, 0);
        line(-66.25, 31.25, -36.25, 31.25);
        arc(-5, -16.25, 32.5, 32.5, 90, 340);
        arc(-5, 16.25, 35, 32.5, -90, 160);
        line(26.25, -31.25, 26.25, 31.25);
        line(26.25, 31.25, 51.25, 31.25);
        arc(83.75, 0, 35, 65, -180, 0);
        line(66.25, 0, 66.25, 31.25);
        line(66.25, 5, 101.25, 5);
        line(101.25, 0, 101.25, 31.25);
        popMatrix();
    };
    
    var teslaCoil = function(x, y){
        pushMatrix();
        translate(x, y);
        
        stroke(255, 255, 255, 10);
        strokeWeight(random(10, 20));
        for(var y = 0; y <= 1; y += 0.05){
            fill(lerpColor(color(245, 245, 255, 180), color(140, 170, 200, 180), y));
            ellipse(0, -120 + y * 50, 100 + 50 * sin(acos(y*2-1)), 16);
        }
        
        fill(0, 255, 255, 100);
        
        for(var a = 0; a <= 360; a += 5){
            pushMatrix();
            translate(a < 180 ? -70 : 70, -95);
            rotate(a + random(-1, 1));
            beginShape();
            for(var y = 0; y <= 80; y += 5){
                vertex(random(-5, 5), y + random(-5, 5));
            }
            endShape();
            popMatrix();
        }
        
        strokeWeight(4);
        stroke(188, 189, 209);
        line(0, -70, 0, 20);
        
        scale(1, 0.5);
        strokeWeight(16);
        stroke(170, 182, 230);
        line(0, -50 * 2, 0, 200 * 2);
        
        popMatrix();
    };
    
    teslaCoil(-80, 0);
    
    pushMatrix();
    fill(247, 255, 140, 140);
    noStroke();
    translate(150, 20);
    scale(1.3 + random(0, 0.3));
    quad(9, -51, -30, 0, 0, 10.5, 0, -10.5);
    quad(-9, 51, 30, 0, 0, -10.5, 0, 10.5);
    popMatrix();
    
    stroke(247, 255, 0, 255);
    strokeWeight(2);
    nikola(45, -25, 0.9);
    
    stroke(170, 182, 230);
    strokeWeight(9);
    esla(21, 45);
    
    popMatrix();
};

var DY = function(x, y, sz){
    translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

draw = function() {
    colorMode(HSB);
    background(130, 200, random(150, 160));
    colorMode(RGB);
    
    nikolaTeslaLogo(200, 200, 1);

    fill(255);
    textFont(loadFont("sans-serif", 0), 16);
    textAlign(CENTER, CENTER);
    text("by", 335, 370);
    DY(350, 350, 1/10);
};
