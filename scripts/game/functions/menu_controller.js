define(["game/functions/gamepad", "Game"], function (gamepad, Game){

    var MenuController = function (){
        this.pages = {};
        this.activePage = "";
        this.newMove = true;
        this.joueur1StartUp = true;
        this.joueur1OK = true;
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
                if(gamepad.gamepads[0].state.START_FORWARD == 0){
                    this.joueur1StartUp = true;
                }
            }else{
                if(gamepad.gamepads[0].state.START_FORWARD != 0){
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
        if(gamepad.gamepads[1] && this.activePage === "playerSelect" ){
            if(gamepad.gamepads[1].state.START_FORWARD !== 0 && this.joueur2StartUp){
                this.joueur2StartUp = false;
                this.joueur2OK = !this.joueur2OK;
                this.pages[this.activePage].elements.perso2.metamorph(this.joueur2OK);
                this.pages[this.activePage].elements.perso2btn.metamorph(this.joueur2OK);
            }else if (gamepad.gamepads[1].state.START_FORWARD === 0){
                this.joueur2StartUp = true;
            }
        }
        if(gamepad.gamepads[2] && this.activePage === "playerSelect"){
            if(gamepad.gamepads[2].state.START_FORWARD !== 0 && this.joueur3StartUp){
                this.joueur3StartUp = false;
                this.joueur3OK = !this.joueur2OK;
                this.pages[this.activePage].elements.perso3.metamorph(this.joueur3OK);
            }else if(gamepad.gamepads[2].state.START_FORWARD === 0){
                this.joueur3StartUp = true;
            }
        }
        if(gamepad.gamepads[3] && this.activePage === "playerSelect"){
            if(gamepad.gamepads[3].state.START_FORWARD !== 0 && this.joueur4StartUp){
                this.joueur4StartUp = false;
                this.joueur4OK = !this.joueur2OK;
                this.pages[this.activePage].elements.perso4.metamorph(this.joueur4OK);
            }else if(gamepad.gamepads[3].state.START_FORWARD === 0){
                this.joueur4StartUp = true;
            }
        }
    }

    MenuController.prototype.bulbizarre = function (){
        Game.startGame([this.joueur1OK, this.joueur2OK, this.joueur3OK, this.joueur4OK]);
    }

    MenuController.prototype.mimeJr = function (){
        Game.startGame([this.joueur1OK, this.joueur2OK, this.joueur3OK, this.joueur4OK]);
    }

    MenuController.prototype.abra = function (){
        this.joueur1OK = true;
        this.joueur2OK = false;
        this.joueur3OK = false;
        this.joueur4OK = false;
        this.activePage = "playerSelect";
    }

    var menu = new MenuController();

    return menu;

})