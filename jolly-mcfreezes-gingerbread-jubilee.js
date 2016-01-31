/**
 * Jolly McFreeze's Gingerbread Jubilee
 * by DY
 * 
 * Jolly McFreeze the Snowman welcomes you to his freshly-baked gingerbread house.
 * What surprises will await you inside?
 * 
 * Use the arrow keys to walk around.
 * Drag the scene or use the WASD keys to adjust the viewing angle.
 * Use the numeric keys to toggle components on and off (listed below).
 * 
 * Wait until nightfall for a special message!
 * 
 * Made with DY's 3D Much Whee library, a helper library for Processing.js's P3D graphics API:
 * www.khanacademy.org/computer-programming/3d-much-whee/5008266156441600
*/

var options = {
    // Laggy? Change these.     // Keyboard shortcuts:
    numberOfSnowflakes: 50,
    showSnowflakes: true,       // 1
    showIcing: true,            // 2
    
    snowflakeMaxHorizontalVelocity: 4,
    snowflakeMaxVerticalVelocity: 15,
    walkSpeed: 25,
    viewAngleSpeed: 5,
    
    invertDrag: false,
    //switchArrowsAndWASD: false,
    
    debugMode: false
};

// Keyboard Shortcuts
var keyToOptions = {
    "1": "showSnowflakes",
    "2": "showIcing",
    "3": "invertDrag",
    //"4": "switchArrowsAndWASD",
    "0": "debugMode",
};
















// In case Oh Noes freaks out too soon
var begin = function() {
    this[["KAInfiniteLoopSetTimeout"][0]](100000);
};
begin();

// Getting a "__env__XXXXXXXXX_____ is not a function" message? Turn this off.
var optimizeRestarts = false;//true;

// 3D Much Whee!
// www.khanacademy.org/computer-programming/3d-much-whee/5008266156441600
var _3D = Program._3D = (Program._3D && Program._3D.isSetup && optimizeRestarts) ? Program._3D : (function(){
    var _3D = createGraphics(width, height, P3D);
    
    // Given a shape function, returns a new function that uses the first three parameters to translate the shape in 3D
    var at = function(f){
        return function(x, y, z){
            this.open();
            this.translate(x, y, z);
            f.apply(_3D, [].splice.call(arguments, 3));
            this.close();
        };
    };
    
    var _3D_Extension = {
        isSetup: false,
        
        // Camera calculation
        camera: {
            center: new PVector(1200, 1200, 200),
            rotateZ: 46,
            rotateXY: 101,
            // Move the camera by specified scale (s)
            update: function(dx, dy, s){
                s = s || 1;
                if(dx){ this.rotateZ += dx * s; }
                if(dy){ this.rotateXY -= dy * s; }
                this.rotateXY = constrain(this.rotateXY, 1e-5, 179.999);
                
                _3D.camera(
                    this.center.x + cos(this.rotateZ) * sin(this.rotateXY),
                    this.center.y + sin(this.rotateZ) * sin(this.rotateXY),
                    this.center.z + cos(this.rotateXY),
                    this.center.x, this.center.y, this.center.z,
                    0, 0, -1
                );
                //redraw();
            }
        },
        
        // Main execution loop
        run: function() {
            try {
                if(!this.isSetup){
                    try {
                        this.setup();
                        this.isSetup = true;
                    } catch(e) {
                        
                    }
                }
                
                // Render
                this.draw();
                image(this, 0, 0);
                
                // Move/change camera angle when key is pressed
                if(keyIsPressed){
                    switch(keyCode){
                        case LEFT:
                        case UP:
                        case RIGHT:
                        case DOWN:
                            var moveBy = new PVector(0, options.walkSpeed);
                            moveBy.rotate(this.camera.rotateZ + (keyCode - LEFT) * 90);
                            this.camera.center.add(moveBy);
                            this.camera.update();
                            break;
                        case ENTER:
                        case RETURN:
                            this.camera.center.z += options.walkSpeed;
                            this.camera.update();
                            break;
                        case SHIFT:
                            this.camera.center.z -= options.walkSpeed;
                            this.camera.update();
                            break;
                    }
                    switch(key.toString()){
                        case "a":
                            this.camera.update(-options.viewAngleSpeed);
                            break;
                        case "w":
                            this.camera.update(0, -options.viewAngleSpeed);
                            break;
                        case "d":
                            this.camera.update(options.viewAngleSpeed);
                            break;
                        case "s":
                            this.camera.update(0, options.viewAngleSpeed);
                            break;
                        case "\n":
                            this.camera.center.z += options.walkSpeed;
                            this.camera.update();
                            break;
                    }
                }
            } catch (e) {
                debug(e);
            }
        },
        
        at: at,
        
        open: function(){//debug(this);
            //this.pushStyle();
            this.pushMatrix();
        },
        close: function(){
            this.popMatrix();
            //this.popStyle();
        },
        
        // Added/Modified 3D primitives
        boxAt: at(function(l, w, h, rx, ry, rz) {
            w = w || l;
            h = h || l;
            if(this.boxMode === CORNER){
                this.translate(l/2, w/2, h/2);
            }
            this.rotate(rx || 0, ry, rz);
            this.box(l, w, h);
        }),
        boxMode: CORNER,
        
        sphereAt: at(_3D.sphere),
        
        prism: function(h, vertices){
            if(arguments.length > 2){ vertices = [].splice.call(arguments, 1); }
            
            var v = vertices.length - vertices.length % 2;
            
            this.beginShape();
            for(var i = 0; i < v; i += 2){
                this.vertex(vertices[i], vertices[i + 1], -h/2);
            }
            this.endShape(CLOSE);
            
            this.beginShape();
            for(var i = 0; i < v; i += 2){
                this.vertex(vertices[i], vertices[i + 1], h/2);
            }
            this.endShape(CLOSE);
            
            this.beginShape(QUAD_STRIP);
            for(var i = 0; i < v+2; i += 2){
                this.vertex(vertices[i % v], vertices[(i + 1) % v], -h/2);
                this.vertex(vertices[i % v], vertices[(i + 1) % v], h/2);
            }
            this.endShape(CLOSE);
        },
        
        cylinderDetail: 12,
        cylinder: function(r, h){
            var a = 360 / this.cylinderDetail;
            var vertices = [];
            for (var i = 0; i < this.cylinderDetail; i++) {
                vertices.push(cos(i*a)*r, sin(i*a)*r);
            }
            this.prism(h, vertices);
        },
        cylinderAt: at(function(){this.cylinder.apply(this, arguments);}),
    };
    
    for (var p in _3D_Extension) {
        var prop = _3D_Extension[p];
        if(typeof prop === "object" && _3D[p]){
            for (var pp in prop) {
                _3D[p][pp] = prop[pp];
            }
        }else{
            _3D[p] = _3D_Extension[p];
        }
    }
    
    return _3D;
})();











// Scene variables
var EMISSIVE = color(25, 25, 60);
var _AMBIENT;
var daylight;



// "Happy Holidays!" generated with DY's MyFont API
var happyHolidays = function(){
    background(
        0, 0);
    noFill();
    translate(200, 50);
    scale(0.65);
    stroke(214, 111, 0);stroke(255);
    strokeWeight(6);
    line(-285.75, -18.75, -285.75, 18.75);
    line(-285.75, 0, -264.75, 0);
    line(-264.75, -18.75, -264.75, 18.75);
    arc(-233.25, 0, 21, 39, -180, 0);
    line(-243.75, 0, -243.75, 18.75);
    line(-243.75, 3, -222.75, 3);
    line(-222.75, 0, -222.75, 18.75);
    line(-201.75, -18.75, -201.75, 18.75);
    arc(-201.75, -6.75, 37.5, 24, -90, 90);
    line(-162.75, -18.75, -162.75, 18.75);
    arc(-162.75, -6.75, 37.5, 24, -90, 90);
    line(-123.75, -18.75, -111.75, 3);
    line(-99.75, -18.75, -111.75, 3);
    line(-111.75, 18.75, -111.75, 3);
    line(-54.75, -18.75, -54.75, 18.75);
    line(-54.75, 0, -33.75, 0);
    line(-33.75, -18.75, -33.75, 18.75);
    ellipse(-0.75, 0, 24, 37.5);
    line(32.25, -18.75, 32.25, 18.75);
    line(32.25, 18.75, 50.25, 18.75);
    line(72.75, -18.75, 72.75, 18.75);
    line(93.75, -18.75, 93.75, 18.75);
    arc(93.75, 0.75, 39, 39, -90, 90);
    arc(144.75, 0, 21, 39, -180, 0);
    line(134.25, 0, 134.25, 18.75);
    line(134.25, 3, 155.25, 3);
    line(155.25, 0, 155.25, 18.75);
    line(176.25, -18.75, 188.25, 3);
    line(200.25, -18.75, 188.25, 3);
    line(188.25, 18.75, 188.25, 3);
    arc(231, -9.75, 19.5, 19.5, 90, 340);
    arc(231, 9.75, 21, 19.5, -90, 160);
    line(261.75, -18.75, 261.75, 9);
    ellipse(261.75, 18.75, 1.5, 1.5);
    resetMatrix();
    return get(0, 0, 400, 100);
}();

// Carpet of noise for the house interior
var carpet = function(){
    var carpetSize = 100;
    noStroke();
    colorMode(HSB);
    noiseDetail(2, 10);
    scale(width/carpetSize);
    for(var x = 0; x <= carpetSize; x++){
        for(var y = 0; y <= carpetSize; y++){
            var n = noise(x * 2, y * 2, x/10 + y/10);
            fill((n * 20) % 255, 255, 255);
            rect(x, y, 1, 1);
        }
    }
    colorMode(RGB);
    resetMatrix();
    return get(0, 0, carpetSize, carpetSize);
}();

var snowNoes = getImage("seasonal/snownoes");
var fatherWinston = getImage("seasonal/father-winston");
var hopDeer = getImage("seasonal/hopper-reindeer");

// House object
var house = {
    width: 1000,
    depth: 800,
    height: 600,
    roofHeight: 400,
    roofOverhang: 100,
    draw: function(){
        this.noStroke();
        
        // Walls
        /*this.fill(0, 0, 0, 0.1);
        this.open();
            this.translate(0, 0, house.height);
            this.rect(house.width, house.depth);
            this.boxAt(0, 0, 0, house.width, house.depth, 1);
        this.close();*/
        //this.fill(140, 89, 0);
        //this.boxAt(0, 0, house.height / 2, house.width, house.depth, house.height);
        
        // Roof
        this.fill(255, 153, 0);
        this.ambient(200);
        this.boxAt(0, 0, house.height - 1, house.width + house.roofOverhang * 2, house.depth + house.roofOverhang * 2, 1);
        this.fill(255, 167, 25);
        this.open();
            this.translate(0, 0, house.height);
            this.rotateX(PI/2);
            this.prism(
                house.depth + house.roofOverhang * 2,
                -house.width / 2 - house.roofOverhang, 0,
                house.width / 2 + house.roofOverhang, 0,
                0, house.roofHeight
            );
        this.close();
        
        // Roof Candy
        this.colorMode(HSB);
        this.fill(frameCount % 255, 140, 255);
        this.emissive(frameCount % 255, 255, 255);
        this.sphereAt(0, -house.depth / 2, house.height + house.roofHeight * 2/5, 140);
        this.sphereAt(0, house.depth / 2, house.height + house.roofHeight * 2/5, 140);
        
        this.emissive(EMISSIVE);
        this.ambient(_AMBIENT);
        
        // Chimney
        for(var i = 0, z = 0; z < house.height + house.roofHeight + 300; z += 125){
            this.fill(i % 2 ? color(255) : color(255, 0, 0));
            this.emissive(i % 2 ? color(180) : color(150, 50, 50));
            this.strokeWeight(0.001);
            this.stroke(0, 0, 0, 0);
            this.cylinderAt(house.width / 2 - 120, -house.depth / 2 + 120, z, 80, 125);
            this.noStroke();
            i++;
        }
        
        // Interior - show only if close enough to the house
        //if(this.camera.center.mag() < mag(house.width, house.depth) / 2 + 100){
            // Carpet
            this.emissive(240);
            this.open();
                this.translate(0, 0, 1);
                this.image(carpet, -house.width/2, -house.depth/2, house.width, house.depth);
            this.close();
            
            // Ceiling Light
            this.colorMode(HSB);
            this.fill(255);
            this.emissive(frameCount % 255, 255, 255);
            this.sphereAt(0, 0, house.height, 130);
            this.emissive(EMISSIVE);
            
            // Fireplace
            var fireColor = this.color(random(10, 20), random(200, 230), random(170, 220));
            this.fill(fireColor);
            this.emissive(fireColor);
            this.boxAt(-house.width/2 + 120, -house.depth/2 + 120, 70, 180, 180, 140);
            this.fill(125, 200);
            this.boxAt(-house.width/2 + 120, -house.depth/2 + 120, 80, 200, 200, 160);
            
            // Picture
            this.open();
                this.fill(255);
                this.emissive(frameCount % 255, 100, 255);
                this.translate(0, -house.depth / 2 + 1, house.height * 0.8);
                this.rotateX(-PI / 2);
                this.image(snowNoes, -200, 0);
                this.image(hopDeer, -55, 0);
                this.image(fatherWinston, 100, 0);
            this.close();
        //}
        
        this.colorMode(RGB);
        this.emissive(EMISSIVE);
        
        // Iterate through the 4 walls
        for(var a = 1; a <= 4; a++){
            this.open();
                this.rotate(PI / 2 * a);
                
                var isSide = a % 2 === 0;
                var length = isSide ? house.depth : house.width;
                var width = isSide ? house.width : house.depth;
                
                // Roof Icing
                if(options.showIcing){
                    this.fill(255);
                    this.open();
                    this.translate(0, 0, house.height);
                    for(var i = 0; i <= 1; i += (!isSide ? 1/3 : 2)){
                        this.open();
                            this.translate(0, 0, house.roofHeight * i);
                            house.icing(
                                new PVector(-width/2 - house.roofOverhang, (length/2 + house.roofOverhang) * (1 - i), 0),
                                new PVector(width + house.roofOverhang * 2, undefined)
                            );
                        this.close();
                    }
                    if(isSide){
                        var roofTip = new PVector(0, length/2 + house.roofOverhang, house.roofHeight);
                        var halfRoofWidth = width/2 + house.roofOverhang;
                        house.icing(roofTip, new PVector(-halfRoofWidth, 0, -house.roofHeight), 7, 22);
                        house.icing(roofTip, new PVector(halfRoofWidth, 0, -house.roofHeight), 7, 22);
                    }
                    this.close();
                }
                
                /*
                // Roof Snow
                if(options.showIcing){
                    this.fill(255);
                    var z = 0;
                    for(var z = 0; z <= house.roofHeight; z += (isSide ? house.roofHeight / 3 : 20)){
                        var s = z/house.roofHeight;
                        this.open();
                            this.translate(0, 0, house.height);
                            for(var x = -1; x <= 1; x += (isSide || z === 0 ? 1 / 20 : 2)){
                                this.sphereAt(
                                    house.roofOverhang - (house.roofOverhang + width / 2) * (isSide ? s : 0),
                                    x * (length / 2 + house.roofOverhang) * (isSide ? 1 : 1 - s),
                                    z,
                                    20 + sin(x * 1600 + z * 5) * 8
                                );
                            }
                        this.close();
                    }
                }*/
                
                this.translate(width / 2, 0, 0);
                
                // Rainbow Gumdrops?
                this.colorMode(HSB);
                for(var z = 0; z <= house.height; z += 75 / 2){
                    this.fill(z % 255, 200, 255);
                    this.emissive(z % 255, 200, 200);
                    this.sphereAt(0, length / 2, z, 20 + sin(z * 6) * 5);
                }
                this.emissive(EMISSIVE);
                
                this.colorMode(RGB);
                
                // Side Windows
                if(isSide){
                    this.fill(199, 126, 0);
                    this.boxAt(0, 0, house.height / 2, 50, length * 0.6, 20);
                    this.fill(201, 241, 255, 100);
                    this.emissive(255);
                    this.boxAt(0, 0, house.height / 2 + 100, 0.1, length * 0.6, 200);
                }
                this.emissive(EMISSIVE);
                
                // Front
                if(a === 1){
                    // Stepping Stones
                    this.colorMode(HSB);
                    for(var i = 0; i < 9; i++){
                        this.fill(255);
                        this.emissive(i * 255 / 9, 200, 255);
                        this.cylinderAt(220 + i * 60, sin(i * 100) * 120, 0, 40 + sin(i * 145) * 10, 40 - i * 4);
                    }
                    
                    this.colorMode(RGB);
                    this.emissive(EMISSIVE);
                    
                    // Stairs
                    this.fill(199, 126, 0);
                    this.boxAt(0, 0, 15, 300, house.depth * 0.8, 20);
                    this.boxAt(0, 0, 35, 240, house.depth * 0.8 - 60, 20);
                    this.boxAt(0, 0, 55, 180, house.depth * 0.8 - 120, 20);
                    
                    this.open();
                        this.translate(0, 0, 175);
                        // Door
                        this.fill(184, 123, 0);
                        this.boxAt(0, -house.depth * 0.1 - 15, 0, 10, house.depth * 0.2, 350);
                        this.boxAt(0, house.depth * 0.1 + 15, 0, 10, house.depth * 0.2, 350);
                        
                        // Door Icing
                        if(options.showIcing){
                            this.fill(255);
                            var topLeft = new PVector(0, house.depth * 0.2 + 15, 175);
                            var topRight = new PVector(0, -house.depth * 0.2 - 15, 175);
                            var doorHeight = new PVector(0, 0, -350);
                            house.icing(topRight, PVector.sub(topLeft, topRight), 14, 17, 15, 5);
                            house.icing(topLeft, doorHeight, 14, 17, 15, 5);
                            house.icing(topRight, doorHeight, 14, 17, 15, 5);
                        }
                        
                        // Front Windows
                        this.translate(0, 0, 85);
                        this.rotateY(PI / 2);
                        this.fill(255, 153, 0);
                        this.emissive(195);
                        //this.fill(201, 241, 255, 100);
                        //this.emissive(255);
                        this.cylinderAt(0, -house.depth * 2/5, 0, 70, 20);
                        this.cylinderAt(0, house.depth * 2/5, 0, 70, 20);
                    this.close();
                }
                
                // Walls
                this.fill(140, 89, 0);
                this.emissive(EMISSIVE);
                this.open();
                    this.translate(0, 0, house.height / 2);
                    this.rotateX(PI / 2);
                    this.rotateY(PI / 2);
                    this.rect(0, 0, length, house.height);
                this.close();
                
                // Message
                if(a === 1 && daylight < 0.1){
                    // Happy Holidays!
                    //this.fill(255, 255, 255, 1400 - this.camera.center.mag());
                    this.fill(255, random(220, 255));
                    this.emissive(255);
                    this.open();
                        this.translate(2, 0, house.height * 0.8 + sin(frameCount * 25) * 10);
                        this.rotateX(-PI / 2);
                        this.rotateY(PI / 2);
                        this.scale(2);
                        this.image(happyHolidays, -happyHolidays.width/2, -happyHolidays.height/2);
                    this.close();
                    this.noStroke();
                }
            this.close();
        }
    },
    
    // Draws a string of spheres from the point p1 to the point (p1 + deltaP), varying radii using a sine wave model.
    icing: function(p1, deltaP, freq, quality, s, amp){
        freq = freq || 8.5;
        quality = quality || 40;
        s = s || 20;
        amp = amp || 8;
        var p2 = PVector.add(p1, deltaP);
        for(var i = 0; i <= 1; i += 1/quality){
            _3D.sphereAt(
                map(i, 0, 1, p1.x, p2.x),
                map(i, 0, 1, p1.y, p2.y),
                map(i, 0, 1, p1.z, p2.z),
                s - cos(i * 360 * freq) * amp
            );
        }
    }
};

// Ol' Jolly McFreeze himself
var snowman = {
    rotation: 0,
    targetRotation: 1.2,
    blinkProgress: 0,
    
    update: function(){
        // 3% chance of initiating a head turn
        if(random() < 0.03){
            this.targetRotation = random(-1.3, 1.3);
        }
        // Move the head toward the target direction
        this.rotation += (this.targetRotation - this.rotation) * 0.3;
        
        // Progress the blink
        this.blinkProgress = min(this.blinkProgress + 0.3, 1);
        // 3% chance of initialting a blink
        if(random() < 0.03){
            this.blinkProgress = 0;
        }
    },
    
    draw: function(){
        this.open();
            this.translate(house.width / 2 + 100, -100);
            
            // Body
            this.fill(255);
            this.sphereAt(0, 0, 65, 100);
            this.sphereAt(0, 0, 200, 87.5);
            
            // Head
            this.rotate(snowman.rotation);
            this.sphereAt(0, 0, 320, 75);
            
            // Eyes
            this.fill(0);
            this.sphereAt(70, 25, 330, 11 * pow(cos(snowman.blinkProgress * 180), 2));
            this.sphereAt(70, -25, 330, 11 * pow(cos(snowman.blinkProgress * 180), 2));
            
            // Hat
            this.fill(100);
            this.noStroke();
            this.strokeWeight(0.1);
            this.cylinderAt(0, 0, 420, 40, 120);
            this.cylinderAt(0, 0, 390, 70, 20);
        this.close();
    }
};

// Because no snow scene is complete without 'em
var Snowflake = function(z){
    this.pos = new PVector(random(-1000, 1000), random(-1000, 1000), z || random(1300));
    this.vel = new PVector(random(-1, 1) * options.snowflakeMaxHorizontalVelocity, random(-1, 1) * options.snowflakeMaxHorizontalVelocity, random(-options.snowflakeMaxVerticalVelocity, -1));
    this.rotate = new PVector(random(TWO_PI), random(TWO_PI), random(TWO_PI));
    this.rotateVel = new PVector(random(TWO_PI*0.1), random(TWO_PI*0.1), random(TWO_PI*0.1));
};
Snowflake.prototype.draw = function(_3D) {
    // Update position/rotation
    this.pos.add(this.vel);
    this.rotate.add(this.rotateVel);
    
    _3D.open();
        _3D.translate(this.pos.x, this.pos.y, this.pos.z);
        _3D.rotateX(this.rotate.x);
        _3D.rotateY(this.rotate.y);
        _3D.rotateZ(this.rotate.z);
        // Draw the three lines
        for(var i = 0; i <= 3; i++){
            _3D.rotate(TWO_PI / 3);
            _3D.line(-12, 0, 12, 0);
        }
    _3D.close();
};

// Array of snowflakes
var snowflakes = [];
for(var s = 0; s < options.numberOfSnowflakes; s++){
    snowflakes.push(new Snowflake());
}
// Draws all snowflakes
snowflakes.draw = function(_3D) {
    _3D.stroke(255);
    _3D.strokeWeight(2);
    for(var s = 0; s < this.length; s++){
        if(this[s].pos.z < 0){
            this[s] = new Snowflake(1300);
        }
        this[s].draw(_3D);
    }
};

















draw = function() {
    _3D.run();
    
    if(options.debugMode){
        var t = (1000 / (millis() - Program.lastMillis)).toFixed(2) + " fps";
        fill(255);
        text(t, 11, 391);
        fill(0);
        text(t, 10, 390);
        Program.lastMillis = millis();
    }
};

// Change camera angle upon drag
mouseDragged = function() {
    _3D.camera.update(mouseX - pmouseX, mouseY - pmouseY, options.invertDrag ? -0.33 : 0.33);
};











cursor(MOVE);

_3D.setup = function(){
    // LIGHTS...
    this.lights();
    this.pointLight(255, 255, 255, -100, -100, -450);
    //this.pointLight(100, 100, 120, -100, -100, -450);
    //this.spotLight(255, 0, 0, 0, 0, house.height, 0, 0, 1, 101, 800); 
    /*//this.directionalLight(180, 180, 185, 0.2, 0, 1);
    //this.ambientLight(30, 30, 30, 0, 0, -10000);*/
    //this.pointLight(255, 255, 255, 0, 0, 300);
    
    // CAMERA...
    this.camera.update();
};

_3D.draw = function(){
    // ACTION!
    
    this.noStroke();
    this.boxMode = CENTER;
    
    daylight = map(cos(frameCount / 3 - 50), -1, 1, 0, 1);
    _AMBIENT = 30 + daylight * 190;
    this.ambient(_AMBIENT);
    this.emissive(EMISSIVE);
    
    // Sky
    strokeWeight(height / 10);
    for(var y = 0; y <= 1; y += 1 / 10){
        var c1 = lerpColor(color(0, 34, 54), color(143, 221, 255), daylight);
        var c2 = lerpColor(color(54, 38, 0), color(167, 255, 145), daylight);
        stroke(lerpColor(c1, c2, y));
        line(0, y * height, width, y * height);
    }
    this.background(0, 0, 0, 0);
    
    // Ground
    this.fill(235, 255, 254);
    this.rectMode(CENTER);
    this.open();
        this.translate(0, 0, -3);
        this.rect(0, 0, 7500, 7500);
        this.translate(0, 0, 1);
        this.rect(0, 0, 3500, 3500);
        this.translate(0, 0, 1);
        this.rect(0, 0, 2200, 2200);
    this.close();
    
    /*
    for(var x = -5000; x <= 5000; x += 500){
        for(var y = -5000; y <= 5000; y += 500){
            var n = noise(x * 3e-4, y * 3e-4, frameCount * 1e-3);
            this.fill(255, 255, 255, n * 255);
            this.open();
                this.translate(x, y, 13300 + n * 100);
                this.rotate(n * 70);
                this.ellipse(0, 0, 1000, 1000);
            this.close();
        }
    }*/
    
    // Snowman
    snowman.update();
    snowman.draw.call(this);
    
    // Snowflakes
    if(options.showSnowflakes){
        snowflakes.draw(this);
    }
    
    // House
    house.draw.call(this);
};

// Keyboard Shortcuts
keyPressed = function(){
    var option = keyToOptions[key.toString()];
    if(option){ options[option] = !options[option]; }
};
