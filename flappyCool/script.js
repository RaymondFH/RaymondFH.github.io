var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;
var gameActive = true;

var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;

hole.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * (gameHeight - 30 * gameHeight / 100));
    hole.style.top = random + "px";
    counter++;
});

var gameLoop = setInterval(function(){
    if (!gameActive) return;

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterBottom = characterTop + (3 * gameHeight / 100); // Assuming character height is 3vh

    if(jumping == 0){
        character.style.top = (characterTop + gameHeight / 200) + "px";
    }

    if((characterTop > gameHeight * 0.97) || 
       (blockLeft < 20 && blockLeft > -50 && 
        (characterTop < holeTop || characterBottom > holeTop + gameHeight * 0.3))){
        gameOver();
    }
},10);

function jump(){
    if (!gameActive) return;
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop > gameHeight * 0.01) && (jumpCount < 15)){
            character.style.top = (characterTop - gameHeight / 100) + "px";
        }
        if(jumpCount > 20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    },10);
}

function gameOver() {
    gameActive = false;
    document.getElementById('finalScore').textContent = counter - 1;
    document.getElementById('scoreModal').style.display = 'block';
    block.style.animationPlayState = 'paused';
    hole.style.animationPlayState = 'paused';
}

function restartGame() {
    gameActive = true;
    counter = 0;
    character.style.top = (gameHeight * 0.2) + "px";
    document.getElementById('scoreModal').style.display = 'none';
    block.style.animationPlayState = 'running';
    hole.style.animationPlayState = 'running';
}

document.getElementById('restartButton').addEventListener('click', restartGame);

// Event listener for jump (can be triggered by click or touch)
document.addEventListener('click', function(e) {
    if (e.target.id !== 'restartButton') {
        jump();
    }
});

document.addEventListener('touchstart', function(e) {
    if (e.target.id !== 'restartButton') {
        e.preventDefault();  // Prevent default touch behavior
        jump();
    }
});

window.addEventListener('resize', function() {
    gameWidth = window.innerWidth;
    gameHeight = window.innerHeight;
});