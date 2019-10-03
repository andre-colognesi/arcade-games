function snake() {
    var stage = document.getElementById('canvas');
    var ctx = stage.getContext("2d");
    var dificult = "70";
    document.addEventListener("keydown", keyPush);
    var start = setInterval(game, dificult);
    const vel = 1;
    var playing = false;
    var direction;
    var vx = vy = 0;
    var px = 15;
    var py = 15;
    var tp = 20;
    var qp = 40;
    var ax = ay = 15;
    var trail = [];
    tail = 5;

    var links = document.getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', () => {
            clearInterval(start);
            let selected = document.getElementsByClassName("selected")[0];
            if (selected) {
                selected.classList.remove("selected");
            }
            links[i].classList.add("selected");
            die();
            playing = false;
            start = setInterval(game, links[i].getAttribute('data-value'));
        })
    }

    function game() {
        if (playing) {
            px += vx;
            py += vy;
            if (px < 0) {
                px = qp - 1;
            }
            if (px > qp - 1) {
                px = 0;
            }
            if (py < 0) {
                py = qp - 1;
            }
            if (py > qp - 1) {
                py = 0;
            }
        }
        ctx.fillStyle = "#600080";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = " #e62e00";
        ctx.fillRect(ax * tp, ay * tp, tp, tp);

        ctx.fillStyle = "#008000";
        for (let i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp - 2, tp - 2);

            if (trail[i].x == px && trail[i].y == py) {
                die()
                if (playing) {
                    alert('GAMVE OVER');
                    playing = false;
                }
                let score = document.getElementById('score');
                score.innerHTML = 0;
            }
        }

        trail.push({
            x: px,
            y: py
        });
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            let score = document.getElementById('score');
            let scoreValue = score.innerHTML;
            let value = parseInt(scoreValue);
            value++;
            score.innerHTML = value;
            ax = Math.floor(Math.random() * qp);
            ay = Math.floor(Math.random() * qp);
        }
    }

    function die() {
        vc = vy = 0;
        tail = 5;
    }

    function keyPush(event) {
        switch (event.keyCode) {
            case 37:
                if (direction == 39) {
                    return;
                }
                vx = -vel;
                vy = 0;
                playing = true;
                direction = 37;
                break;

            case 38:
                if (direction == 40) {
                    return;
                }
                vx = 0;
                vy = -vel;
                playing = true;
                direction = 38;
                break;

            case 39:
                if (direction == 37) {
                    return;
                }
                vx = vel;
                vy = 0;
                playing = true;
                direction = 39;
                break;

            case 40:
                if (direction == 38) {
                    return;
                }
                vx = 0;
                vy = vel;
                playing = true;
                direction = 40;
                break;
        }
    }
    console.log('');
}