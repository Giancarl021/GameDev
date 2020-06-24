function createAnimatedSprite(src, spriteWidth, spriteHeight, spriteSheetWidth, spriteSheetHeight, delay) {
    const frameWidth = src.width / spriteSheetWidth;
    const frameHeight = src.height / spriteSheetHeight;
    let dx = 0,
        dy = 0,
        i = 0;

    function draw(x, y) {
        image(src, x, y, spriteWidth, spriteHeight, dx, dy, frameWidth, frameHeight);
        if(i === delay) {
            i = 0;
            moveIndex();
        } else {
            i++;
        }
    }

    function moveIndex() {
        if((dx / frameWidth) === spriteSheetWidth - 1) {
            dx = 0;
            if((dy / frameHeight) === spriteSheetHeight - 1) {
                dy = 0;
            } else {
                dy += frameHeight;
            }
        } else {
            dx += frameWidth;
        }
    }

    return {
        draw,
        top: 0,
        left: 0,
        bottom: height - spriteHeight,
        right: width - spriteWidth,
        width: spriteWidth,
        height: spriteHeight
    };
}