define([],function (){

	return function addEventCapabilities(object){

		var listeners = {};

		object.prototype.on = function(e, callback, instance){
			if(!listeners[e])
				listeners[e] = [];
			listeners[e].push({callback : callback, instance : instance});
		}
		object.prototype.emit = function(e,arguments){
			if(!listeners[e]){
				return false;
			}
			for(var i = 0; i < listeners[e].length; i++){
				listeners[e][i].callback.apply(listeners[e][i].instance, arguments);
			}
		}

		object.prototype.stopOn = function(e, callback){
			if(listeners[e] != undefined){
				for(var i = 0; i < listeners[e].length; i++){
					if(listeners[e][i].toString() === callback.toString()){
						listeners[e].splice(i,1);
						i--;
						return true;
					}
				}
				return false;
			}
			return false;
		}
	}
})