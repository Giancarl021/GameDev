const game = createGame();

function preload() {
    game.load();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    game.build();
}

function keyPressed() {
    game.interact(key);
}

function draw() {
    game.run();
}