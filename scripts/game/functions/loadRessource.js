define(["libs/utils"], function (utils){
	var loadRessourceOn = function(target){
		target.images = {};
		console.log(utils.httpGetData);
		var get = utils.httpGetData("scripts/config/images.json");
		for (var key in get){
			target.images[key] = new Image();
			target.images[key].src = get[key];
		}
	}

	return loadRessourceOn;
});
