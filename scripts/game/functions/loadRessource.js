define(["libs/utils", "game/functions/sprite", "game/functions/renderEngine","game/functions/audio"], function (utils, Sprite, RenderEngine,loadSound){
	var loadRessourceOn = function(callback){
		loadSound(function() {
			var loader = 0;

			var renderEngine = new RenderEngine();
			var once = true;
			var cb = function() {
				loader--;
				if (loader===0 && once) {
					changeLoader(true)
					once = false;
					callback();
				}
			}

			var get = utils.httpGetData("scripts/config/images.json");
			for (var key in get){
				loader++;
				renderEngine.addImage(key, get[key],cb);
			}

			var get = utils.httpGetData("scripts/config/sprites.json");
			for (var key in get){
				loader++;
				renderEngine.addSprite(key, get[key][0], get[key][1],cb);
			}
        });
	}

	return loadRessourceOn;
});
