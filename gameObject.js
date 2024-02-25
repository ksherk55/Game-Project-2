/**
 * Base GameObject class for others to inherit from.
 * Contains a variable for postion (default {x: 0, y: 0}), size (default {x: 0, y: 0}), and color (default "Black")
 */
export class GameObject {
    constructor(position = {x: 0, y: 0}, size = {x: 0, y: 0}, color = "Black") {
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