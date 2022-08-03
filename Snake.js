//board 

var blockSize =25; 
var rows = 25; 
var cols = 40; 
var board; 
var context; 

//Snake head 
snakeX = blockSize * 5;
snakeY = blockSize * 5; 

var gameOver = false; 

//Snake Speed
var velocityX = 0; 
var velocityY = 0;  

//snake body 
var snakeBody = [];

//food 
var foodX = blockSize * 10; 
var foodY = blockSize * 10; 

window.onload = function() {

    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;  
    context = board.getContext("2d"); //For Drawing the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update(); 
    setInterval(update, 1000/10); //updates every 100 milliseconds 
} 

function update() {
      
    if (gameOver) {
        return; 
    }

    context.fillStyle="black"; 
    context.fillRect(0, 0, board.width, board.height); 


    context.fillStyle="red"; 
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]) //add food to the body using array 
        placeFood();  
    }
    
    //make snake body produced by eating food follow the rest of snake 
    for (let i =snakeBody.length - 1; i > 0; i --) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) { 
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="lime"; 
    snakeX += velocityX * blockSize; 
    snakeY += velocityY * blockSize; 
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++ ){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // game over conidtions: 
    // 
    if (snakeX < 0  || snakeX > cols*blockSize || snakeY <0 || snakeY > rows*blockSize) {
        gameOver = true; 
        alert("Game Over");
    } 

    // body bump game over 
    for (let i = 0; i < snakeBody.length; i++ ) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true; 
            alert("Game Over");
        }
    }
}  

function changeDirection(e) { 
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1; 
    }

    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1; 
    }

    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0; 
    }

    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0; 
    }
    
    const has_eaten_food = snake[0].x === foodX && snake[0].y === foodY;
      if (has_eaten_Food) {
        // Increase score
        score += 10;
        // Display score on screen
        document.getElementById('score').innerHTML = score;
        // Generate new food location
        gen_food();
      } else {
        // Remove the last part of snake body
        snake.pop();
      }

} 

function placeFood() { 
    //math.random = returns number between 0-1 and then * cols/rows(0-19.9999) -> floor= 0-19 * blocksize 25 
    foodX = Math.floor(Math.random() * cols) * blockSize; 
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

//score counter

 

