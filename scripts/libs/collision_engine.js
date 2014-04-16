define(['game/functions/add_event_capabilities'], function(addEventCapabilities) {

	var CollisionEngine = function(){
	}
	CollisionEngine.prototype.group = {};
	CollisionEngine.prototype.box = {};
	CollisionEngine.prototype.addGroup = function(name, target, box){
		if (!this.group[name]){
			this.group[name] = {};
			this.group[name].content = [];
			this.group[name].target = target || [];
			this.group[name].inBox = box || [];
		}
	}
	CollisionEngine.prototype.addElement = function(target, name){
		if (!this.group[name])
			this.addGroup(name);

		if (!target.hitbox)
			this.addHitbox(target);

		if(target.on == undefined || target.emit == undefined)
			addEventCapabilities(target);

		this.group[name].content.push(target);	 
	}

	CollisionEngine.prototype.removeElement = function(target, name){
		this.group[name].content.splice(this.group[name].content.indexOf(target));
	}



	CollisionEngine.prototype.addHitbox = function(target, shape, offsetX, offsetY, width, height){
		if (!target.hitbox)
			target.hitbox = [];

		var hitbox = {};
		hitbox.shape = shape || "rect";
		if (shape == "circle")
			hitbox.radius = width / 2;
		else{
			hitbox.width = width || target.width || 0;
			hitbox.height = height || target.height || 0;
		}
		if(hitbox.shape == "circle"){
			hitbox.offsetX = hitbox.radius;
			hitbox.offsetY = hitbox.radius;
		}else{
			hitbox.offsetX = offsetX || 0;
			hitbox.offsetY = offsetY || 0;
		}
		target.hitbox.push(hitbox);
	}
	CollisionEngine.prototype.addBox = function(name, target){
		if (!this.box[name]){
			this.box[name] = {};
			this.box[name].x = target.x || target.posX || 0;
			this.box[name].y = target.y || target.posY || 0;
			this.box[name].width = target.width;
			this.box[name].height = target.height;	
			this.box[name].name = name;
		}
	}
	CollisionEngine.prototype.calcul = function(context){
		for (var name in this.group){											//Pour tous les groupes
			for (var i = this.group[name].content.length - 1; i >= 0; i--) {	//Pour tous les elements du groupe
				var target = this.group[name].content[i];

				if(target === undefined || target === null){
					this.group[name].content.splice(i,1);
					continue;
				}
				if (!target.actife) {
					continue;
				}
				for (var j = target.hitbox.length -1 ; j >= 0 ; j--){			//Pour toutes les hitboxs de cet element
					targetHitbox = target.hitbox[j];
					for (var k = this.group[name].inBox.length - 1 ; k >= 0 ; k--){	//Pour tout les inBox de ce groupe
						var outDirection = this.isInBox(target.pos.x, target.pos.y, target.hitbox[j], this.group[name].inBox[k]);
						if(outDirection){
							target.emit("inboxOut", this.box[this.group[name].inBox[k]], outDirection);
						}
					}
					for (var m = this.group[name].target.length - 1 ; m >= 0 ; m--){
						var currentGroup = this.group[this.group[name].target[m]];
						for (var k = currentGroup.content.length - 1 ; k >= 0 ; k--){
							var opponent = currentGroup.content[k];
							
							if(opponent === target)
								continue;
							if(opponent == undefined || opponent == null){
								currentGroup.content.splice(k,1);
								continue;
							}
							if (!opponent.actife) {
								continue;
							}
							for (var l = opponent.hitbox.length - 1 ; l >= 0 ; l--){
								var opponentHitbox = opponent.hitbox[l];
								if(target.radius !== undefined && opponentHitbox.radius !== undefined){
									if(this.circleCollision(target, targetHitbox, opponent, opponentHitbox)){
										target.emit("collisionEnter", opponent);
									}
								}else if(target.radius !== undefined || opponentHitbox.radius !== undefined){
									var collisionPoint = this.circleRectCollision(target, targetHitbox, opponent, opponentHitbox);
									if(collisionPoint !== null){
										target.emit("collisionEnter", opponent, collisionPoint);
									}
								}
								if (this.rectCollision(target, targetHitbox, opponent, opponentHitbox)){
									target.emit("collisionEnter", opponent);
								}
							}
						}
					}
				}
			}
		}
	}
	CollisionEngine.prototype.isInBox = function (x, y, target, box){
		var box = this.box[box];

		var realX = x + target.offsetX;
		var realY = y + target.offsetY; 

		if(target.shape == "circle"){
			if(realX < box.x)
				return "left";
			if(realX + target.radius > box.x + box.width)
				return "right";
			if (realY < box.y)
				return "up";
			if ((realY + target.radius > box.y + box.height))
				return "down";
			else
				return false;
		}else{
			if ( realX < box.x)
				return "left";
			if ((realX + target.width) > (box.x + box.width))
				return "right";
			if (realY < box.y)
				return "up";
			if ((realY + target.height > box.y + box.height))
				return "down";
			
			return false;
		}
	}
	CollisionEngine.prototype.rectCollision = function(a, aHitbox, b, bHitbox){
		var aRealX = a.posX + aHitbox.offsetX;
		var aRealY = a.posY + aHitbox.offsetY;
		var bRealX = b.posX + bHitbox.offsetX;
		var bRealY = b.posY + bHitbox.offsetY;
		if ( aRealX + aHitbox.width > bRealX &&
			aRealX < bRealX + bHitbox.width &&
			aRealY + aHitbox.height > bRealY &&
			aRealY < bRealY + bHitbox.height)
			return true
	}

	CollisionEngine.prototype.circleCollision = function(a, hitboxA, b, hitboxB){
		var aRealX = a.pos.x + hitboxA.offsetX;
		var aRealY = a.pos.y + hitboxA.offsetY;
		var bRealX = b.pos.x + hitboxB.offsetX;
		var bRealY = b.pos.y + hitboxB.offsetY;

		var norme = Math.sqrt(Math.pow(bRealX - aRealX, 2) + Math.pow(bRealY - aRealY, 2));
		return norme <= hitboxA.radius + hitboxB.radius;
	}

	CollisionEngine.prototype.circleRectCollision = function(a, hitboxA, b, hitboxB){
		var circleObject = {
			object : a,
			hitbox : hitboxA,
			realX : a.pos.x + hitboxA.offsetX,
			realY : a.pos.y + hitboxA.offsetY
		};
		var rectObject = {
			object : b,
			hitbox : hitboxB,
			realX : b.pos.x + hitboxB.offsetX,
			realY : b.pos.y + hitboxB.offsetY
		}
		if(hitboxA.radius === undefined){
			var tmp = rectObject;
			var rectObject = circleObject;
			var circleObject = tmp;
		}

		//findClosestPoint
		var collisionPoint = {x : 0, y : 0};	
		if(circleObject.realX > rectObject.realX + rectObject.hitbox.width){
			collisionPoint.x = rectObject.realX + rectObject.hitbox.width;
		}else if(circleObject.realX < rectObject.realX){
			collisionPoint.x = rectObject.realX;
		}else{
			collisionPoint.x = circleObject.realX;
		}
		if(circleObject.realY > rectObject.realY + rectObject.hitbox.height){
			collisionPoint.y = rectObject.realY + rectObject.hitbox.height;
		}else if(circleObject.realY < rectObject.realY){
			collisionPoint.y = rectObject.realY;
		}else{
			collisionPoint.y = circleObject.realY;
		}

		var distanceSqr = Math.pow(collisionPoint.x - circleObject.realX, 2) + Math.pow(collisionPoint.y - circleObject.realY, 2);

		if(distanceSqr <= (circleObject.hitbox.radius ) * (circleObject.hitbox.radius)){
			return collisionPoint;
		}else 
			return null; 
	}

	CollisionEngine.prototype.render = function(context){
		context.fillStyle = "rgba(255,255,255,0.5";
		for (var name in this.group){
			for (var i = this.group[name].content.length - 1; i >= 0; i--) {
				var target = this.group[name].content[i];
				for (var j = target.hitbox.length -1 ; j >= 0 ; j--){
					var targetHitbox = target.hitbox[j];
					if (target.radius){
						context.beginPath();
						context.arc(target.pos.x+targetHitbox.offsetX, target.pos.y+targetHitbox.offsetY, targetHitbox.radius, 0, 2 * Math.PI);
						context.fill();
					}
					else{
						context.fillRect(target.pos.x + targetHitbox.offsetX, target.pos.y + targetHitbox.offsetY, targetHitbox.width, targetHitbox.height);
					}
				}
			};
		}
	}

	return new CollisionEngine();
});