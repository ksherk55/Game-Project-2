import { GameObject } from "./gameObject.js";

export class Platform extends GameObject {
    constructor(position = {x: 0, y: 0}, size = {x: 0, y: 0}, color = "Black") {
        super(position, size, color)
    } 

    OnCollision(other, colType) {
        if (colType == "B") {
            other.position.y = this.position.y - other.size.y;
            other.velocity.y = 0;
            return "grounded";
        } else if (colType == "T") {
            other.position.y = this.position.y + this.size.y;
            other.velocity.y = 0;
        }
    }
}