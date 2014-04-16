define([],function (){

	return function addEventCapabilities(object){

		object.listeners = {};

		object.on = function(e, callback, instance){
			if(!this.listeners[e])
				this.listeners[e] = [];
			this.listeners[e].push({callback : callback, instance : instance});
		}
		object.emit = function(){
			var args = Array.prototype.slice.call(arguments);
			var e = args.shift();
			if(!this.listeners[e]){
				return false;
			}
			for(var i = 0; i < this.listeners[e].length; i++){
				this.listeners[e][i].callback.apply(this.listeners[e][i].instance || object, args);
			}
		}

		object.stopOn = function(e, callback){
			if(this.listeners[e] != undefined){
				for(var i = 0; i < this.listeners[e].length; i++){
					if(this.listeners[e][i].toString() === callback.toString()){
						this.listeners[e].splice(i,1);
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