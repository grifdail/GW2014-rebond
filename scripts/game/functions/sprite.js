define(["libs/utils"], function (utils){
	var Sprite = function(image, config){
		console.log("Hi");

		config = utils.httpGetData(config);
		this.animation = {};
		for (var name in config){
			this.animation[name] = {};
			for (var key in config[name])
				this.animation[name][key] = config[name][key];
		}
		this.image = new Image(image);
	}

	return Sprite;
});