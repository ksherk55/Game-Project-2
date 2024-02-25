import { PhysicsObject } from "./physicsObject.js";

export class Player extends PhysicsObject {
    constructor(position, size, color, gravity) {
        super(position, size, color, gravity);
        this.jumpForce = -20;
        this.movespeed = 10;
    }

    Update(colliders, input) {
        this.HandleCollisions(colliders);
        this.Move(input);
        this.RepositionColliders();

    }  

    Move(input) {
        if (input.includes("ArrowUp") && this.grounded) {
            
        this.velocity.y += this.jumpForce;
        this.grounded = false;
        } else {
            this.velocity.y += this.gravity;
        }
        if (input.includes("ArrowLeft")) this.velocity.x = -this.movespeed;
        else if (input.includes("ArrowRight")) this.velocity.x = this.movespeed;
        else this.velocity.x = 0;

        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    
}