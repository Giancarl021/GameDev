function createPontuation(frameskip = 0) {
    let points = 0;
    let frame = 0;

    function add(value = 1) {
        points += value;
    }

    function subtract(value = 1) {
        points -= value;
    }

    function draw() {
        textAlign(RIGHT);
        stroke(0);
        fill(255);
        textSize(50);
        text(points, width - 30, 50);
    }

    function addFrame(value = 1) {
        if(frame < frameskip) {
            frame++;
            return;
        }
        frame = 0;
        add(value);
    }

    return {
        add,
        addFrame,
        subtract,
        draw
    };
}