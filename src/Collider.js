function createCollider() {

    const collide = [];
    const subscriptions = [];

    function add(entity, withEntity, precision = 1, showHitbox = false) {
        collide.push({
            entity,
            withEntity,
            precision,
            hitbox: showHitbox
        });
    }

    function subscribe(fn) {
        subscriptions.push(fn);
    }

    function notify(...args) {
        subscriptions.forEach(fn => fn(...args));
    }

    function verify() {
        collide.forEach(data => {
            if (isColliding(data.entity, data.withEntity, data.precision, data.hitbox)) notify(data.entity, data.withEntity);
        });
    }

    function isColliding(entity, withEntity, precision, showHitbox) {
        if(showHitbox) {
            noFill();
            stroke(255, 0, 0);
            rect(
                entity.coords.x,
                entity.coords.y,
                entity.width,
                entity.height,
            );
    
            rect(
                withEntity.coords.x,
                withEntity.coords.y,
                withEntity.width,
                withEntity.height
            );
        }

        return collideRectRect(
            entity.coords.x,
            entity.coords.y,
            entity.width * precision,
            entity.height * precision,
            withEntity.coords.x,
            withEntity.coords.y,
            withEntity.width * precision,
            withEntity.height * precision
        );
    }

    return {
        add,
        verify,
        subscribe
    };
}