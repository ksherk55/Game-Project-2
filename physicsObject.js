import { GameObject } from "./gameObject.js";

export class PhysicsObject extends GameObject {
    constructor(position, size, color, gravity) {
        super(position, size, color);
        this.velocity = {x:0, y:0};
        this.GenerateColliders();
        this.gravity = gravity;
    }

    GenerateColliders() {
        this.topCol = new GameObject(this.position, {x:this.size.x, y: .2 * this.size.y});
        this.botCol = new GameObject({x:this.position.x, y:this.position.y + this.size.y * .8}, {x:this.size.x, y: .2 * this.size.y});
    }

    Update(colliders) {
        this.HandleCollisions(colliders);
        this.Move();
        this.RepositionColliders();

    }

    Move() {
        this.velocity.y += this.gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    RepositionColliders() {
        this.topCol.position = this.position;
        this.botCol.position = {x:this.position.x, y:this.position.y + this.size.y * .8}
    }

    HandleCollisions(colliders) {
        for (let i = 0; i < colliders.length; i++) {
            if (this.botCol.CheckCollision(colliders[i])) {
                this.position.y = colliders[i].position.y - this.size.y;
                this.velocity.y = 0;
                break;
            }
            if (this.topCol.CheckCollision(colliders[i])) {
                this.position.y = colliders[i].position.y + colliders[i].size.y;
                this.velocity.y = 0;
                break;
            }
        }
        

    }

}