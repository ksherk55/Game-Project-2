import { InputHandler } from './input.js';
import { GameObject } from "./gameObject.js";
import { PhysicsObject } from "./physicsObject.js";
import { Player } from './player.js';
import { DeathZone } from './deathZone.js';
import { Platform } from './platform.js';

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

        update(input, deltaTime) {
            for (let i = 0; i < this.physicsObjects.length; i++) {
                this.physicsObjects[i].Update(this.collisionObjects, input, deltaTime);
            }
        }
        draw(ctx) {
            for (let i = 0; i < this.gameObjects.length; i++) {
                this.gameObjects[i].Draw(ctx);
            }
        }
        addPlatform(pos, size, color) {
            let g = new Platform(pos, size, color);
            this.gameObjects.push(g);
            this.collisionObjects.push(g);
        }
        addPlayer(pos, size, color) {
            let g1 = new Player(pos, size, color, 7000, {x:pos.x, y:pos.y});
            game.gameObjects.push(g1);
            game.physicsObjects.push(g1);
        }
        addDeathZone(pos, size) {
            let g1 = new DeathZone(pos, size);
            this.collisionObjects.push(g1);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    game.addPlatform({x:0, y: 750}, {x: 240, y: 500}, "Black");
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
    game.addPlayer({ x: 100, y: 650 }, { x: 50, y: 50 }, "Red");
    game.addDeathZone({x:0, y: canvas.height}, {x: canvas.width, y: 50})
    let input = new InputHandler();

    let time = performance.now();
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltaTime = (performance.now() - time) / 1000;
        time = performance.now();
        game.update(input.keys, deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
})