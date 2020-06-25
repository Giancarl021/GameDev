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
        const delta = {
            entity: {
                width: (entity.width - entity.width * precision) / 2,
                height: (entity.height - entity.height * precision) / 2
            },
            withEntity: {
                width: (withEntity.width - withEntity.width * precision) / 2,
                height: (withEntity.height - withEntity.height * precision) / 2
            }
        };

        if (showHitbox) {
            noFill();
            stroke(255, 0, 0);
            rect(
                entity.coords.x,
                entity.coords.y,
                entity.width,
                entity.height
            );

            rect(
                withEntity.coords.x,
                withEntity.coords.y,
                withEntity.width,
                withEntity.height
            );
            stroke(0, 0, 255);
            rect(
                entity.coords.x + delta.entity.width,
                entity.coords.y + delta.entity.height,
                entity.width * precision,
                entity.height * precision
            );

            rect(
                withEntity.coords.x + delta.withEntity.width,
                withEntity.coords.y + delta.withEntity.height,
                withEntity.width * precision,
                withEntity.height * precision
            );
        }

        return collideRectRect(
            entity.coords.x + delta.entity.width,
            entity.coords.y + delta.entity.height,
            entity.width * precision,
            entity.height * precision,
            withEntity.coords.x + delta.withEntity.width,
            withEntity.coords.y + delta.withEntity.height,
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