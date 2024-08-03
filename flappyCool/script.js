var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;

// hole position
hole.addEventListener('animationiteration', () => {
    var random = Math.floor(Math.random() * (400 - 150));
    hole.style.top = random + "px";
    counter++;
});

// collision detection
setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var blockRight = parseInt(window.getComputedStyle(block).getPropertyValue("right"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var characterBottom = characterTop + 30; // Assuming character height is 30px

    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }

    if((characterTop > 470) || (blockRight > 350 && blockRight < 400 && (characterTop < holeTop || characterBottom > holeTop + 150))){
        alert("Game over. Score: "+(counter-1));
        character.style.top = 100 + "px";
        counter=0;
    }
},10);

// jump 
function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop > 6) && (jumpCount < 15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount > 20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    },10);
}