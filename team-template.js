//*Psst!* Don't actually request to join. It's just a template. :)

//REMINDER: If you are making a team that is NOT a DIRECT spin-off, POST THE LINK to your club program in the Tips and Thanks of this program.

//Do NOT change or remove any part this program that attributes the template maker to DY, or you will be flagged for plagiarism.

/**
 * I've noticed lots of "team" pages lately. Most likely this was the result of Noble
 * Mushtak's work. I am the one who made this template, which many people have used.
 * It was originally made for KATS, founded by Neurosurgeon (whose account was deleted).
 * Then, Noble Mushtak took what I made and documented it from top to bottom (which, I
 * must say, was pretty well done considering how little I did). Noble Mushtak, knowing
 * how the code worked, took it further and edited it in his team, Guardians of Khan
 * Academy. From there, he made a Team Template, and many people started to use it.
 * 
 * The thing is, I didn't know this was happening for a long time. A lot of team pages
 * don't recognize me properly for creating the complex code in the first place – either
 * mistakenly replacing the copyright with their own name or simply misunderstanding
 * that Noble Mushtak had created it all.
 * 
 * So, to clear up any misconceptions, I was the one who started it. To prove it, I made
 * my own team template. Here it is. Use it. Just make sure that I'm given credit for it
 * and that it's a SPIN-OFF of this program. If you wish to not make this a spin-off, at
 * least tell me where it is (i.e. give me the link so that I don't get any surprises.
 * 
 * Thank you for your cooperation. That aside, I have made this template very flexible
 * and fully customizable to suit the needs of your super-awesome Khan Academy team page!
 * Get started by changing all of the variables in MACRO (all-caps)!
 * 
 * KATS:
 * www.khanacademy.org/cs/neurosurgeon-kats/6473507059793920
 * 
 * The Button Programming of KATS:
 * www.khanacademy.org/cs/the-button-programming-of-kats/1838004211
 * 
 * Guardians of Khan Academy:
 * www.khanacademy.org/cs/guardians-of-khan-academy/1861864371
*/






// TEAM TEMPLATE USERS: You may delete this line and everything above it.
/**DO NOT TAMPER WITH THE FOLLOWING COMMENT, or you will be flagged for plagiarism.*/

/**        Created using DY's Team Template Copyright © 2014-2015 DY           **\
*                                                                                *
*       -------- INTERESTED IN MAKING YOUR OWN TEAM? Please visit --------       *
*           www.khanacademy.org/cs/team-template-by-dy/5364220028256256          *
\**                         for complete instructions!                         **/

/**ANNOUNCEMENTS:
 * [Post messages to your team here]
*/









var Member = function(name, rank, avatar){
    this.name = name;
    this.rank = rank;
    this.avatar = avatar ? avatar : getImage("cute/Blank");
};

var Update = function(date, message){
    this.date = date;
    this.message = message;
};









/** Change everything starting from here until where it says STOP. You may have to restart the program for some changes to take effect. */

//Or whatever you'd like your position to be
var TEAM_FOUNDER = "[Your Name Here]";

//Comment out updates that won't fit. I might add a page functionality for this later. The date parameter can also serve as a title.
var UPDATES = [
    new Update("4/15/14", "Check out Transcolors! It's the best game ever! (Click \"Transcolors\".)"),
    new Update("3/24/14", "Please make sure you check in periodically so I know you're still here!"),
    new Update("2/8/14", "I just want to thank everyone in the team for being awesome! Keep it up, guys!"),
    new Update("1/1/14", "Happy New Year, everyone!")
];

//For spacing, put member() without any parameters where you want the space. Pages are made automatically if you run out of space. Be sure to change up the avatars!
var MEMBERS = [
    new Member(TEAM_FOUNDER, "Founder", getImage("avatars/questionmark")),
    new Member("Leafer", "Co-founder", getImage("avatars/leafers-ultimate")),
    new Member("Piceratops", "Co-founder", getImage("avatars/piceratops-ultimate")),
    new Member("Hopper", "President", getImage("creatures/Hopper-Cool")),
    new Member("Winston", "Vice President", getImage("creatures/Winston")),
    new Member("Hal", "Director", getImage("avatars/robot_male_3")),
    new Member("Grace", "Assistant Director", getImage("avatars/robot_female_3")),
    new Member("Error Buddy", "Chairman of Board", getImage("creatures/OhNoes")),
    new Member("Old Spice Man", "Board Member", getImage("avatars/old-spice-man")),
    new Member("Mr. Pants", "Board Member", getImage("avatars/mr-pants")),
    new Member("Donald", "Board Member", getImage("avatars/robot_male_2")),
    new Member("Ada", "Board Member", getImage("avatars/robot_female_2")),
    new Member("OJ Squid", "Elite Member", getImage("avatars/orange-juice-squid")),
    new Member("Purple Pi", "Elite Member", getImage("avatars/purple-pi")),
    new Member(),
    new Member("Marcimus", "General Member", getImage("avatars/marcimus")),
    new Member("Mr. Pink", "General Member", getImage("avatars/mr-pink")),
    new Member("Spunky Sam", "General Member", getImage("avatars/spunky-sam")),
    new Member("Johnny", "General Member", getImage("avatars/robot_male_1")),
    new Member("Amelia", "General Member", getImage("avatars/robot_female_1")),
    new Member("Green", "General Member", getImage("avatars/leaf-green")),
    new Member("Red", "General Member", getImage("avatars/leaf-red")),
    new Member("Blue", "General Member", getImage("avatars/leaf-blue")),
    new Member("Yellow", "General Member", getImage("avatars/leaf-yellow")),
    new Member("Aqualine!", "Surprise Member", getImage("avatars/aqualine-ultimate")),
    new Member("Starky!", "Surprise Member", getImage("avatars/starky-ultimate")),
    new Member("Primosaur!", "Surprise Member", getImage("avatars/primosaur-ultimate")),
    new Member("Duskpin!", "Surprise Member", getImage("avatars/duskpin-ultimate"))
];

//Max 12, or things can get claustrophobic.
var MEMBERS_PER_PAGE = 12;
//Decrease this if your member names are running off the right of the page. Neat, huh?
var MEMBER_PAGE_AVATAR_X = 200;

//Try to use a font supported by many operating systems.
var FONT = "monospace";

//Choose colors that go nicely together. Too many "extreme" colors at once are unpleasant.
var BACKGROUND_COLOR = color(247, 164, 19);
var HORIZONTAL_LINE_COLOR = color(219, 210, 44);
var VERTICAL_LINE_COLOR = color(222, 84, 42);

//Your team name!
var TOP_TEXT = "TEAM";
var TOP_TEXT_SIZE = 25;
var TOP_TEXT_FILL = color(0, 0, 0, 150);
var BOTTOM_TEXT = "TEMPLATE";
var BOTTOM_TEXT_SIZE = 50;
var BOTTOM_TEXT_FILL = color(0, 0, 0, 150);

//Draw any logos or images here!
var TEAM_TITLE = function(){
    textAlign(CENTER, CENTER);
    fill(TOP_TEXT_FILL);
    textSize(TOP_TEXT_SIZE);
    text(TOP_TEXT, 200, 25);
    fill(BOTTOM_TEXT_FILL);
    textSize(BOTTOM_TEXT_SIZE);
    text(BOTTOM_TEXT, 200, 55);
};

//Max 5 buttons. Be sure to change the titles in page() to match these.
var HOME_BUTTONS = [
    "About",
    "Members",
    "Updates",
    "Join Us",
    "Something"
];

//More colors!
var TEXT_BOX_FILL = color(245, 187, 39);
var TEXT_BOX_TEXT_FILL = color(0, 0, 0);
var TEXT_BOX_RADIUS = 10;

var DEFAULT_BUTTON_FILL = color(245, 187, 39);
var DEFAULT_OVER_BUTTON_FILL = color(255, 140, 0);
var DEFAULT_BUTTON_STROKE = color(107, 89, 0);
var DEFAULT_OVER_BUTTON_STROKE = color(107, 89, 0);
var DEFAULT_BUTTON_STROKE_WEIGHT = 2;
var DEFAULT_BUTTON_TEXT_FILL = color(0, 0, 0);
var DEFAULT_OVER_BUTTON_TEXT_FILL = color(255, 255, 255);
var DEFAULT_BUTTON_RADIUS = 10;

/** STOP.
 * Now, go to the page() function and edit all of the text in any way you like! Have fun!
 * Hint: Ctrl+F, "var page = function..."
*/






textFont(loadFont(FONT, 0));

var textBox = function(txt, txtSize, HAlign, YAlign, x, y, w, h, margin){
    txtSize = txtSize ? txtSize : 14;
    HAlign = HAlign ? HAlign : LEFT;
    YAlign = YAlign ? YAlign : BASELINE;
    x = x ? x : 25;
    y = y ? y : 80;
    w = w ? w : 350;
    h = h ? h : 260;
    margin = margin ? margin : 10;
    
    fill(TEXT_BOX_FILL);
    noStroke();
    rect(x, y, w, h, TEXT_BOX_RADIUS);
    fill(TEXT_BOX_TEXT_FILL);
    textSize(txtSize);
    textAlign(HAlign, YAlign);
    text(txt, x + margin, y + margin, w - margin * 2, h - margin * 2);
};

var titleBox = function(txt, txtSize, x, y, w, h){
    txtSize = txtSize ? txtSize : 25;
    x = x ? x : 25;
    y = y ? y : 25;
    w = w ? w : 350;
    h = h ? h : 35;
    
    fill(TEXT_BOX_FILL);
    noStroke();
    rect(x, y, w, h, TEXT_BOX_RADIUS);
    fill(TEXT_BOX_TEXT_FILL);
    textSize(txtSize);
    textAlign(CENTER, CENTER);
    text(txt, x + w / 2, y + h / 2);
};

var mouseOverRect = function(rectX, rectY, rectW, rectH){
    var scaledMouseX = mouseX * 400/width;
    var scaledMouseY = mouseY * 400/width;
    return scaledMouseX > rectX & scaledMouseY > rectY &
    scaledMouseX < rectX + rectW & scaledMouseY < rectY + rectH;
};

var buttons;

var clearButtons = function(){
    buttons = [];
};

clearButtons();

//x, y, width, height, text, textSize, fill, s///troke, textFill, radius, strokeWidth,
//mouseOverFill, mouseOverTextFill, mouseOverStroke
var button = function(x, y, w, h, t, tS, f, s, tF, r, sW, mOF, mOTF, mOS){
    //Set optional parameters if unspecified
    f = f ? f : DEFAULT_BUTTON_FILL;
    s = s ? s : DEFAULT_BUTTON_STROKE;
    sW = sW ? sW : DEFAULT_BUTTON_STROKE_WEIGHT;
    r = r ? r : DEFAULT_BUTTON_RADIUS;
    mOF = mOF ? mOF : DEFAULT_OVER_BUTTON_FILL;
    mOS = mOS ? mOS : DEFAULT_OVER_BUTTON_STROKE;
    
    var mouseIsOverButton = mouseOverRect(x, y, w, h);
    
    //Rect
    fill(mouseIsOverButton ? mOF : f);
    stroke(mouseIsOverButton ? mOS : s);
    strokeWeight(sW);
    rect(x, y, w, h, r);
    
    //Set optional parameters if unspecified
    tF = tF ? tF : DEFAULT_BUTTON_TEXT_FILL;
    mOTF = mOTF ? mOTF : DEFAULT_OVER_BUTTON_TEXT_FILL;
    
    //Text
    fill(mouseIsOverButton ? mOTF : tF);
    stroke(mouseIsOverButton ? mOTF : tF);
    textAlign(CENTER, CENTER);
    textSize(tS);
    text(t, x + w / 2, y + h / 2);
    
    //Submit a button only if not already
    var b = {x: x, y: y, w: w, h: h, t: t};
    var buttonAlreadyPushed = false;
    for(var i = 0; i < buttons.length; i++){
        if(b.x === buttons[i].x && b.y === buttons[i].y &&
        b.w === buttons[i].w && b.h === buttons[i].h &&
        b.t === buttons[i].t){
            buttonAlreadyPushed = true;
            break;
        }
    }
    if(!buttonAlreadyPushed){buttons.push(b);}
};

var mouseOverButton;

var checkIfMouseOverButton = function(){
    mouseOverButton = undefined;
    for(var f = 0; f < buttons.length; f++){
        if(mouseOverRect(buttons[f].x, buttons[f].y, buttons[f].w, buttons[f].h)){
            mouseOverButton = buttons[f].t;
            break;
        }
    }
};

var currentPage = "Home";
var previousPage;

var previousPages = [];

var previousPage = function(){
    return previousPages[previousPages.length - 1];
};

var maxPages = 1;
var pageScroll = 1;

var pageScrolls = function(numberOfPages){
    maxPages = max(0, numberOfPages);
};

var switchPage = function(pageToSwitch){
    if(pageToSwitch === "Back"){
        if(pageScroll > 1){
            pageScroll--;
        }else{
            currentPage = previousPages.pop();
        }
    }else if(pageToSwitch === "More"){
        pageScroll++;
    }else{
        if(pageToSwitch === "Home"){
            previousPages = [];
        }else{
            previousPages.push(currentPage);
        }
        currentPage = pageToSwitch;
    }
    clearButtons();
};

var homePage = function(){
    //Background and Rectangle
    noStroke();
    fill(VERTICAL_LINE_COLOR);
    rect(125, -1, 150, 401);
    
    TEAM_TITLE();
    
    for(var i = 0; i < HOME_BUTTONS.length; i++){
        fill(HORIZONTAL_LINE_COLOR);
        noStroke();
        //Background Rectangle
        rect(-1, i * 52 + 95, 401, 35);
        //Button
        button(90, i * 52 + 90, 220, 45, HOME_BUTTONS[i], 28);
    }
    
    //Signature and Copyright
    noStroke();
    fill(HORIZONTAL_LINE_COLOR);
    rect(-1, 360, 401, 20);
    fill(TEXT_BOX_TEXT_FILL);
    textSize(15);
    textAlign(CENTER, CENTER);
    text("Founded by " + TEAM_FOUNDER, 200, 370);
    
    /**I, DY respectfully request you do not change or remove this.
     * I repeat: DO NOT TAMPER WITH THE FOLLOWING LINE. I won't appreciate it. */
    button(130, 382.5, 267, 14, "Made with DY's Team Template Copyright © 2014-" + year(), 9, undefined, color(0, 0, 0, 1), undefined, undefined, undefined, undefined, undefined, color(0, 0, 0, 1));
};

var membersPage = function(members){
    pageScrolls(ceil(MEMBERS.length / MEMBERS_PER_PAGE));
    
    pushMatrix();
    
    titleBox("Members");
    
    textBox();
    
    for(var m = 0; m < MEMBERS_PER_PAGE; m++){
        var memberNumber = (pageScroll - 1) * MEMBERS_PER_PAGE + m;
        var member;
        if(members[memberNumber]){
            member = members[memberNumber];
            
            pushMatrix();//12 20 260
            translate(MEMBER_PAGE_AVATAR_X, (m - MEMBERS_PER_PAGE / 2) * 20 + 220);
            
            textSize(13);
            textAlign(RIGHT, CENTER);
            text(member.rank, -15, 0);
            imageMode(CENTER);
            image(member.avatar, 0, 0, member.avatar.width / 8, member.avatar.height / 8);
            textAlign(LEFT, CENTER);
            text(member.name, 15, 0);
            
            popMatrix();
        }
    }
    
    popMatrix();
};

var updatesPage = function(updates){
    var t = "";
    for(var u in updates){
        t += updates[u].date;
        t += "\n";
        t += updates[u].message;
        t += "\n\n";
    }
    textBox(t);
    
    /*
    fill(BACKGROUND_COLOR);
    rect(25, 0, 350, 80);
    rect(25, 340, 350, 60);
    */
    
    titleBox("Updates");
};







/**SOME NOTES:
 * You will need to change the case statements according to your page titles.
 * A page's title is the name of the button that was clicked on to get there.
 * Most of the button titles, especially the ones on the home page, are set in the
 * arrays at the top of the program.
 * Be sure to add a case statement here if you add a new button or you'll get a
 * "404 error." If you would like a button to do something other than go to a page,
 * see mouseClicked().
 * Otherwise, have fun writing your content! Mind that text wraps automatically.
 * Oh, and PLEASE don't tamper with DY's credit. It's plagiarism and it's just cruel. */

var page = function(pageID){
    switch(pageID){
        case "Home":
            homePage();
            break;
        case "About":
            titleBox("About Us");
            textBox("We are The Awesome Team! Our mission is to have fun, think of great ideas, make games, and be awesome. We currently have 23 members, but we are constantly looking out for new recruits! If you are a fun, friendly, and totally awesome person, join the fun and apply for The Awesome Team today! See you there!\n\n*Please read over our list of requirements before considering an application – just click Join Us!\n\n*Check out Transcolors, an awesome game we made!", 14);
            button(10, 351, 160, 35, "Transcolors", 22);
            button(180, 351, 120, 35, "Join Us", 22);
            break;
        case "Members":
            membersPage(MEMBERS);
            break;
        case "Updates":
            updatesPage(UPDATES);
            button(140, 351, 160, 35, "Transcolors", 22);
            break;
        case "Join Us":
            titleBox("Join Us");
            textBox("Requirements for joining:\n\n1. You must be awesome.\n\n2. You must have been a KA member for more than 1 minute.\n\n3. You must vote up and post in the Tips and Feedback what position you would like and why. This is also where I can contact you.\n\n4. You must have eaten an entire pepperoni pizza with extra cheese and hot sauce. No exceptions.", 13);
            break;
        case "Something":
            titleBox("Something", 21);
            textBox("Use this space for anything you like!", 11.67);
            break;
        default:
            textBox("404\n\nDouble-check the button that led you here and make sure its title is included in the page() function.");
    }
};

/** You're all done!
 * Thanks for using DY's Team Template. It's really cool to have made something that many people find useful!
 * 
 * REMINDER: Be sure to post the link to your team page in the Tips and Thanks of DY's Team Template (www.khanacademy.org/cs/team-template-by-dy/5364220028256256).
 * 
 * If you know anyone who would like to make a team page on Khan Academy, or you find someone still using Noble Mushtak's old Team Template (which I greatly influenced), go ahead and tell them about this!
 */







/** Need animation? Just change this to the draw() function!*/
mouseMoved = function() {
    pushMatrix();
    scale(min(width, height)/400);
    
    background(BACKGROUND_COLOR);
    
    checkIfMouseOverButton();
    
    maxPages = 1;
    
    //Bottom Line
    noStroke();
    fill(HORIZONTAL_LINE_COLOR);
    rect(-1, 360, 401, 20);
    
    //This is the fifth page if not customized. If you like, replace this if else statement with:
    //page(currentPage);
    if(TEAM_FOUNDER === "[Your Name Here]"){ HOME_BUTTONS[4] = "Use Template"; }
    if(currentPage === "Use Template"){
        titleBox("Like This Template?", 21);
        textBox("Make this your very own official team page! This template makes it easy for you to quickly customize your team page in order to suit its needs. Customize colors, keep track of team members, and type out your messages easily without the use of unnecessary line breaks!\n\nGet started now! Make a spin-off, change all of the variables, and start recruiting team members! What awesome team ideas can you come up with?\n\nNOTE: If you do not wish to have your team page as a spin-off, kindly send me the link to your page so I can keep track of who's using my template. Thank you for your cooperation.", 11.67);
    }else{
        page(currentPage);
    }
    
    //More Button if there are more pages
    if(maxPages > 1 && pageScroll < maxPages){
        button(330, 10, 60, 30, "More", 15);
    }
    
    //Home Button and Back Button if you aren't Home
    if(currentPage !== "Home"){
        button(310, 351, 80, 35, "Home", 22);
        button(10, 10, 60, 30, "Back", 15);
    }
    
    cursor(mouseOverButton ? HAND : ARROW);
    
    popMatrix();
};

mouseMoved();







/** Under the switch statement, make a case statement for each button you would like to do something. This can be something like using println to provide a link to a page.

Oh, and PLEASE don't tamper with DY's credit. It's plagiarism and it's just cruel. */

mouseClicked = function(){
    if(mouseOverButton){
        switch(mouseOverButton){
            case "Transcolors":
                println("www.khanacademy.org/cs/transcolors-version-241-by-dy/2722008038");
                break;
            case "Made with DY's Team Template Copyright © 2014-" + year():
                /**I, DY respectfully request you do not change or remove this.
                 * I repeat: DO NOT TAMPER WITH THE FOLLOWING LINE. It's not nice. */
                println("Like this template by DY? Make your own team page!\nwww.khanacademy.org/cs/team-template-by-dy/5364220028256256");
                break;
            default:
                switchPage(mouseOverButton);
        }
    }
    mouseMoved();
};

// Created using DY's Team Template Copyright © 2014-2015 DY

// INTERESTED IN MAKING YOUR OWN TEAM? Please visit
// www.khanacademy.org/cs/team-template-by-dy/5364220028256256
// for complete instructions!
