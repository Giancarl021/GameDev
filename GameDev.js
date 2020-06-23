const game = createGame();

function preload() {
    game.load();
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    game.build();
}


function draw() {
    game.run();
}
