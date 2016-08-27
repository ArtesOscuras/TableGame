var randomNum, answerx, answery, x, y;
var attempts = 3;
var condition = true;
var cells = [[],[],[],[]];
var formatted = false;
var attemptsHead = document.getElementById('attempts');

var nagito = ['Nagito 1.png', 'Nagito 2.png', 'Nagito 3.png']

var body = document.getElementsByTagName('body')[0];

var audio = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3', 'audio4.mp3', 'audio5.mp3', 'audio6.mp3', 'audio7.mp3', 'audio8.mp3', 'audio9.mp3', 'audio10.mp3', 'audio11.mp3', 'audio12.mp3', 'audio13.mp3', 'audio14.mp3', 'audio15.mp3', 'audio16.mp3']

var rows = [(document.getElementsByTagName('tr')[0]).getElementsByTagName('td'), (document.getElementsByTagName('tr')[1]).getElementsByTagName('td'), (document.getElementsByTagName('tr')[2]).getElementsByTagName('td'), (document.getElementsByTagName('tr')[3]).getElementsByTagName('td')];

var heading = document.getElementById('heading');

var buttons = document.getElementsByClassName('button');
var currentButton = buttons[0].getElementsByTagName('h2')[0];

var incorrect = document.getElementsByTagName('audio')[0];
var correct = document.getElementsByTagName('audio')[1];

var table = document.getElementsByTagName('table')[0];

var currentOpacity = 0.0;
var tableOpacity = 0.0;
var counter = 0;

var playAgain = document.getElementById('playAgain');

function press() {
  switch (counter) {
    case 0:
      heading.innerHTML = "I want to play a game.";
      currentButton.innerHTML = "Okay?";
      heading.className -= " fadeIn";
      currentButton.className -= "delayedFadeIn";
      heading.className += " fadeIn";
      currentButton.className =+ " delayedFadeIn";
      counter++;
      break;
    case 1:
      heading.innerHTML = "Find the real audio, and you win.";
      currentButton.innerHTML = "Start";
      counter++;
      break;
    case 2:
      heading.style.display = "none";
      currentButton.style.display = "none";
      table.className += " fadeIn";
      table.style.display = "table";
      attemptsHead.style.display = "block";
      attemptsHead.className += " fadeIn";
      start();
      break;
  }
}

function start() {

  while (!formatted) {

    for (x = 0; x < 4; x++) {
      for (y = 0; y < 4; y++) {
        randomNum = Math.floor((Math.random() * audio.length));
        console.log(audio[randomNum])
        if (condition) {
          if (audio[randomNum] === 'audio7.mp3') {
            cells[x][y] = true;
            rows[x][y].innerHTML += "<audio controls onpause='answer(" + x + "," + y + ")' src='" + audio[randomNum] + "' autoplay>";
            audio.splice(randomNum, 1);
            condition = false;
            answerx = x;
            answery = y;
          } else {
            rows[x][y].innerHTML += "<audio controls onpause='answer(" + x + "," + y + ")' src='" + audio[randomNum] + "' autoplay>";
            audio.splice(randomNum, 1);
            cells[x][y] = false;
          }
        } else {
          cells[x][y] = false;
          rows[x][y].innerHTML += "<audio controls onpause='answer(" + x + "," + y + ")' src='" + audio[randomNum] + "' autoplay>";
          audio.splice(randomNum, 1);
        }
      }// for (y) end
    }// for (x) end

    for (x = 0; x < 4; x++) {
      for (y = 0; y < 4; y++) {
        if (cells[x][y] === true) {
          formatted = true;
        }
      }
    }
  }



};


function lose() {
  for (x = 0; x < 4; x++) {
    for (y = 0; y < 4; y++) {
      if (rows[x][y].getElementsByTagName('audio')[0] != null) {
        rows[x][y].getElementsByTagName('audio')[0].removeAttribute('onpause');
      }
    }
  }
  table.style.width = "80%";
  attemptsHead.innerHTML = '<h1>GAME OVER</h1>';
  table.innerHTML = '<tr> <td> <h1>EXECUTION TIME</h1> </td> </tr> <tr><td align="center"><video autoplay loop src="execution.mp4"></video></td></tr>';
  body.style.background = "url('" + nagito[Math.floor(Math.random() * nagito.length)] + "') fixed center";
  body.style.backgroundSize = "cover";
  playAgain.style.display = "block";
}

function answer(attemptx, attempty) {
  console.log("Attemptx: " + attemptx);
  console.log("Attempty: " + attempty)
  if (attemptx === answerx && attempty === answery ) {
    correct.play();
    rows[attemptx][attempty].innerHTML = "CONGRATULATIONS!"
    attemptsHead.innerHTML = "CONGRATULATIONS!";
    for (x = 0; x < 4; x++) {
      for (y = 0; y < 4; y++) {
        rows[x][y].removeAttribute('onclick');
        if (rows[x][y].getElementsByTagName('audio')[0] != null) {
          rows[x][y].getElementsByTagName('audio')[0].removeAttribute('onpause');
        }
      }
    }
    rows[attemptx][attempty].removeAttribute("onclick");
    table.style.width = "80%";
    table.innerHTML = '<tr> <td> <h1>PRIZE: Hope for tomorrow</h1> </td> </tr> <tr><td align="center"><video autoplay controls src="newhope.mp4"></video></td></tr>';
    body.style.background = "url('Chiaki 1.png') fixed center";
    body.style.backgroundSize = "cover";
    playAgain.style.display = "block";
    return;
    //Add Congratulations here
  } else if (attemptx === answerx) {
    if (attempty > answery) {
      if (incorrect.paused) {
        incorrect.play();
      } else {
        incorrect.load();
        incorrect.play();
      }
      rows[attemptx][attempty].getElementsByTagName('audio')[0].removeAttribute('onpause');
      rows[attemptx][attempty].innerHTML = "<img src='arrow-left.png'>";
      rows[attemptx][attempty].removeAttribute("onclick");
      attemptsHead.innerHTML = "Attemps left: " + --attempts
      if (attempts === 0) {
        lose();
      }
      return;
      //Add left arrow
    } else {
      if (incorrect.paused) {
        incorrect.play();
      } else {
        incorrect.load();
        incorrect.play();
      }
      rows[attemptx][attempty].getElementsByTagName('audio')[0].removeAttribute('onpause');
      rows[attemptx][attempty].innerHTML = "<img src='arrow-right.png'>";
      rows[attemptx][attempty].removeAttribute("onclick");
      attemptsHead.innerHTML = "Attemps left: " + --attempts
      if (attempts === 0) {
        lose();
      }
      return;
      //Add right arrow
    }
  } else if (attempty === attempty) {
    if (attemptx > answerx) {
      if (incorrect.paused) {
        incorrect.play();
      } else {
        incorrect.load();
        incorrect.play();
      }
      rows[attemptx][attempty].getElementsByTagName('audio')[0].removeAttribute('onpause');
      rows[attemptx][attempty].innerHTML = "<img src='arrow-up.png'>";
      rows[attemptx][attempty].removeAttribute("onclick");
      attemptsHead.innerHTML = "Attemps left: " + --attempts
      if (attempts === 0) {
        lose();
      }
      return;
      //Add up arrow here
    } else {
      if (incorrect.paused) {
        incorrect.play();
      } else {
        incorrect.load();
        incorrect.play();
      }
      rows[attemptx][attempty].getElementsByTagName('audio')[0].removeAttribute('onpause');
      rows[attemptx][attempty].innerHTML = "<img src='arrow-down.png'>";
      rows[attemptx][attempty].removeAttribute("onclick");
      attemptsHead.innerHTML = "Attemps left: " + --attempts
      if (attempts === 0) {
        lose();
      }
      return;
      //Add down arrow here
    }
  }

}//answer() end
