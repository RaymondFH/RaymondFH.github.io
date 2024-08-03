var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

var gameWidth = window.innerWidth;
var gameHeight = window.innerHeight;


//hole position
hole.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * (gameHeight - 30 * gameHeight / 100));
    hole.style.top = random + "px";
    counter++;
});


// collision detection
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockRight = parseInt(window.getComputedStyle(block).getPropertyValue("right"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterBottom = characterTop + (3 * gameHeight / 100); // Assuming character height is 3vh

    if(jumping==0){
        character.style.top = (characterTop + gameHeight / 200) + "px";
    }

    if((characterTop > gameHeight * 0.97) || (blockRight > gameWidth * 0.85 && blockRight < gameWidth * 0.95 && (characterTop < holeTop || characterBottom > holeTop + gameHeight * 0.3))){
        alert("Game over. Score: "+(counter-1));
        character.style.top = (gameHeight * 0.2) + "px";
        counter=0;
    }
},10);

// jump
function jump(){
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