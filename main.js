const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");

const scoreText = document.querySelector("#scoreText");

const resetBtn = document.querySelector("#resetButton");

const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "#3e3041";
const snakeColor = "#ffc88b";
const snakeBorder = "black";
const foodColor = "#01c653";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0,y:0}
]


window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();


// When the game starts
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};

//Generate random food on x and y axes
function createFood(){
    function randomFood(min, max){

        // Generate a random number between 25 and 500 (ranges excluded), multiple of 25
        const randNum = Math.round((Math.random() * (max-min) + min) / unitSize) * unitSize;
        return randNum;
    }

    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
    console.log(foodX);
}

function nextTick () {
     if(running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    }
    else {
        displayGameOver();
    }
}

//Clear board from snake and food
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
}


function changeDirection(event) {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;
    }
    console.log(keyPressed);
}


function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0,y:0}
    ]

    gameStart();
}

function drawFood(){
    ctx.fillStyle = foodColor;

    /* The fillRect() method draws a filled rectangle whose starting point is at (x, y)
    and whose size is specified by width and height. The fill style is determined by the current fillStyle attribute. */
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function moveSnake(){
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    };

    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for (let i = 1; i < snake.length; i+=1) {
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }    
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "#01c653";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth / 2, gameHeight / 2);
    running = false;
}
