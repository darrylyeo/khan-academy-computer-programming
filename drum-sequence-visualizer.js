/**
 * Drum Sequence Visualizer
 * by DY
 * 
 * A simple engine that plays various sounds in rhythm to an animation.
 * All sounds used are from Khan Academy's premade list of sounds.
 * 
 * Playback may vary in speed due to the environment's
 * imprecision when it comes to playing sounds.
 * 
 * Drum sequence composed by DY.
 */

/* The following variable changes how the overall player pulsates.
 * 0: Just pulses the beat.
 * 1: Puts emphasis on drums that play at the same time.
 * 2: Puts emphasis on drums that repeat.
 */
var DY_MUSIC_PLAYER_PULSE_MODE = 1;










frameRate(17);

var drums = {
    "bass" : {
        sound: getSound("retro/hit1"),
        volume: 1,
    },
    "snare1" : {
        sound: getSound("rpg/hit-whack"),
        volume: 1,
    },
    "snare2" : {
        sound: getSound("retro/hit2"),
        volume: 1,
    },
    "hat" : {
        sound: getSound("rpg/metal-clink"),
        volume: 1,
    },
    "crash1" : {
        sound: getSound("retro/thruster-short"),
        volume: 1,
    },
    "crash2" : {
        sound: getSound("retro/boom2"),
        volume: 1,
    },
    "vocal1" : {
        sound: getSound("rpg/giant-yah"),
        volume: 1,
    },
    "vocal2" : {
        sound: getSound("rpg/giant-no"),
        volume: 1,
    },
    "aux1" : {
        sound: getSound("retro/laser3"),
        volume: 1,
    },
    "aux2" : {
        sound: getSound("retro/jump2"),
        volume: 1,
    },
    "aux3" : {
        sound: getSound("retro/laser2"),
        volume: 1,
    },
    "aux4" : {
        sound: getSound("retro/whistle2"),
        volume: 1,
    },
};

var loops = [
    //0
    {
        "bass"      : "_              _",
        "hat"       : "  _   _   _   _ ",
        "crash1"    : "_               ",
        "aux3"      : "_               ",
    },
    //1
    {
        "bass"      : "_ _            _",
        "hat"       : "  _   _   _   _ ",
    },
    //2
    {
        "bass"      : "_ _            _",
        "hat"       : "  _   _   _   _ ",
        "aux4"      : "            _   ",
    },
    //3
    {
        "bass"      : "_ _            _",
        "snare2"    : "    _       _   ",
        "hat"       : "  _   _   _   _ ",
    },
    //4
    {
        "bass"      : "_   _   _   ____",
        "snare1"    : "            ____",
        "snare2"    : "_   _   _   ____",
        "hat"       : "_   _   _   _   ",
        "crash1"    : "_   _   _   _   ",
        "aux3"      : "_   _   _   _   ",
    },
    //5
    {
        "bass"      : "_   _   __ __  _",
        "snare1"    : "    _       _   ",
        "hat"       : "  _   _   _   _ ",
        "crash1"    : "_               ",
    },
    //6
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _  _",
        "hat"       : "  _   _   _   _ ",
    },
    //7
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _   ",
        "hat"       : "  _   _   _   _ ",
    },
    //8
    {
        "bass"      : "_   _   _   ____",
        "snare1"    : "    _       ____",
        "snare2"    : "            ____",
        "hat"       : "  _   _   _   _ ",
    },
    //9
    {
        "bass"      : "_   _   __ __  _",
        "snare1"    : "    _       _   ",
        "hat"       : "  _   _   _   _ ",
        "crash1"    : "_               ",
        "aux1"      : "    _  _ __ _ _ ",
    },
    //10
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _  _",
        "hat"       : "  _   _   _   _ ",
        "crash2"    : "            _   ",
        "aux1"      : "    _  _ __     ",
    },
    //11
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _   ",
        "hat"       : "  _   _   _   _ ",
        "aux1"      : "    _  _ __ _ _ ",
    },
    //12
    {
        "bass"      : "_   _   _   ____",
        "snare1"    : "    _       ____",
        "snare2"    : "            ____",
        "hat"       : "  _   _   _   _ ",
        "aux1"      : "    _  _ _      ",
        "crash2"    : "            _   ",
        "aux2"      : "          _ _ _ ",
    },
    //13
    {
        "bass"      : "_   _   __ __  _",
        "snare1"    : "    _       _   ",
        "hat"       : "  __  _   _   _ ",
        "crash1"    : "_               ",
        "vocal1"    : " _              ",
        "vocal2"    : "    _  _ __ _ _ ",
    },
    //14
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _  _",
        "hat"       : "  __  _   _   _ ",
        "vocal1"    : "  _         _   ",
        "vocal2"    : "    _  _ __     ",
    },
    //15
    {
        "bass"      : "_   _   __ __   ",
        "snare1"    : "    _       _   ",
        "hat"       : " __  __  __   _ ",
        "vocal1"    : " _              ",
        "vocal2"    : "    _  _ __ _ _ ",
    },
    //16
    {
        "bass"      : "_   _   _   ____",
        "snare1"    : "_   _   _   _   ",
        "snare2"    : "            _ __",
        "hat"       : "_   _   _   ____",
        "crash1"    : "_   _   _   _   ",
        "aux3"      : "_   _   _   ____",
        "aux4"      : "            _   ",
    },
    //17
    {
        "bass"      : "_   _   _   ____",
        "snare1"    : "_   _   _   ____",
        "snare2"    : "            ____",
        "hat"       : "_   _   _   ____",
        "crash1"    : "_   _   _   _   ",
        "aux3"      : "_   _   _   ____",
        "aux4"      : "            _   ",
    },
];

var DYSong = function(ticksPerMeasure, ticksPerPulse, data){
    this.ticksPerMeasure = ticksPerMeasure;
    this.ticksPerPulse = ticksPerPulse;
    this.data = data;
};

var DYMusicPlayer = function(song, sounds, x, y){
    this.song = song;
    this.sounds = sounds;
    this.numberOfSounds = Object.keys(this.sounds).length;
    
    this.soundCircles = {};
    for(var s in this.sounds){
        this.soundCircles[s] = 0;
    }
    
    this.playing = false;
    this.progress = 0;
    this.currentMeasure = 0;
    this.currentTick = 0;
    
    this.x = x;
    this.y = y;
    this.scaleOffset = 0;
};

DYMusicPlayer.prototype.togglePlay = function(){
    this.playing = !this.playing;
};

DYMusicPlayer.prototype.nextTick = function(){
    if(!this.playing){ return; }
    
    var measure = loops[this.song.data[this.currentMeasure]];
    var soundsToPlay = [];
    for(var t in measure){
        var track = measure[t];
        var tick = track[this.currentTick];
        if(tick && tick !== " "){
            soundsToPlay.push(t);
        }
    }
    this.playSounds(soundsToPlay);
    
    //Update Player
    this.currentTick++;
    if(this.currentTick >= this.song.ticksPerMeasure){
        this.currentTick = 0;
        this.currentMeasure++;
        if(this.currentMeasure >= this.song.data.length){
            this.currentMeasure = 0;
        }
    }
    this.progress = (this.currentMeasure + this.currentTick / this.song.ticksPerMeasure) / this.song.data.length;
    
    switch(DY_MUSIC_PLAYER_PULSE_MODE){
        case 0:
            if(this.currentTick % this.song.ticksPerPulse === 0){
                this.scaleOffset = 0.1;
            }
            break;
        case 1:
            this.scaleOffset = max(this.scaleOffset, pow(1.05, soundsToPlay.length) - 1);
            break;
        case 2:
            this.scaleOffset += soundsToPlay.length * 0.03;
            break;
    }
};

DYMusicPlayer.prototype.playSounds = function(sounds){
    for(var s = 0; s < sounds.length; s++){
        var sound = sounds[s];
        var drum = this.sounds[sound];
        for(var v = 0; v < drum.volume; v++){
            playSound(drum.sound);
        }
        
        this.soundCircles[sound] = 1;
    }
};

DYMusicPlayer.prototype.update = function(){
    this.scaleOffset *= 0.9;
    
    for(var s in this.sounds){
        this.soundCircles[s] *= 0.9;
    }
};

DYMusicPlayer.prototype.draw = function(){
    pushMatrix();
    
    translate(this.x, this.y);
    scale(1 + this.scaleOffset);
    
    noFill();
    strokeWeight(8);
    stroke(100, 100, 100, 80);
    ellipse(0, 0, 200, 200);
    stroke(255);
    strokeCap(SQUARE);
    arc(0, 0, 200, 200, -90, this.progress * 360 - 90);
    
    fill(255);
    noStroke();
    if(this.playing){
        rect(-35, -50, 25, 100);
        rect(10, -50, 25, 100);
    }else{
        triangle(-40, -50, -40, 50, 60, 0);
    }
    
    var a = 0;
    for(var s in this.sounds){
        var soundVisualizerNumber = this.soundCircles[s];
        stroke(lerpColor(color(17, 178, 237), color(0, 145, 212), soundVisualizerNumber));
        strokeWeight(20 + soundVisualizerNumber * 20);
        point(0, 130);
        
        rotate(360 / this.numberOfSounds);
    }
    
    popMatrix();
};







var theSong = new DYSong(16, 4, [
    0, 1, 1, 2,
    3, 3, 3, 4,
    5, 6, 7, 8,
    5, 6, 7, 4,
    9, 10, 11, 12,
    9, 10, 12, 4,
    13, 14, 15, 16,
    13, 14, 15, 17
]);

var player = new DYMusicPlayer(theSong, drums, 200, 200);

mouseClicked = function(){
    player.togglePlay();
};

keyPressed = function(){
    switch(keyCode){
        case LEFT:
            player.currentMeasure--;
            break;
        case RIGHT:
            player.currentMeasure++;
            break;
    }
};

draw = function() {
    background(0, 187, 255);
    
    player.draw();
    player.update();
    if(frameCount % 2 === 0){
        player.nextTick();
    }
};
