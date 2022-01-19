const dotSize = 3;

class Cloth{
    constructor(width, height, canvasSize){
        this.width = width;
        this.height = height;
        this.size = Math.max(width, height);
        this.points = [];
        this.lines = [];

        var dx = dotSize + (canvasSize - canvasSize / this.size / 1.5 * (width - 1)) / 2;
        var dy = dotSize + (canvasSize - canvasSize / this.size / 1.5 * (height - 1)) / 2 * 0.5;

        for(var i = 0; i < width; i++){ //make points
            var temp = [];
            for(var j = 0; j < height; j++){
                var x = dx + i * canvasSize / this.size / 1.5;  
                var y = dy + j * canvasSize / this.size / 1.5;
                temp.push(new Point(x, y));
            }
            this.points.push(temp);
        }

        for(var i = 0; i < this.width; i++) //make lines
            for(var j = 0; j < this.height; j++){
                if((i + j) % 2)
                    continue;
                if(i + 1 < this.width)
                    this.lines.push(new Line(i, j, i+1, j, this.points));
                if(i - 1 >= 0)
                    this.lines.push(new Line(i, j, i-1, j, this.points));
                if(j + 1 < this.height)
                    this.lines.push(new Line(i, j, i, j+1, this.points));
                if(j - 1 >= 0)
                    this.lines.push(new Line(i, j, i, j-1, this.points));
            }
    }

    draw(ctx, color){
        this.lines.forEach((l)=>{//draw lines
            l.drawWithPoints(ctx, color, color, this.points);
        });
    }
}