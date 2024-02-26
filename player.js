import { PhysicsObject } from "./physicsObject.js";

export class Player extends PhysicsObject {
    constructor(position, size, color, gravity) {
        super(position, size, color, gravity);
        this.jumpForce = -20;
        this.movespeed = 10;
    }

    Update(colliders, input) {
        this.Move(input, colliders);

    }  

    Move(input, colliders) {
        if (input.includes(" ") && this.grounded) {
            
        this.velocity.y += this.jumpForce;
        this.grounded = false;
        } else {
            this.velocity.y += this.gravity;
        }
        if (input.includes("a")) this.velocity.x = -this.movespeed;
        else if (input.includes("d")) this.velocity.x = this.movespeed;
        else this.velocity.x = 0;

        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        this.position.x = Math.min(this.position.x, 1500 - this.size.x);
        this.position.x = Math.max(this.position.x, 0);
        this.RepositionColliders();
        
        this.HandleCollisions(colliders);
    }

    
}