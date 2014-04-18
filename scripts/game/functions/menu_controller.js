define(["game/functions/gamepad", "Game", "eventBus"], function (gamepad, Game, eventBus){
    var MenuController = function (){
        console.log(gamepad);
        this.pages = {};
        this.activePage = "";
        this.newMove = true;
        this.joueur1StartUp = true;
        this.joueur1OK = false;
        this.joueur2StartUp = true;
        this.joueur2OK = false;
        this.joueur3StartUp = true;
        this.joueur3OK = false;
        this.joueur4StartUp = true;
        this.joueur4OK = false;
    }

    MenuController.prototype.addPage = function (page){
        this.pages[page.name] = page;
    }

    MenuController.prototype.control = function (){
        if(gamepad.gamepads[0]){
            if(!this.joueur1StartUp){
                if(gamepad.gamepads[0].state.FACE_1 == 0 && gamepad.gamepads[0].state.START_FORWARD == 0){
                    this.joueur1StartUp = true;
                }
            }else{
                if(gamepad.gamepads[0].state.FACE_1 != 0){
                    console.log("hello");
                    this.joueur1StartUp = false;
                    if(this.pages[this.activePage].activeElement.callback)
                        this.pages[this.activePage].activeElement.callback();
                }
            }
            if(!this.newMove){
                if((gamepad.gamepads[0].state.LEFT_STICK_X <= 0.2 && gamepad.gamepads[0].state.LEFT_STICK_X >= -0.2)
                && (gamepad.gamepads[0].state.LEFT_STICK_Y <= 0.2 && gamepad.gamepads[0].state.LEFT_STICK_Y >= -0.2)){
                    this.newMove = true;
                }
            }else{
                if(gamepad.gamepads[0].state.LEFT_STICK_X > 0.8){
                    if(this.pages[this.activePage].activeElement.right){
                        this.newMove = false;
                        this.pages[this.activePage].SetActiveElement(this.pages[this.activePage].activeElement.right);
                    }
                }else if(gamepad.gamepads[0].state.LEFT_STICK_X < -0.8){
                    if(this.pages[this.activePage].activeElement.left){
                        this.newMove = false;
                        this.pages[this.activePage].SetActiveElement(this.pages[this.activePage].activeElement.left);
                    }
                }else if(gamepad.gamepads[0].state.LEFT_STICK_Y > 0.8){
                    if(this.pages[this.activePage].activeElement.down){
                        this.newMove = false;
                        this.pages[this.activePage].SetActiveElement(this.pages[this.activePage].activeElement.down);
                    }
                }else if(gamepad.gamepads[0].state.LEFT_STICK_Y < -0.8){
                    if(this.pages[this.activePage].activeElement.up){
                        this.newMove = false;
                        this.pages[this.activePage].SetActiveElement(this.pages[this.activePage].activeElement.up);
                    }
                }
            }
        }
        if(gamepad.gamepads[0] && this.activePage === "playerSelect" ){
            if((gamepad.gamepads[0].state.START_FORWARD !== 0) && this.joueur1StartUp){
                this.joueur1StartUp = false;
                this.joueur1OK = !this.joueur1OK;
                this.pages[this.activePage].elements.perso1.metamorph(this.joueur1OK);
                if(this.joueur1OK){
                    eventBus.emit("play sound", {sound : "perso_blue"});
                }
            }else if (gamepad.gamepads[0].state.START_FORWARD === 0 && gamepad.gamepads[0].state.FACE_1 == 0){
                this.joueur1StartUp = true;
            }
        }
        if(gamepad.gamepads[0] && this.activePage === "pause" ){
            if((gamepad.gamepads[0].state.START_FORWARD !== 0) && this.joueur1StartUp){
                this.joueur1StartUp = false;
                Game.startState("game");
            }else if (gamepad.gamepads[0].state.START_FORWARD === 0 && gamepad.gamepads[0].state.FACE_1 == 0){
                this.joueur1StartUp = true;
            }
        }
        if(gamepad.gamepads[1] && this.activePage === "playerSelect" ){
            if((gamepad.gamepads[1].state.START_FORWARD !== 0) && this.joueur2StartUp){
                this.joueur2StartUp = false;
                this.joueur2OK = !this.joueur2OK;
                this.pages[this.activePage].elements.perso2.metamorph(this.joueur2OK);
                if(this.joueur2OK){
                    eventBus.emit("play sound", {sound : "perso_red"});
                }
            }else if (gamepad.gamepads[1].state.START_FORWARD === 0 && gamepad.gamepads[1].state.FACE_1 == 0){
                this.joueur2StartUp = true;
            }
        }
        if(gamepad.gamepads[2] && this.activePage === "playerSelect"){
            if((gamepad.gamepads[2].state.START_FORWARD !== 0) && this.joueur3StartUp){
                this.joueur3StartUp = false;
                this.joueur3OK = !this.joueur3OK;
                this.pages[this.activePage].elements.perso3.metamorph(this.joueur3OK);
                if(this.joueur3OK){
                    eventBus.emit("play sound", {sound : "perso_yellow"});
                }
            }else if(gamepad.gamepads[2].state.START_FORWARD === 0 && gamepad.gamepads[2].state.FACE_1 == 0){
                this.joueur3StartUp = true;
            }
        }
        if(gamepad.gamepads[3] && this.activePage === "playerSelect"){
            if((gamepad.gamepads[3].state.START_FORWARD !== 0) && this.joueur4StartUp){
                this.joueur4StartUp = false;
                this.joueur4OK = !this.joueur4OK;
                this.pages[this.activePage].elements.perso4.metamorph(this.joueur4OK);
                if(this.joueur4OK){
                    eventBus.emit("play sound", {sound : "perso_green"});
                }
            }else if(gamepad.gamepads[3].state.START_FORWARD === 0 && gamepad.gamepads[3].state.FACE_1 == 0){
                this.joueur4StartUp = true;
            }
        }
    }

    MenuController.prototype.start = function (){
        var joueursOk = [this.joueur1OK, this.joueur2OK, this.joueur3OK, this.joueur4OK];
        var okNb = 0;
        for(var i = 0; i < joueursOk.length; i++){
            if(joueursOk[i])
                okNb++;
        }
        //if(okNb >= 2)
            Game.startGame(joueursOk);
    }

    MenuController.prototype.again = function (){
        Game.startGame([this.joueur1OK, this.joueur2OK, this.joueur3OK, this.joueur4OK]);
    }

    MenuController.prototype.back = function (){
        this.joueur1OK = true;
        this.joueur2OK = false;
        this.joueur3OK = false;
        this.joueur4OK = false;
        for(var elem in this.pages["playerSelect"].elements){
            if(this.pages["playerSelect"].elements[elem].sprite){
                this.pages["playerSelect"].elements[elem].sprite.image = this.pages["playerSelect"].elements[elem].normalImage;
            }
        }
        this.activePage = "pressStartPage";
    }

    var menu = new MenuController();

    return menu;

})