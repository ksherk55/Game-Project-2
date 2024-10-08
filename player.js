import { PhysicsObject } from "./physicsObject.js";

export class Player extends PhysicsObject {
    constructor(position, size, color, gravity, spawn = { x:0, y:0}) {
        super(position, size, color, gravity);
        this.jumpForce = -1600;
        this.movespeed = 550;
        this.spawn = spawn;
    }

    Update(colliders, input, deltaTime) {
        this.Move(input, colliders, deltaTime);

    }  

    Move(input, colliders, deltaTime) {
        if (input.includes(" ") && this.grounded) {
            
        this.velocity.y += this.jumpForce;
        this.grounded = false;
        } else {
            this.velocity.y += this.gravity * deltaTime;
        }
        if (input.includes("a")) this.velocity.x = -this.movespeed;
        else if (input.includes("d")) this.velocity.x = this.movespeed;
        else this.velocity.x = 0;

        
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        
        this.position.x = Math.min(this.position.x, 1500 - this.size.x);
        this.position.x = Math.max(this.position.x, 0);
        this.RepositionColliders();
        
        this.HandleCollisions(colliders);
    }

    Respawn() {
        this.position.x = this.spawn.x;
        this.position.y = this.spawn.y;
    }

    
}