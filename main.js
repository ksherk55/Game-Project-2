import { InputHandler } from './input.js';
import { GameObject } from "./gameObject.js";
import { PhysicsObject } from "./physicsObject.js";
import { Player } from './player.js';

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 800;

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
        addPlatform(pos, size, color) {
            let g = new GameObject(pos, size, color);
            this.gameObjects.push(g);
            this.collisionObjects.push(g);
        }
        addPlayer(pos, size, color) {
            let g1 = new Player(pos, size, color, 1);
            game.gameObjects.push(g1);
            game.physicsObjects.push(g1);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let g1 = new Player({ x: 0, y: 0 }, { x: 50, y: 50 }, "Red", 1);
    game.addPlatform({x:-25000, y: 750}, {x: 50000, y: 500}, "Black");
    game.addPlatform({x:200, y: 600}, {x: 300, y: 50}, "Black");
    game.addPlatform({x:600, y: 450}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:850, y: 450}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:1100, y: 450}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:1350, y: 450}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:1475, y: 300}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:1225, y: 150}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:975, y: 150}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:725, y: 150}, {x: 50, y: 50}, "Black");
    game.addPlatform({x:200, y: 150}, {x: 300, y: 50}, "Black");
    game.addPlayer({ x: 0, y: 0 }, { x: 50, y: 50 }, "Red");
    let input = new InputHandler();
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(input.keys);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})