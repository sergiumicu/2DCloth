const dampeningCoef = 0.0005;

class Point{
    constructor(x = 0, y = 0, m = 1){
        this.x = x;
        this.y = y;
        this.m = m;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
    }
    draw(ctx, color){
        var tempF = ctx.fillStyle;
        ctx.fillStyle = color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, dotSize, 0, 2 * Math.PI);
        ctx.fill();

        ctx.fillStyle = tempF;
    }
    addAcceleration(ax, ay){
        this.ax += ax;
        this.ay += ay;
    }
    applyForce(fx, fy, dt){
        this.ax += 0.00001 * fx/this.m - Math.sign(this.vx) * dampeningCoef * this.vx ** 2 * dt * this.m;
        this.ay += 0.00001 * fy/this.m - Math.sign(this.vy) * dampeningCoef * this.vy ** 2 * dt * this.m;
        
        this.vx += this.ax * dt;
        this.vy += this.ay * dt;
        
        this.x += this.vx * dt;
        this.y += this.vy * dt;

        this.ax = 0;
        this.ay = 0;
    }
}

class Line{
    constructor(x1, y1, x2, y2, pointVector){
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

        this.originalLength = this.getLength(pointVector);
    }
    getLength(pointVector){
        return Math.sqrt((pointVector[this.x1][this.y1].x - pointVector[this.x2][this.y2].x) ** 2 + 
                         (pointVector[this.x1][this.y1].y - pointVector[this.x2][this.y2].y) ** 2);
    }
    draw(ctx, color, pointVector){
        var tempS = ctx.strokeStyle;
        ctx.strokeStyle = color;

        ctx.beginPath();
        ctx.moveTo(pointVector[this.x1][this.y1].x, pointVector[this.x1][this.y1].y);
        ctx.lineTo(pointVector[this.x2][this.y2].x, pointVector[this.x2][this.y2].y);
        ctx.stroke();
    
        ctx.strokeStyle = tempS;
    }
    drawWithPoints(ctx, pcolor, lcolor, pointVector){
        this.draw(ctx, lcolor, pointVector);
        pointVector[this.x1][this.y1].draw(ctx, pcolor);
        pointVector[this.x2][this.y2].draw(ctx, pcolor);
    }
}