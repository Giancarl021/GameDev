function createDeltaController() {
    const delta = {};

    function add(key, object, x0, y0, speed, gravity = 0, maxJumps = null) {
        delta[key] = {
            object,
            initial: {
                x: x0,
                y: y0
            },
            coords: {
                x: x0,
                y: y0
            },
            speed,
            gravity,
            jump: {
                speed: 0,
                iterations: 0,
                maximum: maxJumps
            }
        }
    }

    function get(key) {
        gravity(key);
        return delta[key].coords;
    }

    function move(key, axis) {
        const entity = delta[key];
        if (entity.coords[axis] >= width + entity.object.width) {
            entity.coords[axis] = entity.initial.x;
        } else {
            entity.coords[axis] += entity.speed;
        }
    }

    function jump(key, height) {
        const entity = delta[key];
        if(entity.jump.iterations >= entity.jump.maximum) return;
        entity.jump.speed = height;
        entity.jump.iterations++;
    }

    function gravity(key) {
        const entity = delta[key];
        entity.coords.y += entity.jump.speed;
        entity.jump.speed -= entity.gravity;

        if(entity.coords.y <= entity.initial.y) {
            entity.jump.iterations = 0;
            entity.coords.y = entity.initial.y;
            return;
        }
    }

    return {
        move,
        jump,
        add,
        get
    }
}