class Game {
    static KeyboardHelper = { 
        left: 37, 
        up: 38, 
        right: 39, 
        down: 40 
    }

    screenWidth
    screenHeight
    leftPressed
    rightPressed
    upPressed
    downPressed

    avatar = new Avatar(0, 400, 25, 25, 'rgb( 0 , 0, 155 )', 10)
    blocks = []
    lastBlock 
    gameOver = false

    constructor(screenWidth, screenHeight) {
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;
        this.leftPressed = false;
        this.rightPressed = false;
        this.upPressed = false;
        this.downPressed = false;
    }

    keyHandler(evt, down) {
        if (evt.keyCode == Game.KeyboardHelper.right) {
            this.rightPressed = down;
        }
        else if (evt.keyCode == Game.KeyboardHelper.left) {
            this.leftPressed = down;
        }
        if (evt.keyCode == Game.KeyboardHelper.down) {
            this.downPressed = down;
        }
        else if (evt.keyCode == Game.KeyboardHelper.up) {
            this.upPressed = down;
        }
    }
    
    run() {
        var canvas = document.getElementById("gameCanvas")
        var ctx = canvas.getContext("2d")

        window.requestAnimationFrame(() => this.run())
        if (this.gameOver) {
            this.drawGameOver(ctx)
            return
        }
    
        ctx.fillStyle = 'rgb(200,30,25)'
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight);
    
        this.avatar.move(this)
        this.avatar.draw(ctx)
    
        if (this.lastBlock == null ||this.lastBlock.x < this.screenWidth -(this.lastBlock.width+50)){
            var height = Math.floor(Math.random() * (this.screenHeight - 50))
            this.lastBlock = new Block(this.screenWidth,height,50,50,'rgb(0,255,0)',2);
            this.blocks.push(this.lastBlock);
        }
    
        this.blocks.forEach( block => {
            block.move();

            if (this.avatar.x + this.avatar.width < block.x ||
                this.avatar.x > block.x + block.width ||
                this.avatar.y + this.avatar.height < block.y ||
                this.avatar.y > block.y + block.height) {
                    block.draw(ctx)
            } else {
                this.gameOver = true
                return
            }

        });
    
        this.blocks = this.blocks.filter( block => {
            return block.x + block.width > 0;
        }) 
    }

    drawGameOver(ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, this.screenWidth, this.screenHeight)
        
        ctx.fillStyle = "black"
        ctx.font = "50pt arial"
        ctx.textAlign = "center"
        ctx.fillText("GAME OVER", this.screenWidth/2, this.screenHeight/2)
    }

    reset() {
        this.avatar.reset()
        this.blocks = []
        this.lastBlock = null
        this.gameOver = false
    }
}

var game = new Game(800, 800)

function initGame() {
    document.addEventListener('keydown', evt =>game.keyHandler(evt, true), false);
    document.addEventListener('keyup', evt => game.keyHandler(evt, false), false);

    window.requestAnimationFrame(() => game.run())
}
