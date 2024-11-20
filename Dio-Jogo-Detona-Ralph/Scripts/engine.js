// Comentarios No Java Script - Ctrl+K+C //

const state = {
    view:{
          squares: document.querySelectorAll(".square"),
          enemy: document.querySelector(".enemy"),
          time: document.querySelector("#time"),
          score: document.querySelector("#score"),
         },
    values:{
            gameVelocity: 1000,
            hitPosition:0,
            result:0,
            currentTime:60,
           },
    actions:{
             timerId: setInterval(randomSquare,1000),
             countDownTimerId: setInterval(countDown,1000),
            }
};

function countDown(){
    state.values.currentTime--;
    state.view.time.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.TimerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("Audios/Hit.wav");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    });
}

function initialize(){
    moveEnemy();
    addListenerHitbox();
                     }
    initialize();
