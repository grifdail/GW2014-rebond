define([], function(){
	var Menu = function(){
		this.content = {};
		this.currentIndex = 0;
		this.currentMenu = "";
		this.currentContext;
	}
	Menu.prototype.getStartMenu = function	(context){
		this.content = {};
		this.content.basic = [];
		this.content.basic.push("Bienvenu", 50, 100, 100);
		this.content.basic.push("Test", 50, 100, 200);
		this.currentContext = context;

		context.font = '85px Impact';
		context.textAlign = 'center';
		context.fillStyle = '#000';
		context.fillText('Summer',250,100);
		context.fillText('is magic',250,180);


	}
	Menu.prototype.basicElement = function(text, size, x, y){
		var target = {};
		target.text = text;
		target.size
		target.x = x;
		target.y = y;
	}	
	Menu.prototype.render = function(){
		for (var i = 0, max = this.content[this.currentMenu].length ; i < max ; i++ ){
			var get = this.content[this.currentMenu][i];
			this.currentContext.fillText(get.text,get.x,get.y);
		}
	}
	return Menu;
});