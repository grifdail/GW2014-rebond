define(["eventBus","libs/howler"], function(eventBus){
    "use strict";
    
    function loadAudio(fn) {
        var sounds = {
            "explosion":createAudio("audio/EXPLOSION.ogg",0.8),
            "tir":createAudio("audio/TIR.ogg"),
            "change_color":createAudio("audio/color_change.ogg"),
            "perso_blue":createAudio("audio/SOUND_SELECTION_BLEU.ogg",2),
            "perso_red":createAudio("audio/SOUND_SELECTION_ROUGE.ogg",2),
            "perso_yellow":createAudio("audio/SOUND_SELECTION_JAUNE.ogg",2),
            "perso_green":createAudio("audio/SOUND_SELECTION_VERT.ogg",2),
            "commentary1":createAudio("audio/COMMENTAIRES/commentaire1.ogg",3),
            "commentary2":createAudio("audio/COMMENTAIRES/commentaire2.ogg",3),
            "commentary3":createAudio("audio/COMMENTAIRES/commentaire3.ogg",3),
            "commentary4":createAudio("audio/COMMENTAIRES/commentaire4.ogg",3),
            "commentary5":createAudio("audio/COMMENTAIRES/commentaire5.ogg",3),
            "commentary6":createAudio("audio/COMMENTAIRES/commentaire6.ogg",3),
            "commentary7":createAudio("audio/COMMENTAIRES/commentaire7.ogg",3),
            "commentary8":createAudio("audio/COMMENTAIRES/commentaire8.ogg",3),
            "commentary9":createAudio("audio/COMMENTAIRES/commentaire9.ogg",3),
            "commentary10":createAudio("audio/COMMENTAIRES/commentaire10.ogg",3),
            "commentary11":createAudio("audio/COMMENTAIRES/commentaire13.ogg",3),
            "commentary12":createAudio("audio/COMMENTAIRES/commentaire14.ogg",3),
            "commentary13":createAudio("audio/COMMENTAIRES/commentaire15.ogg",3),
            "musicGame":createAudio("audio/musiques/MUSIQUE DE LA PARTIE.ogg",0.5),
            "musicMenu":createAudio("audio/musiques/MUSIQUE ECRAN TITRE+selectiondeperso.ogg",0.5),
        };

        eventBus.on("play explosion",function() {
            sounds.explosion.play();
        });

        eventBus.on("play sound",function(e) {
            sounds[e.sound].play();
        });

        var music = null;
        eventBus.on("play music",function(e) {
            if (e.sound === music) {
                return;
            }
            if (music) {
               sounds[music].fadeOut(0,1000) 
            }
            sounds[e.sound].loop = true;
            sounds[e.sound].fadeIn(1,1000);
            music = e.sound;
        });

        eventBus.on("play death commentary",function() {
            if (Math.random()>0.5) {
                return
            };
            var m = Math.floor(Math.random()*13+1);

            sounds["commentary"+m].play();
        });

        var audioToLoad = 0;
        function callback() {
            audioToLoad--;
            if (audioToLoad<=0) {
                fn();
            }
        }
        function createAudio(file,v) {
            var sound = new Howl({
              urls: [file],
              volume: v||1,
              onload: callback,
              onloaderror: callback
            });
            return sound;
        }
    }
    
    return loadAudio;

});