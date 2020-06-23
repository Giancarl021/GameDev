function createBackground(src, speed) {

    let position = 0;

    function draw() {
        image(src, -position, 0, width, height);
        image(src, width - position, 0, width, height);
        updatePosition();
    }

    function updatePosition() {
        if(position + speed >= width) {
            position = position + speed - width;
        } else {
            position += speed;
        }
    }

    return {
        draw
    }
}