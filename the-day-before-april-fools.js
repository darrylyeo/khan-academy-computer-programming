/**             DY's ORIGINAL PROGRAM IS HERE:            **\
     khanacademy.org/cs/april-fools/6060489663578112
\**                                                       **/

//Happy April Fool's!

//Transcolors:
//www.khanacademy.org/cs/transcolors-version-222-by-dy/2722008038

var scene = 0;

var DY = function(x, y, sz){
    translate(x, y);scale(sz, sz);noStroke();fill(255);rect(0, 0, 400, 400, 30);fill(0, 174, 255, 50);rect(0, 0, 400, 400);fill(212, 89, 208);triangle(249, 200, 200, 125, 200, 275);strokeWeight(6);fill(84, 194, 109);stroke(158, 38, 38);bezier(50, 50, 275, 60, 275, 340, 50, 350);line(50, 51, 50, 349);strokeWeight(5);stroke(81, 81, 173);line(150, 50, 248, 197);line(350, 50, 250, 200);line(150, 350, 250, 200);noStroke();fill(255, 208, 66, 150);triangle(170, 50, 330, 50, 250, 170);fill(255, 188, 117, 150);triangle(350, 70, 170, 350, 350, 350);scale(1/sz, 1/sz);translate(-x, -y);
};

draw = function() {
    resetMatrix();
    
    background(255, 227, 255);
    
    if(scene === 0){
        textFont(createFont("Avenir Bold"));
        
        fill(0, 123, 255);
        textAlign(CENTER, CENTER);
        textSize(40);
        text("The Day Before\nApril Fool's", 200, 75);
        
        textFont(createFont("Avenir"));
        
        fill(94, 172, 255);
        textSize(30);
        textAlign(RIGHT, CENTER);
        text("by", 190, 165);
        
        DY(205, 140, 1/8);
        
        fill(150);
        textSize(20);
        textAlign(CENTER, CENTER);
        text("Click!", 200, 230);
    }else{
        DY(350, 350, 1/10);
    }
    
    resetMatrix();
    scale(-1, 1);
    
    imageMode(CENTER);
    image(getImage("creatures/OhNoes"), -300, 300);
    image(scene === 6 ? getImage("creatures/Hopper-Jumping") :
          scene === 8 ? getImage("creatures/Hopper-Cool") :
          getImage("creatures/Hopper-Happy"), -100, 300);
    
    var Hopper;
    var EB;
    
    switch(scene){
        case 1:
            Hopper = "Hey, EB! What's up?";
            EB = "Hey there, Hopper! I'm just planning my April Fool's Joke on Winston.";
            break;
        case 2:
            EB = "You see, I was playing Transcolors the entire morning, and then I looked at my phone and realized it's March 31 today!";
            break;
        case 3:
            EB = "I've been planning this one for weeks! I'm going to turn all of Winston's ellipses into RECTS! What do you think of that, Hopper?";
            break;
        case 4:
            Hopper = "Heh, what did you say today was?";
            EB = "Uh, March 31. Why?";
            break;
        case 5:
            EB = "Wait a sec... you didn't change the date on my...";
            break;
        case 6:
            Hopper = "APRIL FOOL'S!";
            EB = "OH, NOES!";
            break;
        case 8:
            Hopper = "Hee hee hee!";
            EB = "Ugh!";
            break;
    }
    
    resetMatrix();
    
    
    noStroke();
    if(Hopper){
        fill(255, 170, 0);
        rect(20, 20, 170, 160, 10);
        triangle(110, 180, 80, 180, 95, 220);
    }
    if(EB){
        fill(0, 245, 106);
        rect(210, 20, 170, 160, 10);
        triangle(310, 180, 280, 180, 295, 220);
    }
    
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(scene === 2 ? 14 : scene === 3 ? 14 : (scene === 6 ? 30 : 17));
    text(Hopper, 30, 30, 150, 130);
    text(EB, 220, 30, 150, 130);
};

mouseClicked = function(){
    if((mouseX > 205 && mouseX< 255 && mouseY>140&&mouseY < 190 && scene === 0)||(mouseY>350&mouseY < 390 & mouseX > 350 & mouseX< 390 && scene !== 0)){
        println("CREATED BY DY");
        //println("SPIN-OFF BY [your name here]");
        println("Check out all of DY's AWESOME programs at");
        println("www.khanacademy.org/profile/darrylyeo/programs");
    }else{
        scene = min(scene + 1, 8);
    }
};
