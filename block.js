class Block {
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

    move() {
        this.x-=this.speed;
    }
}