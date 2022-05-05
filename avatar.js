class Avatar {
    x
    y
    width
    height
    speed

    constructor(x, y, width, height, style, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.style = style;
        this.speed = speed;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.style
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    move(game) {
        if (game.rightPressed) {
            this.x = this.x + this.speed;
        }
        if (game.leftPressed) {
            this.x -= this.speed;
        }
    
        if (game.upPressed) {
            this.y -= this.speed;
        }
    
        if (game.downPressed) {
            this.y += this.speed;
        }
    
        if (this.x < 0 ) {
            this.x = 0;
        }
    
        if (this.x > game.screenWidth - this.width) {
            this.x = game.screenWidth - this.width;
        }
    
        if (this.y < 0 ) {
            this.y = 0;
        }
    
        if (this.y > game.screenHeight - this.height) {
            this.y = game.screenHeight - this.height;
        }
    }    

    reset() {
        this.x = 0
        this.y = (game.screenHeight / 2) - (this.height/2) 
    }
}