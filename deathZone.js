import { GameObject } from "./gameObject.js";

export class DeathZone extends GameObject {
    constructor(pos, size) {
        super(pos, size, "Black");

    }
    Draw(ctx) {

    }

    OnCollision(other, colType) {
        other.Respawn();
        console.log("DIED");
        return "DEAD";
    }
}