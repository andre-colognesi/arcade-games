document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    class Pipe {
        tx = 400;
        ty = 0;
        th = 120;
        bh = 140;
        w = 80;
        bx = 400;
        by = 240;

        drawBottom() {
            ctx.fillRect(this.bx, this.by, this.w, this.bh)
        }


        drawTop() {
            ctx.fillStyle = "gray";
            ctx.fillRect(this.tx, this.ty, this.w, this.th)
        }

        draw() {
            this.drawTop();
            this.drawBottom();
        }

        move() {
            ctx.clearRect(this.tx, this.ty, this.w, this.th);
            ctx.clearRect(this.bx, this.by, this.w, this.bh);
            this.tx -= 1;
            this.bx -= 1;
            this.checkEnd();
            this.draw();
        }

        checkEnd() {
            if ((this.tx + this.w) == 0) {
                this.tx = 512;
                this.bx = 512;
                let rdn = Math.floor(Math.random() * 100);
                console.log(rdn);
                this.th = 120 - rdn;
                this.by = 240 - rdn;
            }
        }
    }

    class Bird {
        x = 100;
        y = 150;
        h = 40;
        w = 40;

        draw() {

            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.w, this.h);
        }

        move() {
            this.y += 1;
        }

        clear() {
            ctx.clearRect(this.x, this.y, this.w, this.h);
        }

        jump() {
            this.clear();
            this.y -= 50;
            ctx.fillRect(this.x, this.y, this.w, this.h)
        }

        checkCol(pipe) {

            if (this.x < pipe.tx + pipe.w && this.x + this.w > pipe.tx && this.y < pipe.ty + pipe.th && this.y + this.h > pipe.ty) {
                window.location.reload();
            }

            if (this.x < pipe.bx + pipe.w && this.x + this.w > pipe.bx && this.y < pipe.by + pipe.bh && this.y + this.h > pipe.by) {
                window.location.reload();
            }

            if (this.x == pipe.tx) {
                var score = document.getElementById('score');
                score.innerHTML = parseInt(score.innerHTML) + 1;
            }
        }
    };

    var bird = new Bird();
    var pipe = new Pipe();
    setInterval(() => {
        bird.clear();
        bird.move();
        bird.draw();
        pipe.move();
        bird.checkCol(pipe)
    }, 1000 / 170);

    document.addEventListener('keypress', (event) => {
        if (event.keyCode == 32) {
            bird.jump();
        }
    })


})