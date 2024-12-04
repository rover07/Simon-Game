// 1. keypress-> start game
// 2. levelup+btnFlash
// 3. uers btnPress-> check user sequence == game sequence
// 4. If same sequene-> level up , else game over

let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 1. keypress in doc anywhere to start game
document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game started");
    started = true;

    levelUp();
  }
});

// 2.3 button flash
function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 300);
}

// 3.2 user flash
function userFlash(btn) {
  btn.classList.add("user-flash");
  setTimeout(function () {
    btn.classList.remove("user-flash");
  }, 300);
}

// // //  2.level up+ button flash
function levelUp() {
  // 4.4 Reset user sequence to empty value on level up
  userSeq = [];
  // 2.1 level up
  level++;
  h2.innerText = `level ${level}`;
  // 2.2 first choose random button then flash button
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  gameFlash(randBtn);

  // 4.1 pushing game flashed color in array
  gameSeq.push(randColor);
  console.log(gameSeq);
}

// // 4.3: checking gameSequence==userSequence
function checkAns(idx) {
  // //If middle value of userSeq, wait fot next button press then -> check
  if (userSeq[idx] === gameSeq[idx]) {
    // same value entered
    // //If last value of userSeq, level up + generate new color for gameSequence
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000); // if same color appears again there's no delay,for delay we use this
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any Key to restart game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    // // 4.5 reset game on wrong key press
    reset();
  }
}

//
// // // 3.1
function btnPress() {
  //   console.log(this);
  let btn = this;
  userFlash(btn);

  // 4.2 pushing user pressed button in array, accessing button using id
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  //   console.log(userSeq);

  //4.0
  checkAns(userSeq.length - 1); // passes current sequence size as current index to check
}

// // 3
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

// // 4.5.1 function declaration
function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
