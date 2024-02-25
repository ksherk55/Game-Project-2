export class GameObject {
    constructor(position, size, color) {
        this.position = position;
        this.size = size;
        this.color = color;
    }   

    CheckCollision(other) {
        if (
            this.position.x < other.position.x + other.size.x &&
            this.position.x + this.size.x > other.position.x &&
            this.position.y < other.position.y + other.size.y &&
            this.position.y + this.size.y > other.position.y
        ) {
            return true;
        } else {
            return false;
        }
    }

    Draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

}