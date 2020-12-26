/*! keydrown - v1.2.7 - 2018-12-19 - http://jeremyckahn.github.com/keydrown */
!function(a){var f=function(){var n={forEach:function(n,e){var t;for(t in n)n.hasOwnProperty(t)&&e(n[t],t)}},e=n.forEach;n.getTranspose=function(n){var t={};return e(n,function(n,e){t[n]=e}),t},n.indexOf=function(n,e){if(n.indexOf)return n.indexOf(e);var t,o=n.length;for(t=0;t<o;t++)if(n[t]===e)return t;return-1};var o=n.indexOf;return n.pushUnique=function(n,e){return-1===o(n,e)&&(n.push(e),!0)},n.removeValue=function(n,e){var t=o(n,e);if(-1!==t)return n.splice(t,1)[0]},n.documentOn=function(n,e){a.addEventListener?a.addEventListener(n,e,!1):document.attachEvent&&document.attachEvent("on"+n,e)},n.requestAnimationFrame=a.requestAnimationFrame||a.webkitRequestAnimationFrame||a.mozRequestAnimationFrame||function(n){a.setTimeout(n,1e3/60)},n.noop=function(){},n}(),n={ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,ENTER:13,SHIFT:16,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,BACKSPACE:8,DELETE:46,TAB:9,TILDE:192},p=f.getTranspose(n),e=[],t=function(){"use strict";function n(n){this.keyCode=n,this.cachedKeypressEvent=null}function t(n,e,t,o){t?n[e]=t:n[e](o)}return n.prototype._downHandler=f.noop,n.prototype._upHandler=f.noop,n.prototype._pressHandler=f.noop,n.prototype.isDown=function(){return-1!==f.indexOf(e,this.keyCode)},n.prototype.down=function(n){t(this,"_downHandler",n,this.cachedKeypressEvent)},n.prototype.up=function(n,e){t(this,"_upHandler",n,e)},n.prototype.press=function(n,e){this.cachedKeypressEvent=e,t(this,"_pressHandler",n,e)},n.prototype.unbindDown=function(){this._downHandler=f.noop},n.prototype.unbindUp=function(){this._upHandler=f.noop},n.prototype.unbindPress=function(){this._pressHandler=f.noop},n}(),o=function(i){"use strict";var c={};c.Key=t;var o=!1,r=Date.now?Date.now:function(){return+new Date},u=r();return c.tick=function(){var n,e=i.length;for(n=0;n<e;n++){var t=i[n],o=p[t];o&&c[o].down()}},c.run=function(n){o=!0;var e=r(),t=e-u;f.requestAnimationFrame.call(a,function(){o&&(c.run(n),n(t,e))}),u=e},c.stop=function(){o=!1},f.forEach(n,function(n,e){c[e]=new t(n)}),f.documentOn("keydown",function(n){var e=n.keyCode,t=p[e],o=f.pushUnique(i,e),r=c[t];if(r){var u=r.cachedKeypressEvent||{};(u.ctrlKey||u.shiftKey||u.metaKey)&&(o=!0),o&&r.press(null,n)}}),f.documentOn("keyup",function(n){var e=f.removeValue(i,n.keyCode),t=p[e];t&&c[t].up(null,n)}),f.documentOn("blur",function(n){f.forEach(i,function(n){var e=p[n];e&&c[e].up()}),i.length=0}),c}(e);"object"==typeof module&&"object"==typeof module.exports?module.exports=o:"function"==typeof define&&define.amd?define(function(){return o}):a.kd=o}(window);
var pickupz = new Audio('pickup.wav');
var flys = document.getElementById("spaceship");
var lig = document.getElementById("bosslight");
var x = 705;
var jeck = 0;
var stopfriction = 0;
var numberofbullet = 8;
var allowshiphealthtodrop = 2;
kd.A.down(function () {
    flys.style.backgroundImage = "url('spacel.gif')";
    flys.style.left = x + "px";
    x -= 10;
    if (x + 50 >= posx) {
        if (fly <= posy + 39)
            if (x <= posx + 104)
                if (fly + 50 >= posy) {
                    if (x <= posx + 104 && x > posx) {
                        if (allowtohit === 0) {
                            kickedaway(5, 0);
                            if (allowshiphealthtodrop === 1) {
                                document.getElementById("score").innerHTML = --shiphealth;
                                if (shiphealth === 0) explodendie();
                                else xxs.play();
                                allowshiphealthtodrop++;
                            }
                        }
                        else x = posx + 105;
                    }
                }
    } checkbosshealth();
});

kd.A.up(function () {
    if (shiphealth > 0) {
        var friction = 1.5;
        var ea = setInterval(ease, 5);
        function ease() {
            if (friction <= 0) clearInterval(ea);
            if (x + 60 >= posx) {
                if (fly <= posy + 39)
                    if (x <= posx + 114)
                        if (fly + 50 >= posy) {
                            friction = 0;
                        }
            }
            x -= friction;
            friction -= 0.025;
            flys.style.left = x + "px";
        }
    }
    });
kd.D.down(function () {
    flys.style.backgroundImage = "url('space.gif')";
    flys.style.left = x + "px";
    x += 10;
    if (x + 50 >= posx) {
        if (fly <= posy + 39)
            if (x <= posx + 104)
                if (fly + 50 >= posy) {
                    if (x + 50 >= posx && x + 55 < posx + 104) {
                        if (allowtohit === 0) {
                            kickedaway(-5, 0);
                            if (allowshiphealthtodrop === 1) {
                                document.getElementById("score").innerHTML = --shiphealth;
                                if (shiphealth === 0) explodendie();
                                else xxs.play();
                                allowshiphealthtodrop++;
                            }
                        }
                        else x = posx - 51;
                        
                    }
            }
    } checkbosshealth();
});
kd.D.up(function () {
    if (shiphealth > 0) {
        var friction = 1.5;
        var ea = setInterval(ease, 5);
        function ease() {
            if (friction <= 0) clearInterval(ea);
            if (x + 60 >= posx) {
                if (fly <= posy + 39)
                    if (x <= posx + 114)
                        if (fly + 50 >= posy) {
                            friction = 0;
                        }
            }
            x += friction;
            friction -= 0.025;
            flys.style.left = x + "px";
        }
    }
});
kd.W.down(function () {
    if (shiphealth === 0) jeck = 1;
    switch (jeck) {
        case 0:
            var laser = new Audio('Laser_Shoot.mp3');
            jeck = 1;
            var frag = document.createDocumentFragment();
            if (numberofbullet > 0) {
                var btn = document.createElement("DIV");
                laser.play();
                laser.remove();
            }
            var elem = document.getElementById("boss");           
            frag.appendChild(btn);
            btn.style.position = "absolute";
            btn.style.left = x + 23.5 + "px";
            btn.style.top = fly + "px";
            btn.style.width = 13 + "px";
            btn.style.height = 31.05 + "px";
            btn.style.backgroundImage = "url('bomb.gif')";
            btn.style.backgroundSize = "contain";
            document.body.appendChild(frag);
            numberofbullet--;
            var pewpew = fly;
            var pewpewx = x + 23.5;
            var pew = setInterval(shotmove, 0.1);
            setTimeout(removeshot, 1100);                
            var fun = 1; //check từng thiên thạch xem cái nào bị bắn trúng
            function shotmove() {
                pewpew -= 3;
                btn.style.top = pewpew + "px";
                if (pewpewx + 10 >= posx) {
                    if (pewpew <= posy + 36)
                        if (pewpewx <= posx + 104)
                            if (pewpew + 10 >= posy) {
                                --bossshieldhealth;
                                xplode();
                                lig.style.top = -1500 + "px";
                                shake(20, 0, 0);
                                removeshot();
                            }
                }
            document.getElementById("chek").innerHTML = numberofbullet;
                    var yu = document.getElementById("obs" + fun);
                    var xz = parseInt(yu.style.left);
                    var yz = parseInt(yu.style.top);
                    var he = parseInt(yu.style.height);
                    var wi = parseInt(yu.style.width);
                    if (pewpewx + 10 >= xz) {
                        if (pewpew <= yz + he)
                            if (pewpewx + 10 <= xz + wi)
                                if (pewpew + 10 >= yz) {                                  
                                    obshit = fun;
                                    removeshot();
                                    var newammo = Math.floor(Math.random() * 2) + 1;
                                    if (newammo === 2) {
                                        var frag = document.createDocumentFragment();
                                        var btns = document.createElement("DIV");
                                        frag.appendChild(btns);
                                        btns.style.position = "absolute";
                                        btns.style.left = xz + "px";
                                        btns.style.top = yz + "px";
                                        btns.style.width = 10 + "px";
                                        btns.style.height = 10 + "px";
                                        btns.style.backgroundImage = "url('pickup.gif')";
                                        btns.style.backgroundSize = "contain";
                                        document.body.appendChild(frag);
                                        var ammofall = setInterval(newammofalldown, 1);
                                        setTimeout(clearammofall, 3000);
                                        function newammofalldown() {
                                            yz += 1;
                                            btns.style.top = yz + "px";                                            
                                            if (xz + 10 >= x) {
                                                if (yz <= fly + 50)
                                                    if (xz <= x + 50)
                                                        if (yz + 10 >= fly) {
                                                            pickupz.play();
                                                            numberofbullet += 4;                                                            
                                                            document.getElementById("chek").innerHTML = numberofbullet;
                                                            clearammofall();
                                                        }
                                            }
                                            
                                        }
                                        function clearammofall() {                                           
                                            clearInterval(ammofall);
                                            btns.remove();
                                        }
                                    }
                                }
                    }
                    fun++;
                    if (fun > 8) fun = 1;
            }
            function removeshot() {
                clearInterval(pew);
                btn.remove();
            }
    }
});
kd.W.up(function () {
    jeck = 0;
});
// This update loop is the heartbeat of Keydrown
kd.run(function () {
    kd.tick();
});