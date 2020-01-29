var animationSetup = false;

 function animationPipeline() {


   var self = this,
   w = window.innerWidth,
   h = window.innerHeight,
   stage = document.getElementById('stage'),
   startButton = document.getElementById('startButton'),
   title = document.getElementById('title'),
   questionTitle = document.getElementsByClassName("questions"),
   score = document.getElementsByClassName("score"),
   scoreSpan = score[0].getElementsByTagName('span'),
   timer = document.getElementsByClassName("timer"),
   timerSpan = timer[0].getElementsByTagName('span'),
   gameChoices = document.getElementById('gameChoices'),
   gameHeader = document.getElementById('gameHeader'),
   buttonOne = document.getElementById('buttonOne'),
   buttonTwo = document.getElementById('buttonTwo'),
   buttonThree = document.getElementById('buttonThree'),
   buttonFour = document.getElementById('buttonFour'),
   buttonArray = [buttonOne, buttonTwo, buttonThree, buttonFour],
   modal_window = document.getElementById('modal_window')
   startAnimation = new TimelineMax({repeat:0}),
   gameIndex = 0,
   actualScore = 0,
   timerIndex = 7,
   runningGameAgain = false,
   timerObject = undefined,
   gameQuestions = [],

   questions = [
    'What is the legislative capital city of Sri Lanka?',
    'How many districts are there in Sri Lanka?',
    'What is the tallest mountain in Sri Lanka?',
    'In which Sri Lankan province is the famous Temple of the Tooth located?',
    'Which ocean surrounds Sri Lanka?',
    'Who did Sri Lanka gain their independence from?',
    'What currency do they use?',
    'How many airports are in Sri Lanka?',
    'What sports do they mostly play?',
    'What is the tallest waterfall in srilanka?'
   ],
   answers = [
    ["Trincomalee", "Jaffna", "Sri Jayawardanapura Kotte", "Colombo"],
    ["24", "25", "26", "27"],
    ["Pidurutalagala", "Adam's Peak", "Kirigalpotta", "Hakgala"],
    ["Central Province", "North Province", "East Province", "Western Province"],
    ["Aegean Sea", "Adriatic Sea", "Indian Ocean", "Sea of Azov"],
    ["France", "United Kingdom", "China", "India"],
    ["Peso", "Dollar", "Euro", "Rupee"],
    ["Five", "Four", "Three", "Two"],
    ["Basketball", "Cricket", "Tennies", "Soccer"],
    ["Bambarakanda", "Baker’s Waterfalls", "Devon Waterfalls", "Bopath Ella"]
   ],
   correctAnswers = [2,1,0,0,2,1,3,2,1,0],
   gameAnswers = [];


   self._initilize = function() {

    self.windowWasResized();

    startButton.addEventListener('click', self.startGamePlay);


    for (var i = 0; i < buttonArray.length; i++) {
      buttonArray[i].addEventListener('click', self.anwerClicked, false);
    }
   };


   self.windowWasResized = function() {
    stage.style.height = (h -20) +'px';
    stage.style.width = (w - 20) + 'px';
   };


   self.startGamePlay = function() {


    self.generateGameIndexes();


    self.setupUserInterfaceWithData();

    scoreSpan[0].textContent = actualScore;
    timerSpan[0].textContent = timerIndex;

    startAnimation.to([startButton, title], 1, {alpha:0});
    startAnimation.to([startButton, title], 0.1, {css:{display:'none'}});
    startAnimation.to([gameHeader, gameChoices], 0.1, {css:{display:'block'}, onComplete:self.fireOffGameLogic});
   };


   self.fireOffGameLogic = function() {
    self.runTimer();

   }


   self.setupUserInterfaceWithData = function() {

    var ques = questions[gameQuestions[gameIndex]];
    var t = questionTitle[0].getElementsByTagName('span');
    t[0].innerHTML = ques;

    var ans = answers[gameQuestions[gameIndex]];
    for (var i = 0; i < ans.length; i++) {
      var a = ans[i];
      buttonArray[i].textContent = a;
    }
   };

   self.runTimer = function() {
    timerObject = window.setInterval(self.updateClock, 1000);
   };

   self.updateClock = function() {
    timerIndex--;
    if (timerIndex == -1) {
      timerIndex = 7;
      gameIndex++;
    }

    if (gameIndex == gameQuestions.length) {
      clearTimeout(timerObject);

      self.runEndOfGame();
      return;
    } else if(timerIndex == 7){
      self.setupUserInterfaceWithData();
    }

    timerSpan[0].textContent = timerIndex;
   };


   self.anwerClicked = function(e) {

    clearTimeout(timerObject);


    var answerIndex = Number(e.target.getAttribute('data-index'));

    var actualCorrectAnswerIndex = gameAnswers[gameIndex];

    if (actualCorrectAnswerIndex == answerIndex) {
      actualScore += 2;
      scoreSpan[0].textContent = actualScore;
      cancelButtons = true;
      self.dispatch_modal('YOUR ANSWER IS: <span class="correct">CORRECT!</span>', 1000);

    } else {

      actualScore -= 1;
        scoreSpan[0].textContent = actualScore;
      cancelButtons = true;
      self.dispatch_modal('YOUR ANSWER IS: <span class="incorrect">INCORRECT!</span>', 1000);
    }
   }


   self.generateGameIndexes = function() {
    var breakFlag = false;
    while (!breakFlag) {
      var randomNumber = Math.floor(Math.random() * 10);
      if (gameQuestions.indexOf(randomNumber) == -1) {
        gameQuestions.push(randomNumber);
        gameAnswers.push(correctAnswers[randomNumber]);
      }
      if (gameQuestions.length == 10) {
        breakFlag = true;
      }
    }
   };


   self.dispatch_modal = function(message, time) {
    window_width = window.innerWidth|| document.documentElement.clientWidth
                   || document.body.clientWidth;

    modal_window.getElementsByTagName('p')[0].innerHTML = message;
    modal_window.style.left = ((window_width / 2) - 150)+ 'px';

    self.fade_in(time, modal_window, true);
   };

   self.fade_in = function(time, elem, flag) {

    var opacity = 0, interval = 50,
    gap = interval / time, self = this;

    elem.style.display = 'block';
    elem.style.opacity = opacity;

    function func() {
      opacity += gap;
      elem.style.opacity = opacity;

      if (opacity >= 1) {
        window.clearInterval(fading);
        if (flag) {
          setTimeout(function(){
             self.fade_out(time, elem);
          }, 1500);
        }
      }
    }
    var fading = window.setInterval(func, interval);
   },


   self.fade_out = function(time, elem) {
    var opacity = 1, interval = 50, gap = interval / time;

    function func() {
      opacity -= gap;
      elem.style.opacity = opacity;

      if (opacity <= 0) {
        window.clearInterval(fading);
        elem.style.display = 'none';
        gameIndex++;
        // Determine if we need to run another game loop
        if (gameIndex != gameQuestions.length) {
          timerIndex = 7;
          timerSpan[0].textContent = timerIndex
          self.setupUserInterfaceWithData();
          self.runTimer();

        } else {
          self.runEndOfGame();
        }
      }
    }
    var fading = window.setInterval(func, interval);
   };


   self.runEndOfGame = function() {

    window_width = window.innerWidth|| document.documentElement.clientWidth
                   || document.body.clientWidth;
    var playAgainButton = '<button id="playAgain" class="left" onClick="self.resetGame()">PLAY AGAIN</button>';
    if(actualScore < 3){
        var actualScoreHeader = '<h2 class="background-flat-red-light">CONGRATS, YOUR FINAL SCORE IS: '+ actualScore + '</h2>';
    } else if(actualScore > 6){
        var actualScoreHeader = '<h2 class="background-flat-green-light">CONGRATS, YOUR FINAL SCORE IS: '+ actualScore + '</h2>';

    } else {
        var actualScoreHeader = '<h2 class="background-flat-blue-light">CONGRATS, YOUR FINAL SCORE IS: '+ actualScore + '</h2>';
    }
    var insertedHTML = actualScoreHeader +'<div>'+ playAgainButton + '</div>';
    modal_window.getElementsByTagName('div')[0].innerHTML = insertedHTML;
    modal_window.style.left = ((window_width / 2) - 150)+ 'px';

    self.fade_in(1000, modal_window, false);
   };

   self.resetGame = function() {

    modal_window.style.opacity = 0.0;
    modal_window.innerHTML = '<div class="modal_message"><p></p></div>';

    window.clearTimeout(timerObject);
    timerObject = undefined;
    gameIndex = 0;
    gameAnswers = [];
    actualScore = 0;
    timerIndex = 7;
    gameQuestions = [];
    self.generateGameIndexes();

   self.setupUserInterfaceWithData();
    scoreSpan[0].textContent = actualScore;
    timerSpan[0].textContent = timerIndex;
    self.runTimer();


   };


   self.l = function(message) {
    console.log(message);
   };

   self._initilize();

 }


 var interval = setInterval(function() {
  if(document.readyState === 'complete') {
    clearInterval(interval);
    var pipe = animationPipeline();

    window.onresize = function(event) {
      var pipe = animationPipeline()
    };
  }
 }, 100);



