import { GameObject } from "./gameObject.js";
/**
 * 
 * Physics object class
 * represents objects to move based on a velocity
 * Contains a variable for postion (default {x: 0, y: 0}), size (default {x: 0, y: 0}),
 * color (default "Black"), and gravity (default 1, positive for downward gravity)
 */
export class PhysicsObject extends GameObject {
    constructor(position = {x:0, y:0}, size = {x:0, y:0}, color = "Black", gravity = 1) {
        super(position, size, color);
        this.velocity = {x:0, y:0};
        this.GenerateColliders();
        this.gravity = gravity;
        this.grounded = true;
    }

    GenerateColliders() {
        this.topCol = new GameObject(this.position, {x:this.size.x, y: .2 * this.size.y});
        this.botCol = new GameObject({x:this.position.x, y:this.position.y + this.size.y * .8}, {x:this.size.x, y: .2 * this.size.y});
    }

    Update(colliders) {
        
        this.Move();
        

    }

    Move() {
        this.velocity.y += this.gravity;
        let oldX = this.position.x;
        let oldY = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.position.x = Math.min([this.position.x, 1500 + this.size.x]);
        this.position.x = Math.max([this.position.x, 0]);
        this.RepositionColliders();
        this.HandleCollisions(colliders);
        this.RepositionColliders();
    }

    RepositionColliders() {
        this.topCol.position = this.position;
        this.botCol.position = {x:this.position.x, y:this.position.y + this.size.y * .8}
    }

    HandleCollisions(colliders) {
        var gflag = false;
        for (let i = 0; i < colliders.length; i++) {
            if (this.botCol.CheckCollision(colliders[i])) {
                let state = colliders[i].OnCollision(this, "B");
                if ( state == "grounded") {
                    gflag = true;
                } else if (state == "DEAD") {
                    return;
                }
                
                
            }
            if (this.topCol.CheckCollision(colliders[i])) {
                if (colliders[i].OnCollision(this, "T") == "DEAD") {
                    return;
                }
            }
        }

        this.grounded = gflag;
        
        

    }

}