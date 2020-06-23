function createGame() {

    const assets = {};

    let background;
    let player;

    function load() {
        assets.player = loadImage('../assets/imagens/personagem/correndo.png');
        assets.background = loadImage('../assets/imagens/cenario/floresta.png');
        assets.backgroundMusic = loadSound('../assets/sons/trilha_jogo.mp3');
    }

    function build() {
        background = createBackground(assets.background, 2);
        player = createAnimatedSprite(assets.player, 110, 135, 220, 270, 4, 4, 2);
        assets.backgroundMusic.loop();
    }

    function run() {
        background.draw();
        player.draw(0, player.bottom);
    }

    return {
        load,
        build,
        run
    }
}