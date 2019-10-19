function setup() {
    createCanvas(1900, 900)
    background(0, 0, 0)
    frameRate(500)
}

var player1 = {
    yPosition: 0,
    width: 20,
    height: 150,
    render: function() {
        fill(255, 255, 255);
        rect(100, this.yPosition, this.width, this.height);
    }
};

var player2 = {
    yPosition: 0,
    width: 20,
    height: 150,
    render: function() {
        fill(255, 255, 255);
        rect(1800, this.yPosition, this.width, this.height);
    }
}

var ball = {
    size: 30,
    xPosition: 950,
    yPosition: 450,
    speedX: 10,
    speedY: 1,
    render: function() {
        fill(175, 175, 255);

        if(this.yPosition + this.size >= 900){
            this.yPosition = 900 - this.size;
            this.speedY = -this.speedY;
        }

        if(this.yPosition <= 0){
            this.yPosition = 0;
            this.speedY = -this.speedY;
        }

        this.xPosition = this.xPosition + this.speedX;
        this.yPosition = this.yPosition + this.speedY;
        rect(this.xPosition, this.yPosition, this.size, this.size);
    },
    reset: function() {
        this.xPosition = 950
        this.yPosition = 450
        this.speedX = 10
        this.speedY = 1
    }
}

score1 = 0
score2 = 0

function testCollision(player1, player2, ball){
    left_up_x = ball.xPosition;
    left_up_y = ball.yPosition;

    left_down_x = left_up_x
    left_down_y = left_up_y + ball.size

    right_up_x = left_up_x + ball.size
    right_up_y = left_up_y

    right_down_x = left_up_x + ball.size
    right_down_y = left_up_y + ball.size

    p1_right = player1.yPosition;
    p2_left = player2.yPosition;

    if(p2_left < right_up_y && right_up_y < p2_left + 125){
        if(right_up_x > 1799 && right_up_x < 1850){
            diry = Math.random() + 1;
            flip = Math.random() * 2;
            ball.speedX = -ball.speedX;
            if(flip === 1){
                ball.speedY = -ball.speedY * diry;
            }
            else{
                ball.speedY = ball.speedY * diry;
            }
        }
    }

    if(p1_right < left_up_y && left_up_y < p1_right + 125){
        if(left_up_x > 75 && left_up_x < 121){
            ball.speedX = -ball.speedX;
            flip = Math.random() * 2;
            if(flip === 1){
                ball.speedY = -ball.speedY * diry;
            }
            else{
                ball.speedY = ball.speedY * diry;
            }
        }
    }

    if(ball.xPosition <= 0){
        score2 = score2 + 1
        ball.reset()
    }
    if(ball.xPosition >= 1900){
        score1 = score1 + 1
        ball.reset()
    }
}



function draw() {

    testCollision(player1, player2, ball)

    if(keyIsDown(87)){
        if(player1.yPosition - 7.5 < 0)
            player1.yPosition = 0
        else
            player1.yPosition = player1.yPosition - 7.5;
    }

    if(keyIsDown(83)){
        if(player1.yPosition + 7.5 > 750)
            player1.yPosition = 750
        else
            player1.yPosition = player1.yPosition + 7.5;
    }

    if(keyIsDown(UP_ARROW)){
        if(player2.yPosition - 7.5 < 0)
            player2.yPosition = 0
        else
            player2.yPosition = player2.yPosition - 7.5;
    }

    if(keyIsDown(DOWN_ARROW)){
        if(player2.yPosition + 7.5 > 750)
            player2.yPosition = 750
        else
            player2.yPosition = player2.yPosition + 7.5;
    }

    clear()

    background(0, 0, 0)
    player1.render()
    player2.render()
    ball.render()
    textSize(60)
    textAlign(CENTER, CENTER)
    fill(255)
    text(score1, 800, 100)
    text(':', 900, 100)
    text(score2, 1000, 100)
}
