define([], function (){
	var Sprite = function(image, config){
		for (var key in config)
			this.config[key] = config[key];
		this.image = new Image(image);
	}

	return Sprite;
});