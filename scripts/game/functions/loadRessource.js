define(["libs/utils", "game/functions/sprite"], function (utils, Sprite){
	var loadRessourceOn = function(target){
		target.images = {};
		target.sprites = {};

		var get = utils.httpGetData("scripts/config/images.json");
		for (var key in get){
			target.images[key] = new Image();
			target.images[key].src = get[key];
		}

		var get = utils.httpGetData("scripts/config/sprites.json");
		for (var key in get){
			target.sprites[key] = new Sprite(get[key][0], get[key][1]);
		}
	}

	return loadRessourceOn;
});
