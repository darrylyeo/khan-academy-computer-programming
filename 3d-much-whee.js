/**
 * 3D Much Whee!
 * by DY
 * 
 * A helper library for constructing 3D scenes in Processing.js.
 * 
 * Rotate the scene by dragging or using the arrow keys.
 * Press ENTER/RETURN to zoom in, and SHIFT to zoom out.
 * 
 * Thanks to T#1B12P for the inital boilerplate methods.
 * Parts of his code are used throughout the library.
 * 
 * The 3D Much Whee library is compatible with Ben Burill's Module System:
 * www.khanacademy.org/cs/bens-module-system/4728010161913856
*/

// The 3 computer programming avatars are hidden in this 3D scene!
// Can you spot Oh Noes? I heard Winston went on an interstellar vacation. And Hopper likes to hide inside of things these days.


// Getting a "__env__XXXXXXXXX_____ is not a function" message? Turn this off.
var optimizeRestarts = true;

var _3D = Program._3D = (Program._3D && Program._3D.isSetup && optimizeRestarts) ? Program._3D : (function(){
    var _3D = createGraphics(width, height, P3D);
    
    var _3D_Extension = {
        isSetup: false,
        
        boxAt: function(x, y, z, l, w, h, rx, ry, rz) {
            w = w || l;
            h = h || l;
            
            this.pushMatrix();
            if(this.boxMode === CORNER){
                this.translate(x + l/2, y + w/2, z + h/2);
            }else if(this.boxMode === CENTER){
                this.translate(x, y, z);
            }
            this.rotate(rx || 0, ry, rz);
            this.box(l, w, h);
            this.popMatrix();
        },
        boxMode: CORNER,
        
        sphereAt: function(x, y, z, r) {
            this.pushMatrix();
            this.translate(x, y, z);
            this.sphere(r);
            this.popMatrix();
        },
        
        camera: {
            center: new PVector(),
            rotateZ: 45,
            rotateXY: 55,
            distance: 10,
            update: function(dx, dy){
                if(dx){ this.rotateZ += dx / 3; }
                if(dy){ this.rotateXY -= dy; }
                this.rotateXY = constrain(this.rotateXY, 1e-5, 179.999);
                
                var linearDistance = pow(2, this.distance);
                
                _3D.camera(
                    this.center.x + linearDistance * cos(this.rotateZ) * sin(this.rotateXY),
                    this.center.y + linearDistance * sin(this.rotateZ) * sin(this.rotateXY),
                    this.center.z + linearDistance * cos(this.rotateXY),
                    this.center.x, this.center.y, this.center.z,
                    0, 0, -1
                );
                //redraw();
            }
        },
        
        run: function() {
            try {
                if(!this.isSetup){
                    try {
                        this.setup();
                        this.isSetup = true;
                    } catch(e) {
                        
                    }
                }
                
                this.draw();
                image(this, 0, 0);
                
                if(keyIsPressed){
                    switch(keyCode){
                        case LEFT:
                            this.camera.rotateZ -= 5;
                            break;
                        case RIGHT:
                            this.camera.rotateZ += 5;
                            break;
                        case UP:
                            this.camera.rotateXY -= 5;
                            break;
                        case DOWN:
                            this.camera.rotateXY += 5;
                            break;
                        case ENTER:
                        case RETURN:
                            this.camera.distance -= 0.04;
                            break;
                        case SHIFT:
                            _3D.camera.distance += 0.04;
                            break;
                    }
                    switch(key.toString()){
                        case "\n":
                            this.camera.distance -= 0.04;
                            break;
                    }
                    this.camera.update();
                }
            } catch (e) {
                debug(e);
            }
        },
    };
    
    /*var makeSetter = function(prop){
        return function (x) {
            this[prop] = x;
            _3D.camera.update();
        };
    };*/
    for (var p in _3D_Extension) {
        var prop = _3D_Extension[p];
        if(typeof prop === "object" && _3D[p]){
            for (var pp in prop) {
                _3D[p][pp] = prop[pp];
            }
        }else{
            _3D[p] = _3D_Extension[p];
        }
        /*
        Object.defineProperties(_3D.camera, prop, ({
            set: makeSetter(prop)
        }));//*/
    }
    
    return _3D;
})();
var export_module; if(export_module) { export_module(_3D); }





draw = function() {
    _3D.run();
};

mouseDragged = function() {
    _3D.camera.update(mouseX - pmouseX, mouseY - pmouseY);
};










cursor(MOVE);

_3D.setup = function(){
    this.lights();
    this.pointLight(255, 255, 255, -100, -100, -600);
    //this.directionalLight(255, 255, 255, -1, 1, 1);
    
    this.camera.update();
};

_3D.draw = function(){
    // Presenting a live demo of "3D Much Whee", featuring...
    this.background(30);
    
    // a floating cube of 3D objects,
    this.strokeWeight(1);
    this.noStroke();
    this.boxMode = CENTER;
    this.sphereDetail(25);
    for(var x = -3; x <= 3; x += 1){
        for(var y = -3; y <= 3; y += 1){
            for(var z = -3; z <= 3; z += 1){
                this.pushMatrix();
                    this.translate(x * 85, y * 85, z * 85 + sin(frameCount * 3 + (x + y + z) * 100) * 10 * !(x === 0 && y === 0 && z === 0));
                    this.fill(
                        map(x, -3, 3, 40 /*+ sin(frameCount) * 40*/, 255),
                        map(y, -3, 3, 40 /*+ sin(frameCount + 120) * 40*/, 255),
                        map(z, -3, 3, 40 /*+ sin(frameCount + 240) * 40*/, 255)
                    );
                    if((x + y + z + 10) % 2 === 1){
                        this.sphereAt(0, 0, 0, 17);
                    }else{
                        this.boxAt(0, 0, 0, 25, 25, 25, frameCount * mag(x, y, z) * 0.02);
                    }
                this.popMatrix();
            }
        }
    }
    
    // a noisy ocean of rainbow-colored cubes,
    this.colorMode(HSB);
    for(var x = -750; x <= 750; x += 150){
        for(var y = -750; y <= 750; y += 150){
            var n = noise((x + frameCount * 5) * 0.0007, (y + frameCount * 5) * 0.0007) - 0.5;
            this.fill((127 + n * 255 * 3 + frameCount * 0.3) % 255, 230, 230, 200);
            this.boxAt(x, y, -800 + n * 1500, 150, 150, 400);
        }
    }
    
    // a ring of orbiting star things,
    this.sphereDetail(5);
    for(var a = 0; a < 720; a += 10){
        this.fill((a * 360 * 3 / 36) % 255, 255, 255);
        this.pushMatrix();
            this.rotate(a);
            this.sphereAt(0, 2500, 100 + sin(a * 35.03) * 300, 50);
        this.popMatrix();
    }
    
    this.colorMode(RGB);
    
    // and Oh Noes. Just because.
    this.pushMatrix();
        this.translate(0, 0, 2200);
        this.fill(255, 255, 255, 180);
        this.rectMode(CENTER);
        this.rect(0, 0, 1600, 1600);
        this.translate(0, 0, -30);
        this.fill(255);
        this.image(getImage("creatures/OhNoes"), -600, -600, 1200, 1200);
    this.popMatrix();
    
    // And Winston, who doesn't want to miss out on being in this awesome 3D world.
    this.pushMatrix();
        this.rotate(radians(-45));
        this.translate(0, 3450, 100);
        this.rotateX(sin(frameCount * 1) * 20);
        this.rotateY(radians(frameCount * 2.5));
        this.image(getImage("creatures/Winston"), -450, -450, 900, 900);
    this.popMatrix();
    
    // And Hopper, mischievously hiding as usual.
    this.pushMatrix();
        this.rotateX(radians(-90));
        this.rotateY(radians(90-this.camera.rotateZ));
        this.translate(0, sin(frameCount * 70) * 1, /*-10*/0);
        this.scale(0.05);
        this.image(getImage("creatures/Hopper-Cool"), -60, -60);
        this.fill(255, 220, 82);
        this.textAlign(CENTER);
        this.textSize(1);
        this.text("Cool!", 0, -3, 5, 5);
    this.popMatrix();
};
