define(["eventBus","libs/howler"], function(eventBus){
    "use strict";
    
    function loadAudio(fn) {
        var sounds = {
            "explosion":createAudio("audio/EXPLOSION.ogg",0.8),
            "tir":createAudio("audio/TIR.ogg"),
            "change_color":createAudio("audio/color_change.ogg"),
            "perso_blue":createAudio("audio/SOUND_SELECTION_BLEU.ogg"),
            "perso_red":createAudio("audio/SOUND_SELECTION_ROUGE.ogg"),
            "perso_yellow":createAudio("audio/SOUND_SELECTION_JAUNE.ogg"),
            "perso_green":createAudio("audio/SOUND_SELECTION_VERT.ogg"),
            "commentary1":createAudio("audio/COMMENTAIRES/commentaire1.ogg"),
            "commentary2":createAudio("audio/COMMENTAIRES/commentaire2.ogg"),
            "commentary3":createAudio("audio/COMMENTAIRES/commentaire3.ogg"),
            "commentary4":createAudio("audio/COMMENTAIRES/commentaire4.ogg"),
            "commentary5":createAudio("audio/COMMENTAIRES/commentaire5.ogg"),
            "commentary6":createAudio("audio/COMMENTAIRES/commentaire6.ogg"),
            "commentary7":createAudio("audio/COMMENTAIRES/commentaire7.ogg"),
            "commentary8":createAudio("audio/COMMENTAIRES/commentaire8.ogg"),
            "commentary9":createAudio("audio/COMMENTAIRES/commentaire9.ogg"),
            "commentary10":createAudio("audio/COMMENTAIRES/commentaire10.ogg"),
            "commentary11":createAudio("audio/COMMENTAIRES/commentaire13.ogg"),
            "commentary12":createAudio("audio/COMMENTAIRES/commentaire14.ogg"),
            "commentary13":createAudio("audio/COMMENTAIRES/commentaire15.ogg"),
        };

        eventBus.on("play explosion",function() {
            sounds.explosion.play();
        });

        eventBus.on("play sound",function(e) {
            sounds[e.sound].play();
        });

        eventBus.on("play death commentary",function() {
            if (Math.random()>0.33) {
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