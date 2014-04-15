define(['addEventCapabilities'], function(addEventCapabilities) {

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
			addEventCapabilities(Object.getPrototypeOf(target));

		this.group[name].content.push(target);	 
	}
	CollisionEngine.prototype.addHitbox = function(target, shape, offsetX, offsetY, width, height){
		if (!target.hitbox)
			target.hitbox = [];

		var hitbox = {};
		hitbox.shape = shape;
		hitbox.offsetX = offsetX || 0;
		hitbox.offsetY = offsetY || 0;
		if (shape == "circle")
			hitbox.radius = width;
		else{
			hitbox.width = width || target.width || 0;
			hitbox.height = height || target.height || 0;
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
				for (var j = target.hitbox.length -1 ; j >= 0 ; j--){			//Pour toutes les hitboxs de cet element
					targetHitbox = target.hitbox[j];
					for (var k = this.group[name].inBox.length - 1 ; k >= 0 ; k--){	//Pour tout les inBox de ce groupe
						if(this.isInBox(target.x, target.y, target.hitbox[j], this.group[name].inBox[k]))
							target.emit("inboxOut", this.group[name].inBox[k]);
						}
					}
					for (var m = this.group[name].target.length - 1 ; m >= 0 ; m--){
						var currentGroup = this.group[this.group[name].target[m]];
						for (var k = currentGroup.content.length - 1 ; k >= 0 ; k--){
							var opponent = currentGroup.content[k];
							if(opponent == undefined || opponent == null){
								currentGroup.content.splice(k,1);
								continue;
							}
							for (var l = opponent.hitbox.length - 1 ; l >= 0 ; l--){
								var opponentHitbox = opponent.hitbox[l];
								if(target.radius !== undefined && opponentHitbox.radius !== undefined){
									if(this.circleCollision(target, targetHitbox, opponent, opponentHitbox)){
										target.emit("collisionEnter", opponent);
									}
								}else if(target.radius !== undefined || opponentHitbox.radius !== undefined){

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
	CollisionEngine.prototype.isInBox = function(x, y, target, box){
		var box = this.box[box];
		var realX = x + target.offsetX;
		var realY = y + target.offsetY; 
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
		var aRealX = a.posX + hitboxA.offsetX;
		var aRealY = a.posY + hitboxA.offsetY;
		var bRealX = b.posX + hitboxB.offsetX;
		var bRealY = b.posY + hitboxB.offsetY;

		var norme = Math.sqrt(Math.pow(bRealX - aRealX, 2) + Math.pow(bRealY - aRealY, 2));
		return norme <= hitboxA.radius + hitboxB.radius;
	}

	CollisionEngine.prototype.circleRectCollision = function(a, hitboxA, b, hitboxB){
		var circleObject = {
			object : a,
			hitbox : hitboxA,
			realX : a.posX + hitboxA.offsetX,
			realY : a.posY + hitboxA.offsetY
		};
		var rectObject = {
			object : b,
			hitbox : hitboxB,
			realX : b.posX + hitboxB.offsetX,
			realY : b.posY + hitboxB.offsetY
		}
		if(hitboxA.radius !== undefined){
			var tmp = rectObject;
			var rectObject = circleObject;
			var circleObject = tmp;
		}

		//findClosestPoint
		var collisionPoint = {x : 0, y : 0};						
		if(circleObject.realX > rectObject.realX + rectObject.hitbox.width){
			collisionPoint.x = rectCollision.realX + rectObject.hitbox.width;
		}else if(circleObject.realX < rectObject.realX){
			collisionPoint.x = rectObject.realX;
		}else
			collisionPoint.x = circleObject.realX;
		if(circleObject.realY > rectObject.realY + rectObject.hitbox.height){
			collisionPoint.y = rectObject.realY + rectObject.hitbox.height;
		}else if(circleObject.realY < rectObject.realY){
			collisionPoint.y = rectObject.realY;
		}else
			collisionPoint.y = circleObject.realY;

		var distance = Math.sqrt(Math.pow(collisionPoint.x - circleObject.realX, 2) + Math.pow(collisionPoint.y - circleObject.realY, 2))
		return distance <= circleObject.hitbox.radius;
	}

	return new CollisionEngine();
});