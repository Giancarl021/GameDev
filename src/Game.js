function createGame() {
    const assets = {};

    const delta = createDeltaController();
    const collider = createCollider();

    let background;
    let player;
    let enemy;

    function load() {
        assets.player = loadImage('../assets/imagens/personagem/correndo.png');
        assets.enemy = loadImage('../assets/imagens/inimigos/gotinha.png');
        assets.background = loadImage('../assets/imagens/cenario/floresta.png');
        assets.backgroundMusic = loadSound('../assets/sons/trilha_jogo.mp3');
    }

    function build() {
        background = createBackground(assets.background, 2);
        player = createAnimatedSprite(assets.player, 110, 135, 4, 4, 2);
        enemy = createAnimatedSprite(assets.enemy, 52, 52, 4, 7, 2);

        delta.add('enemy', enemy, -enemy.width, 0, 5, 2);
        delta.add('player', player, 0, 0, 0, 3, 2);

        collider.add(player, enemy, .7, true);
        collider.subscribe(() => noLoop());
        assets.backgroundMusic.loop();
    }

    function run() {
        background.draw();
        player.draw(player.left, player.bottom - delta.get('player').y);
        enemy.draw(enemy.right - delta.get('enemy').x, enemy.bottom);
        collider.verify();
        delta.move('enemy', 'x');
    }

    function interact(key) {
        switch(key) {
            case 'ArrowUp':
            case ' ':
                delta.jump('player', 40);
                break;
        };
    }

    return {
        load,
        build,
        interact,
        run
    }
}