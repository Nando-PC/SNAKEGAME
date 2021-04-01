let canvas = document.getElementById("snake"); // Elemento inicial para criar o jogo
let context = canvas.getContext("2d"); //definindo plano de jogo
let box = 32; 
let snake = []; // tamanho da cobrinha será um array de coordenadas
snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

// aliteração da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box

}

//criar Plano de Fundo
function criarBG(){
    context.fillStyle = "yellow";
    context.fillRect(0, 0, 16*box, box*16);    
}

// criar a cobrinha
function criarCobrinha(){
    for(i=0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// criar a comida
function drawFood(){
    context.fillStyle = "black";
    context.fillRect(food.x, food.y, box, box);
}

// definir as direções
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";

}

//Função Jogo
function IniciarJogo(){
    
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16*box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16*box;

    // definir fim de jogo
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over!! Aperte Ok e F5 para iniciar');
        }
    }

    // chamando as funções do jogo
    criarBG(); 
    criarCobrinha();
    drawFood();
    
    // direções da cobrinha
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // encerramento e definindo o limite do tamanho da cobrinha
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1)* box;
    }


    // aumento do tamanho da cobrinha
    let newhead = {
        x: snakeX,
        y: snakeY
    }
    
    snake.unshift(newhead);


}

// definindo início de jogo
let jogo = setInterval(IniciarJogo, 100);






