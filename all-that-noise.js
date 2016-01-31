var noiseScale = 100;
var tilt = 1.5;

colorMode(HSB);
noiseDetail(3, 6.5);
noStroke();
rectMode(CENTER);
frameRate(0);

background(255);

draw = function(){
    for(var i = 0; i < 3000; i++){
        var x = random(width), y = random(height);
        var n = noise(x/noiseScale, y/noiseScale, (x + y)/noiseScale*tilt + frameCount * 0.003);
        var hue = n +
                  x * pow(cos(frameCount * 0.1 + 45), 2) +
                  y * pow(sin(frameCount * 0.1 + 45), 2) +
                  frameCount * 0.003;
        fill((hue + 255 * 100) % 255, 255, 255, n);
        ellipse(x - 0.5, y, 2, 2 + n*0.04);
    }
};
