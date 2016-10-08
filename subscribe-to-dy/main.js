// Uncomments
//var style = document.getElementsByTagName("style")[0];
//style.innerHTML = style.innerHTML.replace(/\/\*\*(.+?)\*\//gi, "$1");




new p5(function(P5){with(P5){P5.setup = function(){

var mergeObjects = function(obj1, obj2){
    for(var p in obj2){
        obj1[p] = obj2[p];
    }
    return obj1;
};

Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)];
};

var inRect = function(pos, x, y, w, h){
	return pos.x >= x && pos.x <= x + w && pos.y >= y && pos.y <= y + h;
};

var randomIncludingNegative = function(a, b){
	return random(a, b) * (random() < 0.5 ? -1 : 1);
};

var poly = function(vertices, radius){
	beginShape();
	for(var i = 0; i <= vertices; i++){
		vertex(radius * cos(i*360/vertices), radius * sin(i*360/vertices));
	}
	endShape();
};

var Particle = function(){
	mergeObjects(this, {
		pos: createVector(),
		angle: random(360),
		scale: random(0.4),
		hue: random(255),
		alpha: 0,
		speed: {
			pos: createVector(randomIncludingNegative(1, 3), randomIncludingNegative(1, 3)),
			angle: random(-2, 2),
			scale: random(0.04),
			hue: random(1),
			alpha: random(0.015),
		},
		acceleration: {
			pos: createVector(randomIncludingNegative(0.1, 0.25), randomIncludingNegative(0.1, 0.25)),
			angle: random(-0.2, 0.2),
			scale: random(0.002),
		},
		filled: random() < 0.5,
		texture: Particle.textures.random(),
		isDead: false
	});
	
	Particle.particles.push(this);
};
Particle.prototype.draw = function(){
	if(this.filled){
		fill(this.hue % 360, 20, 255, min(this.alpha, 180));
		noStroke();
	}else{
		stroke(this.hue % 360, 20, 255, min(this.alpha, 180));
		strokeJoin(ROUND);
		strokeWeight(1.2);
		noFill();
	}
	
	push();
	translate(this.pos.x, this.pos.y);
	scale(this.scale);
	rotate(this.angle);
	this.texture.call(this);
	pop();
}
Particle.prototype.update = function(){
	for(var p in this.speed){
		if(typeof this.speed[p] === "object"){
    	    this[p].add(this.speed[p]);
		}else{
    	    this[p] += this.speed[p];
		}
    }
	for(var p in this.acceleration){
		if(typeof this.acceleration[p] === "object"){
    	    this.speed[p].add(this.acceleration[p]);
		}else{
    	    this.speed[p] += this.acceleration[p];
		}
    }
	if(!inRect(this.pos, -width/2 - this.scale, -height/2 - this.scale, width + this.scale*2, height + this.scale*2)){
		this.isDead = true;
	}
}

Particle.textures = [
	function(){
		rectMode(CENTER);
		rect(0, 0, 10, 10, 3);
	},
	function(){
		ellipse(0, 0, 10, 10);
	},
	function(){
		poly(3, 10);
	},
	function(){
		poly(5, 10);
	},
	function(){
		poly(7, 10);
	}
];

Particle.particles = [];
Particle.particles.draw = function(){
	var logoWasDrawn = false;
	for(var i = 0; i < this.length; i++){
		this[i].draw();
		/*if(!logoWasDrawn && this[i].scale > 1.5){
			logoWasDrawn = true;
			coverDY();
		}*/
	}
	//if(!logoWasDrawn){
		coverDY();
	//}
};
Particle.particles.update = function(){
	for(var i = this.length - 1; i >= 0; i--){
		if(this[i].isDead){
			this.splice(i, 1);
			new Particle();
		}else{
			this[i].update();
		}
	}
	if(random() < 0.1 && this.length < 100){
		new Particle();
	}
	this.sort(function(a, b){
		return a.scale - b.scale;
	});
};

var DY = function(x, y, s, r){
    push();
		colorMode(RGB);
		translate(x, y);
		scale(s / 400);
		rotate(r);

		//Rect
		fill(255, 255, 255, 50);
		stroke(224, 255, 244);
		strokeWeight(20);noStroke();
		rectMode(CENTER);
		//rect(-0.5, -0.5, 400, 400, 50);
		//rect(-1000, -1000, 5400, 5400, 50);
		rectMode(CORNER);

		noFill();
		//D
		push();
			translate(-140, 0);
			scale(300 / 30);
			stroke(0, 174, 255);
			strokeWeight(1);
			line(0, -13, 0, 12.5);
			arc(0, 0, 26, 26, -88.5, 88);
		pop();

		//Y
		push();
			translate(10, 0);
			scale(280 / 30);
			stroke(255, 183, 74);
			strokeWeight(4);
			line(-2, -12.5, 16 / 2-2, 2);
			line(16-2, -12.5, 16 / 2-2, 2);
			line(16 / 2-2, 12.5, 16 / 2-2, 2);
		pop();
    pop();
};
var coverDY = function(){
	DY(0, sin(frameCount) * 2, VMIN*0.55 + sin(frameCount * 3) * 12, sin(frameCount * 8) * 2);
}





createCanvas(windowWidth, windowHeight, P2D);
//document.getElementById("cover").appendChild(document.getElementById("defaultCanvas0"));
document.body.insertBefore(document.getElementById("defaultCanvas0"), document.body.childNodes[0]);

var VMIN = min(width, height);
var VMAX = max(width, height);

P5.windowResized = function(){
	resizeCanvas(windowWidth, windowHeight);
	VMIN = min(width, height);
	VMAX = max(width, height);
};

angleMode(DEGREES);

var t = random(100, 500);

frameRate(10);
P5.draw = function(){
	//background((t / 4) % 360, 200, 255);
	
	resetMatrix()

	push();
		translate(width/2, height/2);
		
		colorMode(HSB);
		noStroke();
		var sz = mag(width, height);
		for(var i = -(frameCount/20 % 1/20); i <= 1; i += 1/20){
			//fill(lerpColor(color(103, 183, 225, 100), color(255, 100), i));
			fill(lerpColor(color("#67b7e1"), color(255, 100), i));
			var s = (1-i) * sz;
			ellipse(0, 0, s, s);
		}

		Particle.particles.update();
		Particle.particles.draw();

		colorMode(HSB);

		push();
			scale(VMAX/400);
			for(var i = 0; i < 180; i+=2.5){
				rotate(-199 * i + t / 100);
				fill((t / 100 * i /360) % 1 * 360, 255, 255, 6/255);
				noStroke();
				strokeWeight(4);
				triangle(1, 0, 400, 30, 400, -30);
				rotate(200 * i);
			}
		pop();
	pop();
	
	//filter(BLUR);
	
	/*loadPixels();
	var d = pixelDensity();
	var pixelCount = 4 * (width * d) * (height * d);
	for (var i = 0; i < pixelCount; i+=4) {
		pixels[i+3] *= 0.99;
		//pixels[i+3] -= 0.01;
	}
	updatePixels();*/

	t++;
};






function scroll(){
	if(document.body.scrollTop > 50){
	    if(!document.body.classList.contains("scrolled")){
    		document.body.classList.add("scrolled");
    		noLoop();
	    }
	}else{
	    if(document.body.classList.contains("scrolled")){
    		document.body.classList.remove("scrolled");
    		loop();
	    }
	}
}
scroll();
window.addEventListener("scroll", scroll);

$("article").click(function(){
	$("article.active").removeClass("active");
	$(this).addClass("active");
	
	updateUI();
	
	var origin = ["left top", "right top", "left bottom", "right bottom"][$(this).index()];
	$(this).parent().css({
		webkitTransformOrigin: origin,
		mozTransformOrigin: origin,
		transformOrigin: origin
	});
})
$(document).click(function(event) { 
    if(!$(event.target).closest('article').length &&
       !$(event.target).is('article')) {
        $("article.active").removeClass("active");
    }
	
	updateUI();
})
function updateUI(){
	var $nav = $("nav");
	if($("article.active").length){
		$nav.addClass("active");
	}else{
		$nav.removeClass("active");
	}
}


function getAbout(){
    var username = 'darrylyeo';
    
    function getBadge(handle){
    	return handle ? 'https://cdn.kastatic.org/images/badges/' + handle + (handle.includes('/') ? '-512x512.png' : '.png') : '';
    }
    
    var tieredBadges = {
    	membership: {
    		365: 'meteorite/cypress',
    		730: 'moon/redwood',
    		1095: 'earth/sequoia',
    		//[365 * 4]: 'earth/bristlecone',
    	},
    	energyPoints: {
    		1e4: 'meteorite/ten-to-fourth',
    		1e5: 'moon/ten-to-fifth',
    		5e5: 'earth/5x10',
    		1e6: 'sun/millionaire',
    		1e7: 'eclipse',
    	},
    	streak: {
    		5: 'meteorite/good-habits',
    		15: 'moon/like-clockwork',
    		30: 'moon/atomic-clockwork',
    		100: 'earth/10000-year-clock',
    	},
    	inspiration: {
    		1: 'meteorite/inspiration',
    		10: 'moon/good-inspiration',
    		25: 'earth/great-inspiration',
    		50: 'earth/incredible-inspiration',
    	},
    	reviews: {
    		1: 'meteorite', // Evaluator
    		30: 'moon', // Astute Analyzer
    		150: 'earth', // Rave Reviewer
    	},
    	questions: {
    		10: 'earth/investigator',
    		100: 'sun/detective',
    	},
    	topQuestion: {
    		10: 'moon/good-question',
    		25: 'earth/great-question',
    		50: 'earth/incredible-question',
    	},
    	answers: {
    		5: 'moon/excellent-teacher',
    		10: 'earth/guru',
    		25: 'earth/incredible-teacher',
    		50: 'earth/sensei',
    		100: 'sun/oracle',
    	},
    	topAnswer: {
    		10: 'moon/good-answer',
    		25: 'earth/great-answer',
    		50: 'earth/incredible-answer',
    	},
    	video: {
    		15: 'meteorite/great-listener', // Nice Listener
    		30: 'meteorite/great-listener',
    		60: 'moon/awesome-listener',
    		240: 'earth/ridiculous-listener',
    		600: 'sun/ludicrous-listener',
    	}
    }
    
    function getTieredBadge(category, value){
    	var badges = tieredBadges[category];
    	return getBadge(badges[
    		Object.keys(badges)
    			.filter(function(n){return value >= n})
    			.sort(function(a, b){return b - a})[0]
    	]);
    }
    
    function daysDifference(d0, d1) {
    	var diff = new Date(d1).setHours(12) - new Date(d0).setHours(12);
    	return Math.round(diff/8.64e7);
    }
    
    $.fn.fadeOutRemove = function(speed){
        $(this).fadeOut(speed,function(){
            $(this).remove();
        })
    }
    
    function $makeStat(number, text, img, size, id){
    	var $stat = $('<div>').addClass('stat').append(
    		$('<span>').addClass('stat-number').text(number.toLocaleString()),
    		$('<span>').addClass('stat-label').text(text)
    	).appendTo('#stats')//.attr('id', id)
    	if(img) $stat.addClass('has-img').css('background-image', 'url(' + img + ')')
    	if(size) $stat.attr('data-size', 2);
    	return $stat;
    }
    
    $.getJSON("https://www.khanacademy.org/api/internal/user/profile?username=" + username + "&lang=en&callback=?", function(data){
    	$("#profile").removeClass(".loading")
    	
    	var d = new Date(data.dateJoined);
    	var date = ("0"+(d.getMonth()+1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    	
    	$("#profile .avatar").attr('src', data.avatarSrc);
    	$("#profile .nickname").text(data.nickname),
    	$("#profile .username").text("@" + data.username);
    	$("#profile .joined").text("Joined " + date)
    	$("#profile .bio").text(markdown(data.bio));
    	$('#profile').hide().fadeIn(1000)
    	
    	var days = daysDifference(d, Date.now());
    	$('#membership').replaceWith($makeStat(days, 'Days of Membership', getTieredBadge('membership', days)));
    	$('#points').replaceWith($makeStat(data.points, 'Energy Points Earned', getTieredBadge('energyPoints', data.points), 2));
    	$('#videos').replaceWith($makeStat(data.countVideosCompleted, 'Videos Watched', getTieredBadge('video', data.countVideosCompleted)))
    	
    	$.getJSON('https://www.khanacademy.org/api/internal/user/' + data.kaid + '/profile/widgets?callback=?', function(widgets){
    		$("#streak").removeClass(".loading")
    		var streakWidget = widgets.find(function(widget){return widget.widgetId === "StreakWidget"});
    		if(streakWidget){
    			var streakData = streakWidget.renderData.streakWidgetData.streakData;
    
    			var longestStreak = streakData.history.map(function(streak){
    				return daysDifference(streak[0], streak[1])
    			}).sort(function(a, b){
    				return b - a;
    			})[0];
    
    			$("#streak").before([
    				$makeStat(longestStreak, 'Longest Streak', getTieredBadge('streak', longestStreak)),
    				$makeStat(streakData.days, 'Current Streak', getTieredBadge('streak', streakData.days))
    			]);
    		}
    		$("#streak").remove();
    		
    		var badgeWidget = widgets.find(function(widget){return widget.widgetId === "BadgeCountWidget"});
    		$("#badges").removeClass(".loading")
    		if(badgeWidget){
    			var badgeCounts = badgeWidget.renderData.badgeCountData.counts;
    			var $badges = $("#badges");
    			badgeCounts.forEach(function(badgeCount){
    				$badges.before(
    					$makeStat(badgeCount.count, badgeCount.typeLabel + ' Awarded', badgeCount.compactIconSrc.replace('-small', ''))
    				)
    			});
    		}
    		$("#badges").remove();
    
    		var discussionWidget = widgets.find(function(widget){widget.widgetId === "DiscussionWidget"});
    		$("#discussion").removeClass(".loading")
    		if(discussionWidget){
    			var discussionData = discussionWidget.renderData.discussionData;
    			var discussionStats = discussionData.statistics;
    			
    			var topQuestion = discussionData.questions[0];
    			var topAnswer = discussionData.questions[0];
    			
    			$("#discussion").before([
    				$makeStat(discussionStats.questions, 'Questions Asked', getTieredBadge('questions', discussionStats.questions)),
    				$makeStat(discussionStats.answers, 'Questions Answered', getTieredBadge('answers', discussionStats.answers)),
    				$makeStat(discussionStats.projectquestions, 'Help Requests Posted', getTieredBadge('reviews', discussionStats.projectquestions)),
    				$makeStat(discussionStats.projectanswers, 'Help Requests Resolved', getTieredBadge('reviews', discussionStats.projectanswers)),
    				$makeStat(discussionStats.comments, 'Tips and Thanks Given', getBadge('meteorite/collaborator')),
    				$makeStat(discussionStats.replies, 'Comments Posted', getBadge('meteorite/bibliographer')),
    				topQuestion ? $makeStat(topQuestion.sumVotesIncremented, 'Votes on Top Question', topQuestion.badges[0] && topQuestion.badges[0].icons.large) : '',
    				topAnswer ? $makeStat(topAnswer.sumVotesIncremented, 'Votes on Top Answer', topAnswer.badges[0] && topAnswer.badges[0].icons.large) : '',
    				$makeStat(discussionStats.votes, 'Votes Cast', getBadge('meteorite/thumbs-up')),
    				$makeStat(discussionStats.flags, 'Flags Raised', getBadge('meteorite/flag-duty'))
    			]);
    		}
    		$("#discussion").remove();
    	});
    })
    
    $.getJSON("https://www.khanacademy.org/api/internal/user/scratchpads?username=" + username + "&sort=1&limit=1000&page=0&lang=en&callback=?", function(data) {
    	$("#projects").removeClass(".loading")
    
    	var totalVotes = 0;
    	var voteCounts = [];
    	var totalSpinoffs = 0;
    	var spinoffCounts = [];
    
    	var scratchpads = data.scratchpads;
    	$("#projects h2")[0].innerHTML = scratchpads.length + " Projects Created"
    	scratchpads.forEach(function(scratchpad) {
    		scratchpad.sumVotesIncremented && scratchpad.sumVotesIncremented--;
    		totalVotes += scratchpad.sumVotesIncremented;
    		voteCounts.push(scratchpad.sumVotesIncremented);
    		
    		scratchpad.spinoffCount = Math.max(0, scratchpad.spinoffCount);
    		totalSpinoffs += scratchpad.spinoffCount;
    		spinoffCounts.push(scratchpad.spinoffCount);
    
    		$('<div>')
    			.append(
    				$('<a>').attr('href', scratchpad.url)
    				.append(
    					$('<img>').attr('src', 'https://www.khanacademy.org' + scratchpad.thumb)
    				),
    				$('<div>')
    				.append(
    					$('<h3>').text(scratchpad.title),
    						$('<p>').append(	$('<span>').text(scratchpad.sumVotesIncremented + ' Votes'),
    						' | ',
    						$('<span>').text(scratchpad.spinoffCount + ' Spinoffs')
    						)
    				)
    			)
    			//.hide().fadeTo(1000, 1)
    			.appendTo('#projects-wrapper')
    	})
    
    	$makeStat(totalVotes, "Project Votes Earned", getBadge('cs/drawing_animation_mastery_badge'))
    	$makeStat(totalSpinoffs, "Spinoffs Made By Community Members", getTieredBadge('inspiration', totalSpinoffs))
    });
}
getAbout();

// https://www.khanacademy.org/computer-programming/get-tips-and-thanks-from-program/4771204910678016
function getPolls(){
	var thisProgramID = "2722008038";
	$.getJSON("https://www.khanacademy.org/api/labs/scratchpads/" + thisProgramID + "/top-forks?callback=?", function(data) {
		var polls = data.scratchpads;
		for(var i = 0; i < polls.length; i++){
			var pollURL = polls[i].url;
			var pollID = pollURL.split("/").pop();
			
			var pollURL = "https://www.khanacademy.org/api/labs/scratchpads/" + pollID + "?casing=camel&sort=2";
			var discussionURL = "https://www.khanacademy.org/api/internal/discussions/scratchpad/" + pollID + "/comments?casing=camel&sort=2";
			
			$.getJSON(pollURL + "&callback=?", function(data) {
				var pollChoicesContent = $(data.revision.code).contents().filter(function(){return this.nodeType == 8;}).get(0).nodeValue
					.split("----------------------------")[1].trim()
					.split("\n\t").join('","')
					.split(": ").join('": "');
				var pollChoices = JSON.parse('{"' + pollChoicesContent + '"}');
				
				
				
				$.getJSON(discussionURL + "&callback=?", function(data) {
					var responses = data.feedback;
					var $poll = $("<div>").addClass("poll").attr("data-id", pollID);
					$.getJSON("https://www.khanacademy.org/api/labs/scratchpads/" + pollID + "?callback=?", function(data) {
						$poll.prepend(
							$("<h2>").html(data.title)
						);
					});

					var pollResults = {};
					for(var pollChoiceLetter in pollChoices){
						pollResults[pollChoiceLetter] = 0;
					}

					for (var i = 0; i < responses.length; i++) {
						var responseData = responses[i];
						var response = markdown(responseData.content);
						var responseAuthor = responseData.authorNickname;

						var $response = $("<p>").addClass("poll-response-content").html(response);
						var $author = $("<small>").addClass("poll-repsonse-author").text(" by " + responseAuthor)
						$poll.append(
							$("<div>").addClass("poll-response-wrapper").css("display", "none")
								.append($response)
								.append($author)
						);

						var pollChoiceLetter = $response.text().trim()[0].toUpperCase();
						if(pollChoiceLetter in pollChoices){
							pollResults[pollChoiceLetter]++;
						}else{
							pollResults["?"]++;
						}
					}

					var $summary = $("<div>").addClass("poll-summary").prependTo($poll);
					for(var pollChoiceLetter in pollResults){
						var pollChoiceResult = pollResults[pollChoiceLetter];
						var pollChoicePercent = pollChoiceResult/responses.length*100 + "%";
						if((pollChoiceLetter === "O" || pollChoiceLetter === "?") && pollChoiceResult === 0) continue;

						$summary.append(
							$("<div>").addClass("poll-choice").append(
								$("<h5>").addClass("poll-choice-letter").text(pollChoiceLetter)
							).append(
								$("<div>").addClass("poll-choice-content-wrapper").append(
									$("<div>").addClass("poll-choice-percent-bar").css("width", pollChoicePercent)
								).append(
									$("<div>").addClass("poll-choice-content").text(pollChoices[pollChoiceLetter] + " " + pollChoiceResult + " (" + pollChoicePercent + ")")
								)
							)
						);
					}

					$("#polls").append($poll);
				});
			});
		}
	});
}
//getPolls();

function markdown(t) {
	// === Regular Expressions ==========================
	var boldCheck = /\*([\S\ ]+)\*/gi;
	var italicCheck = /\_([\S\ ]+)\_/gi;
	var inlineCodeCheck = /`([\S\ ]+)`/gi;
	var blockCodeCheck = /```([\S\ ]+)```/gi;
	var urlCheck = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/gi;
	var newlineCheck = /[\r\n|\n]+/g;
	// ==================================================

	// === String Replace Stuff =========================
	t = t.replace(/\<[\S\s]+\>/g, "");
	t = t.replace(/\<\/[\S\s]+\>/g, "");
	t = t.replace(boldCheck,
		"<strong>$1</strong>");
	t = t.replace(italicCheck,
		"<em>$1</em>");
	t = t.replace(blockCodeCheck,
		"<pre>$1</pre>");
	t = t.replace(inlineCodeCheck,
		"<code>$1</code>");
	t = t.replace(urlCheck, "<a href=\"$2.$3\">$2.$3$4</a>");
	t = t.replace(newlineCheck, "<br>");
	// ==================================================

	return t;
}



}}})
