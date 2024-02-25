import { InputHandler } from './input.js';
import { GameObject } from "./gameObject.js";
import { PhysicsObject } from "./physicsObject.js";
import { Player } from './player.js';

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    /**
     * Class that manages the game.
     * Width and height coorespond to the width and height of the game window
     * gameObjects contains all objects to be rendered
     * physicsObjects contains all objects to be updated
     * collisionObjects contains all objects that physics objects can collide with
     */
    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.gameObjects = [];
            this.physicsObjects = [];
            this.collisionObjects = [];
        }

        update(input) {
            for (let i = 0; i < this.physicsObjects.length; i++) {
                this.physicsObjects[i].Update(this.collisionObjects, input);
            }
        }
        draw(ctx) {
            for (let i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].Draw(ctx);
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let g1 = new Player({ x: 0, y: 0 }, { x: 50, y: 50 }, "Red", 1);
    let g2 = new GameObject({x:-25000, y: 450}, {x: 50000, y: 500}, "Black");
    g1.velocity = {x:0, y: 1};
    game.gameObjects.push(g1);
    game.physicsObjects.push(g1);
    game.gameObjects.push(g2);
    game.collisionObjects.push(g2);
    let input = new InputHandler();
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(input.keys);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})