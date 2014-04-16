define(["game/functions/gamepad"], function (gamepad){

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
        if(gamepad.gamepads[1] && this.activePage === "playerSelect" && this.joueur2StartUp){
            if(gamepad.gamepads[1].state.START_FORWARD !== 0){
                joueur2StartUp = false;
                joueur2OK = !joueur2OK;
            }else{
                joueur2StartUp = true;
            }
        }
        if(gamepad.gamepads[2] && this.activePage === "playerSelect" && this.joueur3StartUp){
            if(gamepad.gamepads[2].state.START_FORWARD !== 0){
                joueur3StartUp = false;
                joueur3OK = !joueur2OK;
            }else{
                joueur3StartUp = true;
            }
        }
        if(gamepad.gamepads[3] && this.activePage === "playerSelect" && this.joueur4StartUp){
            if(gamepad.gamepads[3].state.START_FORWARD !== 0){
                joueur4StartUp = false;
                joueur4OK = !joueur2OK;
            }else{
                joueur4StartUp = true;
            }
        }
    }


    var menu = new MenuController();
    console.log(gamepad);
    // menu.gamepad.bind(Gamepad.EVENT.AXIS_CHANGED, function(e){
    //     console.log(e);
    // });

    return menu;

})