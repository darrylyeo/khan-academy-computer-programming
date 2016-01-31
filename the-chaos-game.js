// THE CHAOS GAME
// A Visualization by DY
//
// A simple way to construct a fractal such as a
// Sierpinski Triangle!
//
// en.wikipedia.org/wiki/Sierpinski_triangle#Chaos_game

/**HOW IT WORKS:
 * 
 * Define three vertices that make a triangle.
 * Make a point within the triangle.
 * Make another point halfway between the previous point and one of the vertices of the triangle.
 * Repeat the previous step.
 * 
 * The result is a Sierpinski triangle. Enjoy!
*/

// Change the two following variables for different results! Can you find another fractal?

// How far between the previous point and a vertex should the new point go? 
var newPointDistanceFactor = 1/2;

// The points that make up the triangle. Change the numbers, and even try adding some vertices!
var vertices = [
    new PVector(200, 30),
    new PVector(40, 315),
    new PVector(360, 315)
];





frameRate(0);

var mouseIsOver;
mouseOver = function(){ mouseIsOver = true; };
mouseOut = function(){ mouseIsOver = false; };

var introTextAlpha = 255;

var animationDelay = 100;
var maxAnimationDelay = 150;
var minAnimationDelay = -1;

var points = [];

var previousPoint;
var goToVertex;
var currentPoint;

var MyPoint = function(pos, maxSize, minSize, shrinkSpeed, fromColor, toColor, lerpColorSpeed){
    this.pos = pos;
    this.max = maxSize;
    this.min = minSize;
    this.size = maxSize;
    this.shrinkSpeed = shrinkSpeed;
    this.fromColor = fromColor;
    this.toColor = toColor;
    this.lerpColor = 0;
    this.lerpColorSpeed = lerpColorSpeed;
};

MyPoint.prototype.update = function(){
    this.size = max(this.size - this.shrinkSpeed, this.min);
    this.lerpColor = min(this.lerpColor + this.lerpColorSpeed, 1);
};

MyPoint.prototype.draw = function(){
    stroke(lerpColor(this.fromColor, this.toColor, this.lerpColor));
    strokeWeight(this.size);
    point(this.pos.x, this.pos.y);
};

var newCurrentPoint = function(pos){
    return new MyPoint(pos, 24, 12, 0.8, color(92, 222, 255), color(197, 127, 255), 0.06);
};

var newPreviousPoint = function(pos){
    return new MyPoint(pos, 12, 4, 0.3, color(197, 127, 255), color(112, 93, 0), 0.015);
};

var update = function(){
    if(points.length){
        previousPoint = newPreviousPoint(points[points.length - 1]);
        goToVertex = vertices[floor(random(vertices.length))];
        currentPoint = newCurrentPoint(
            new PVector(
                previousPoint.pos.x + (goToVertex.x - previousPoint.pos.x) * newPointDistanceFactor,
                previousPoint.pos.y + (goToVertex.y - previousPoint.pos.y) * newPointDistanceFactor
            )
        );
        
        points.push(currentPoint.pos);
    }
};

var render = function() {
    cursor();
    
    noStroke();
    fill(255, 218, 107, 200);
    rect(0, 0, 401, 401);
    
    //Triangle Vertices
    stroke(255, 94, 223);
    strokeWeight(10);
    beginShape();
    for (var p in vertices){
        point(vertices[p].x, vertices[p].y);
        vertex(vertices[p].x, vertices[p].y);
    }
    fill(255, 255, 255, 50);
    noStroke();
    endShape();
    
    if(points.length){
        //All the points
        stroke(112, 93, 0);
        strokeWeight(3);
        for(var p in points){
            point(points[p].x, points[p].y);
        }
        
        //Line between old vertex and triangle vertex
        if(points.length > 1){
            stroke(255);
            strokeWeight(2);
            line(goToVertex.x, goToVertex.y, previousPoint.pos.x, previousPoint.pos.y);
            
            //Previous Point
            previousPoint.update();
            previousPoint.draw();
        }
        
        //Current Point
        currentPoint.update();
        currentPoint.draw();
    }else{
        if(mouseIsOver && mouseY < 355){
            noCursor();
            
            //Cursor
            stroke(255, 0, 0);
            strokeWeight(10 + sin(frameCount * 8) * 5);
            point(mouseX, mouseY);
            introTextAlpha -= 10;
        }else{
            introTextAlpha += 10;
        }
        
        introTextAlpha = constrain(introTextAlpha, 0, 255);
        
        //Beginning Text
        textAlign(CENTER, CENTER);
        fill(120, 95, 20, introTextAlpha);
        textFont(loadFont("Avenir Bold", 0), 30);
        textSize(42);
        text("The Chaos Game", 200, 130);
        textFont(loadFont("Avenir", 0), 30);
        textSize(20);
        text("A Visualization by DY", 200, 175);
        fill(168, 134, 30, introTextAlpha);
        textSize(18);
        text("Click anywhere to make the first point!", 200, 270 + sin(frameCount * 2) * 5);
    }
};

render();

var ui = function(){
    fill(255, 255, 255, 100);
    noStroke();
    rect(0, 355, 400, 45);
    
    fill(163, 145, 93);
    textSize(10);
    textAlign(LEFT, CENTER);
    text("Distance Factor: " + newPointDistanceFactor.toFixed(2), 5, 345);
    textSize(9);
    textAlign(RIGHT, CENTER);
    text("(To get to the next point, we travel " + newPointDistanceFactor.toFixed(2) + " the distance to a vertex.)", 395, 345);
    
    fill(82);
    stroke(82);
    
    textAlign(CENTER, CENTER);
    textSize(9);
    text("DELAY", 25, 372);
    textSize(14);
    text(animationDelay === -1 ? -5 : animationDelay, 25, 384);
    
    fill(255, 220, 115);
    strokeWeight(2);
    line(55, 380, 380, 380);
    ellipse(animationDelay*325/(maxAnimationDelay - minAnimationDelay) + 55, 380, 15, 15);
    
    if(mouseIsPressed && mouseY > 365){
        animationDelay = (mouseX - 55)/325*(maxAnimationDelay - minAnimationDelay);
        animationDelay = round(constrain(animationDelay, minAnimationDelay, maxAnimationDelay));
    }
};

draw = function() {
    if(animationDelay === -1){
        for(var i = 0; i < 5; i++){
            update();
        }
    }else if(animationDelay === 0 || frameCount % animationDelay === 0){
        update();
    }
    
    render();
    
    ui();
};

mouseClicked = function(){
    if(!points.length && mouseY < 355){
        currentPoint = newCurrentPoint(
            new PVector(mouseX, mouseY)
        );
        points.push(currentPoint.pos);
        render();
    }
};
