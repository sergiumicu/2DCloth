var size = 0;
var lastUpdate = 0;
var c;
var sW, sH;

const k = .00006;//elastic consant
const gravAcc = {"x": 0, "y": 9.81};

function handleResize(){
    var canv = document.getElementById("canv");
    sW = window.innerWidth;
    sH = window.innerHeight;
    var size = Math.min(sW, sH);
    canv.width = sW;
    canv.height = sH;

    var ctx = canv.getContext("2d");
    c = new Cloth(20, 10, sW, sH, size);

    lastUpdate = (new Date()).getTime();
    a = setInterval(()=>{update(ctx)}, 10);
}

function update(ctx){
    var now = (new Date()).getTime();
    var dt = now - lastUpdate;

    ctx.clearRect(0, 0, sW, sH);
    c.draw(ctx, "grey");

    for(var i = 0; i < c.width; i++) //apply gravity
        for(var j = 1; j < c.height; j++){
            var m1 = c.points[i][j].m;
            c.points[i][j].applyForce(gravAcc.x *m1, gravAcc.y *m1, dt);
    }

    c.lines.forEach(l => { //apply elastic forces
        var dl = l.getLength(c.points) - l.originalLength;

        var dx = c.points[l.x1][l.y1].x - c.points[l.x2][l.y2].x;
        var dy = c.points[l.x1][l.y1].y - c.points[l.x2][l.y2].y;

        var theta = Math.atan2(dx, dy);

        c.points[l.x2][l.y2].addAcceleration(k * dl * Math.sin(theta), k * dl * Math.cos(theta));
        c.points[l.x1][l.y1].addAcceleration( - k * dl * Math.sin(theta), - k * dl * Math.cos(theta));
    });

    lastUpdate = now;
}