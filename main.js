import { InputHandler } from './input.js';
import { GameObject } from "./gameObject.js";
import { PhysicsObject } from "./physicsObject.js";

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.gameObjects = [];
            this.physicsObjects = [];
            this.collisionObjects = [];
        }

        update() {
            for (let i = 0; i < this.physicsObjects.length; i++) {
                this.physicsObjects[i].Update(this.collisionObjects);
            }
        }
        draw(ctx) {
            for (let i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].Draw(ctx);
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let g1 = new PhysicsObject({ x: 0, y: 0 }, { x: 50, y: 50 }, "Red", 1);
    let g2 = new GameObject({x:0, y: 450}, {x: 500, y: 50}, "Black");
    g1.velocity = {x:0, y: 1};
    game.gameObjects.push(g1);
    game.physicsObjects.push(g1);
    game.gameObjects.push(g2);
    game.collisionObjects.push(g2);
    console.log(game.collisionObjects[0]);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})