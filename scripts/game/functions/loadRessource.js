define(["libs/utils", "game/functions/sprite", "game/functions/renderEngine"], function (utils, Sprite, RenderEngine){
	var loadRessourceOn = function(target){
		target.images = {};
		target.sprites = {};

		var renderEngine = new RenderEngine();

		var get = utils.httpGetData("scripts/config/images.json");
		for (var key in get){
			renderEngine.addImage(key, get[key]);
		}

		var get = utils.httpGetData("scripts/config/sprites.json");
		for (var key in get){
			target.sprites[key] = new Sprite(get[key][0], get[key][1]);
		}
	}

	return loadRessourceOn;
});
