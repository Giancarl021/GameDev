function createGame() {
    const assets = {};

    const floor = {
        drop: 30,
        player: 30,
        troll: 0,
        flyingDrop: 450
    };

    const x0 = {
        drop: 1,
        troll: 8,
        flyingDrop: 5
    }

    const delta = createDeltaController();
    const collider = createCollider();

    let background;
    let player;
    const enemies = {};

    function load() {
        assets.player = loadImage('../assets/imagens/personagem/correndo.png');
        assets.drop = loadImage('../assets/imagens/inimigos/gotinha.png');
        assets.troll = loadImage('../assets/imagens/inimigos/troll.png');
        assets.flyingDrop = loadImage('../assets/imagens/inimigos/gotinha-voadora.png');
        assets.background = loadImage('../assets/imagens/cenario/floresta.png');
        assets.backgroundMusic = loadSound('../assets/sons/trilha_jogo.mp3');
        assets.jumpSFX = loadSound('../assets/sons/somPulo.mp3');
    }

    function build() {
        background = createBackground(assets.background, 2);
        player = createAnimatedSprite(assets.player, 110, 135, 4, 4, 2);
        enemies.drop = createAnimatedSprite(assets.drop, 52, 52, 4, 7, 2);
        enemies.troll = createAnimatedSprite(assets.troll, 200, 200, 5, 6, 1, 28);
        enemies.flyingDrop = createAnimatedSprite(assets.flyingDrop, 72, 72, 3, 6, 2, 16);

        delta.add('player', player, 0, 0, 0, 3, 2);

        for (const key in enemies) {
            const enemy = enemies[key];
            delta.add(key, enemy, -enemy.width * x0[key], 0, 7, 2);
            collider.add(player, enemy, .7, true);
        }

        // collider.subscribe(() => noLoop());
        assets.backgroundMusic.loop();
    }

    function run() {
        background.draw();
        player.draw(player.left, (player.bottom - floor['player']) - delta.get('player').y);

        for (const key in enemies) {
            const enemy = enemies[key];
            enemy.draw(enemy.right - delta.get(key).x, enemy.bottom - (floor[key] || 0));
            delta.move(key, 'x');
        }

        collider.verify();
    }

    function interact(key) {
        switch (key) {
            case 'ArrowUp':
            case ' ':
                assets.jumpSFX.play();
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