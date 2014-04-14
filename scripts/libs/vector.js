
window.Vector = (function() {
        function Vector(x,y) {
            this.x = x || 0;
            this.y = y || 0;
        }

        Vector.prototype.add = function(vec) {
            this.x += vec.x;
            this.y += vec.y;
            return this;
        };

        Vector.prototype.scale = function(factor) {
            this.x *= factor;
            this.y *= factor;
            return this;
        };

        Vector.prototype.setLength = function(l) {
            var oldLenght = this.length();
            this.x = l*this.x/oldLenght;
            this.y = l*this.y/oldLenght;
            return this;
        };

        Vector.prototype.length = function() {
            return Math.sqrt(this.x*this.x+this.y*this.y);
        };

        Vector.prototype.to = function(vec) {
            return new Vector(vec.x-this.x, vec.y-this.y);
        };

        Vector.prototype.set = function(vec) {
            this.x = vec.x;
            this.y = vec.y;
            return this;
        };

        Vector.prototype.clone = function() {
            return new Vector(this.x,this.y);
        };

        Vector.prototype.addLength = function(l) {
            var oldLenght = this.length();
            this.x += l*this.x/oldLenght;
            this.y += l*this.y/oldLenght;
            return this;
        };

        Vector.prototype.dotProduct = function(vec) {
            //If this is a unit vector, dot product = cos between the two vector;
            return this.x*vec.x+this.y*vec.y;
        };

        Vector.prototype.angleBetween = function(vec) {
         return Math.acos(this.dotProduct(vec));
        };

        Vector.prototype.normal = function() {
            return new Vector(-this.y,this.x);
        };

        Vector.prototype.unit = function() {
            var l = this.length;
            if (l===0) {
                return new Vector(0,0);
            }
            return new Vector(this.x/l,this.y/l);
        };

        Vector.prototype.project = function(vec) {
            //Return a number between 0 and 1 (more if vec > this)
            return this.dotProduct(vec)/this.dotProduct(this);
        };

        Vector.prototype.toString = function() {
            return "{x: "+this.x.toFixed(3)+", y: "+this.y.toFixed(3)+" }";
        };

        Vector.prototype.wedge= function(vec) {
            return this.x*vec.y-vec.x*this.y;
        };

        Vector.prototype.rotate = function(angle) {
            var c = Math.cos(angle);
            var s = Math.sin(angle);
            var nx = this.x*c+this.y*s;
            var ny = this.y*c-this.x*s;
            this.x = nx;
            this.y = ny;
            return this;
        };

        Vector.prototype.toSpace = function(xAxis) {
            //We supose that xAxis is a unit vector;
            var yAxis = xAxis.normal();
            return new Vector(xAxis.dotProduct(this),yAxis.dotProduct(this));
        };

        Vector.prototype.fromSpace = function(xAxis) {
            var yAxis = xAxis.normal();
            return new Vector(this.x*xAxis.x+this.y*yAxis.x,this.x*xAxis.y,this.y*yAxis.y);
        };

        Vector.prototype.applyMatrix = function(m) {
            var nx = this.x*m[0]+this.y*m[1];
            var ny = this.x*m[2]+this.y*m[3];
            this.x = nx;
            this.y = ny;
        };

        return Vector;
    })();