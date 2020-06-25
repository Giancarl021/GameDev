function createAnimatedSprite(src, spriteWidth, spriteHeight, spriteSheetWidth, spriteSheetHeight, delay, frameCount = spriteSheetHeight * spriteSheetWidth) {
    const frameWidth = src.width / spriteSheetWidth;
    const frameHeight = src.height / spriteSheetHeight;
    let dx = 0,
        dy = 0,
        i = 0,
        frame = 0;

    const coords = {};

    function draw(x, y) {
        coords.x = x;
        coords.y = y;
        image(src, x, y, spriteWidth, spriteHeight, dx, dy, frameWidth, frameHeight);
        if (i === delay) {
            i = 0;
            moveIndex();
        } else {
            i++;
        }
    }

    function moveIndex() {
        const d = (dx / frameWidth);

        if (frame === frameCount - 1) {
            dx = dy = frame = 0;
            return;
        }
        if (d === spriteSheetWidth - 1) {
            dx = 0;
            dy += frameHeight;
        } else {
            dx += frameWidth;
        }

        frame++;
    }

    return {
        draw,
        top: 0,
        left: 0,
        bottom: height - spriteHeight,
        right: width - spriteWidth,
        width: spriteWidth,
        height: spriteHeight,
        coords
    };
}