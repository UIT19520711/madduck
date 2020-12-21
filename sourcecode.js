var xxplode = new Audio("xplode.mp3");
var kickhead = new Audio('kickhead.mp3');
var xxs = new Audio("hit.wav");
var bossshot = new Audio('boss_shot.mp3');
var audio = new Audio('thunder1.mp3');
var ast = new Audio("asteroidhit1.wav");
function explodendie() {
    xxplode.play();
    flys.style.height = 0.1 + "px";
    flys.style.width = 0.1 + "px";
    var ex = document.getElementById("explode");
    ex.style.backgroundImage = "url('shipdie.gif')";
    ex.style.height = 200 + "px";
    ex.style.width = 200 + "px";
    ex.style.position = "absolute";
    ex.style.backgroundSize = "contain";
    ex.style.left = x - 50 + "px";
    ex.style.top = fly - 50 + "px";
    ex.style.zIndex = 99;
    shake(30);
    setInterval(function () {
        var scre = document.getElementById("endgame");
        var scree = document.getElementById("ded");
        var screee = document.getElementById("highscore");
        var screeee = document.getElementById("high");
        var screeeee = document.getElementById("again");
        scre.style.opacity = 0.5;
        scree.style.opacity = 1;
        screee.style.zIndex = 101;
        screeee.style.zIndex = 101;
        screeeee.style.opacity = 1;
        screeeee.style.zIndex = 105;
        if (newhighscore === 1) {
            var hienhon = document.getElementById("newhighscore");
            hienhon.style.opacity = 1;
        }
    }, 1000)
}
var xplo = 1;
function xplode() {
    xxplode.play();
    var ex = document.createElement("DIV");
    document.body.appendChild(ex);
    ex.style.backgroundImage = "url('xplode" + xplo + ".gif')";
    ex.style.height = 150 + "px";
    ex.style.width = 150 + "px";
    ex.style.position = "absolute";
    ex.style.backgroundSize = "contain";
    ex.style.left = posx - 20 + "px";
    ex.style.top = posy - 75 + "px";
    xplo++;
    if (xplo === 3) xplo = 1;
    setTimeout(function () {
        ex.remove();
    }, 600);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function shake(noofshakes, bx, by) {
    var boX = bx;
    var boY = by;
    document.body.style.position = "absolute";
    var BX = Math.floor(Math.random() * 10) + (-10);
    var BY = Math.floor(Math.random() * 10) + (-10);
    if (noofshakes === 0) {
        BX = BY = 0;
    }
    var sk = setInterval(shakes, 1);
    function shakes() {
        if (boX < BX) boX++;
        else if (boX > BX) boX--;
        else boX = BX;
        if (boY < BY) boY++;
        else if (boY > BY) boY--;
        else boY = BY;
        document.body.style.left = boX + "px";
        document.body.style.top = boY + "px";
        if (boX == BX && boY == BY) {
            if (noofshakes >= 1) shake(noofshakes - 1, boX, boY);
            clearInterval(sk);
        }
    }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let highscore = 0;
let shiphealth = 3;
let bossshieldhealth = 1;
let bossyx = 660;
let bossyy = 180;
let posx = 630;
let posy = 200;
let thunder98 = 4; //thứ tự các thunder ở máu 98
let thuns = 1;
let jeckboss = 0; //giới hạn mỗi lần hit chỉ giảm 1 máu, nếu ko thì máu sẽ giảm liên tục
let obshit = 0; //check xem viên thiên thạch nào bị bắn trúng
//điều khiển nhân vật
document.onkeydown = myMove;
let timer = 90;
let fly = 500;//trục y của ship
let score = 0;
let pos = 600;
let shit = 0;
let keycode;
let checks = 0;
let allowtohit = 1;
let newhighscore = 0;
function kickedaway(xx, yy) {
    var friction = 1.5;
    var ea = setInterval(ease, 0.1);
    function ease() {
        if (shiphealth === 0) clearInterval(ea);
        if (friction <= 0) {
            allowshiphealthtodrop = 1;
            clearInterval(ea);
        }
        friction -= 0.025
        x += xx * friction;
        fly += yy * friction;
    }
}
function checkbosshealth() {
    if (x + 50 >= bossyx && jeckboss === 0 && allowtohit === 1) {
        if (fly <= bossyy + 10 && jeckboss === 0 && allowtohit === 1)
            if (x <= bossyx + 20 && jeckboss === 0 && allowtohit === 1)
                if (fly + 50 >= bossyy - 20 && jeckboss === 0 && allowtohit === 1) {
                    kickhead.play();
                    kickedaway(0, 1);
                    var health = document.getElementById("highscore").innerHTML = ++highscore;
                    //lưu highscore
                    var highscr = localStorage.getItem("hai");
                    if (highscore > highscr) {
                        localStorage.setItem("hai", highscore);
                        newhighscore = 1;
                    }
                    document.getElementById("high").innerHTML = localStorage.getItem("hai");
                    //
                    if (highscore === 5 && jeckboss === 0) {
                        setInterval(thunder, 9000);
                        setInterval(thunder, 10000);
                        setInterval(thunder, 11000);
                        setTimeout(function () {
                            obstacle(1);
                        }, 7000);
                        setTimeout(function () {
                            obstacle(2);
                        }, 8000);
                        setTimeout(function () {
                            obstacle(3);
                        }, 9000);
                        setTimeout(function () {
                            obstacle(4);
                        }, 10000);
                        setTimeout(function () {
                            obstacle(5);
                        }, 11000);
                        setTimeout(function () {
                            obstacle(6);
                        }, 12000);
                        setTimeout(function () {
                            obstacle(7);
                        }, 13000);
                        setTimeout(function () {
                            obstacle(8);
                        }, 14000);
                    }
                    jeckboss = 1;
                }
    }
    if (x + 50 < bossyx) jeckboss = 0;
    if (x + 50 >= posx) {
        if (fly <= posy + 40)
            if (x <= posx + 104)
                if (fly + 50 >= posy - 5) {
                    if (fly <= posy + 40 && fly > posy) {
                        if (allowtohit === 0) {
                            kickedaway(0, 1);
                            if (allowshiphealthtodrop === 1) {
                                document.getElementById("score").innerHTML = --shiphealth;
                                if (shiphealth === 0) {
                                    explodendie();
                                }
                                else xxs.play();
                                allowshiphealthtodrop++;
                            }
                        }
                        else fly = posy + 41;
                    }
                    if (fly >= posy - 3 - 50 && fly + 50 < posy + 39) {
                        if (allowtohit === 0) {
                            kickedaway(0, -1);
                            if (allowshiphealthtodrop === 1) {
                                document.getElementById("score").innerHTML = --shiphealth;
                                if (shiphealth === 0) {
                                    explodendie();
                                }
                                else xxs.play();
                                allowshiphealthtodrop++;
                            }
                        }
                        else fly = posy - 3 - 50;
                    }
                }
    }
}
function myMove() {
    var flys = document.getElementById("spaceship");
    checkKeycode();
    function checkKeycode(e) {
        if (window.event)
        { keycode = window.event.keyCode; }
        if (e) {
            keycode = e.which;
        }
    }
    if (keycode === 75 && shit === 0) {
        if (timer < 200) {
            timer = 0;
            score = 0;
            shit++;
            var id = setInterval(frame1, 0.1);
        }
        else {
            shit++;
            timer = 0;
            var id = setInterval(frame1, 0.1);
        }
    }
    if (keycode === 74 && shit === 1) {
        if (timer < 200) {
            timer = 0;
            score = 0;
            shit--;
            var ids = setInterval(frame2, 0.1);
        }
        else {
            shit--;
            timer = 0;
            var ids = setInterval(frame2, 0.1);
        }
    }
    if (checks === 0) {
        var tr = setInterval(fall, 0.1);
        checks++;
    }
    var checkburn = 0;
    function fall() {
        if (shiphealth === 0) clearInterval(tr);
        var gravity = 0;
        if (score > 30) {
            if (fly >= 550 && checkburn === 0) {
                kickedaway(0, -6);
                document.getElementById("score").innerHTML = --shiphealth;
                if (shiphealth <= 0) explodendie();
                else xxs.play();
                checkburn = 1;
            }
            else checkburn = 0;
            fly++;
            fly++;
            flys.style.top = fly + "px";
        }
    }
    function frame1() {
        if (keycode === 74) clearInterval(id);
        pos++;
        pos++;
        score++;
        if (score > 800) score = 400;
        timer++;
        if (shiphealth > 0) fly--;
        if (fly < 0) fly = 0;
        flys.style.top = fly + "px";
        checkbosshealth();
    }
    function frame2() {
        if (keycode === 75) clearInterval(ids);
        pos--;
        pos--;
        score++;
        if (score > 800) score = 400;
        timer++;
        if (shiphealth > 0) fly--;
        if (fly < 0) fly = 0;
        flys.style.top = fly + "px";
        checkbosshealth();
    }
}
//cảnh
window.onload = boss;
let ashitsound = 2;
function obstacle(fun) {//thiên thạch
    let xz = 1400;
    let yz = Math.floor(Math.random() * 500) + 1;
    let he = Math.floor(Math.random() * 50) + 10;
    let wi = he;
    var turn = 0;
    var gt = setInterval(get, 0.1);
    setInterval(function () {
        turnFan(fun);
    }, 1);
    function turnFan(fun) {
        let lk = document.getElementById("obs" + fun);
        turn += 1.5;
        lk.style.transform = "rotate(" + (turn % 360) + "deg)"
    }
    function get() {
        if (shiphealth === 0) clearInterval(gt);
        var yu = document.getElementById("obs" + fun);
        yu.style.left = xz + "px";
        yu.style.top = yz + "px";
        yu.style.height = he + "px";
        yu.style.width = wi + "px";
        if (x + 30 >= xz) {
            if (fly <= yz + he)
                if (x + 15 <= xz + wi)
                    if (fly + 30 >= yz) {
                        obshit = 0;
                        xz = 1400 + xz;
                        yz = Math.floor(Math.random() * 300) + 1;
                        he = Math.floor(Math.random() * 50) + 10;
                        if (highscore >= 10) he = Math.floor(Math.random() * 100) + 50;
                        wi = he;
                        document.getElementById("score").innerHTML = --shiphealth;
                        if (shiphealth === 0) {
                            explodendie();
                        }
                        else xxs.play();
                    }
        }
        if (obshit === fun) {
            obshit = 0;
            xz = 1400 + xz;
            yz = Math.floor(Math.random() * 300) + 1;
            if (highscore >= 10) he = Math.floor(Math.random() * 80) + 40;
            else he = Math.floor(Math.random() * 50) + 10;
            ast.play();
            ast.remove();
            ast = new Audio("asteroidhit" + ashitsound + ".wav");
            ashitsound++;
            if (ashitsound === 4) ashitsound = 1;
            wi = he;
        }
        xz--;
        if (xz === -150) {
            xz = 1400;
            yz = Math.floor(Math.random() * 300) + 1;
            he = Math.floor(Math.random() * 50) + 10;
            if (highscore >= 10) he = Math.floor(Math.random() * 100) + 50;
            wi = he;
        }
    }
}
//boss
function tinhtoancackieua(x1, y1, x2, y2) {
    a = (y1 - y2) / (x1 - x2);
    b = y1 - x1 * a;
    return a;
}
function tinhtoancackieub(x1, y1, x2, y2) {
    a = (y1 - y2) / (x1 - x2);
    b = y1 - x1 * a;
    return b;
}
//--------------------------------------------------------------------------------------
var thusound = 2;
function thunder() {
    var warning = document.createDocumentFragment();
    var warn = document.createElement("DIV");
    warning.appendChild(warn);
    document.body.appendChild(warning);//
    var thund = document.createDocumentFragment();
    var thun = document.createElement("DIV");
    thund.appendChild(thun);
    document.body.appendChild(thund);//
    var thunx;
    if (thunder98 > 0) {
        switch (thunder98) {
            case 4:
                thunx = 5;
                break;
            case 3:
                thunx = 280;
                break;
            case 2:
                thunx = 555;
                break;
            case 1:
                thunx = 830;
                break;
        }
    }
    else thunx = Math.floor(Math.random() * 1100) + 1;
    //
    thunder98--;
    warn.style.opacity = 0.5;
    warn.style.width = 2 + "px";
    warn.style.height = 600 + "px";
    warn.style.position = "absolute";
    warn.style.top = -10 + "px";
    warn.style.borderLeft = 1 + "px dashed red";
    warn.style.left = thunx + 200 + "px";
    //
    thun.style.width = 420 + "px";
    thun.style.height = 600 + "px";
    thun.style.position = "absolute";
    thun.style.top = 4 + "px";
    setTimeout(strike, 3000)
    function strike() {
        audio.play();
        audio.remove();
        audio = new Audio('thunder' + thusound + '.mp3');
        thusound++;
        if (thusound === 5) thusound = 1;
        shake(20);
        if (x + 50 >= thunx + 170 && x <= thunx + 260) {
            document.getElementById("score").innerHTML = --shiphealth;
            if (shiphealth > 0) xxs.play();
        }
        if (shiphealth === 0) {
            explodendie();
        }

        var box = document.createDocumentFragment();
        var shadow = document.createElement("DIV");
        box.appendChild(shadow);
        document.body.appendChild(box);//
        shadow.style.width = 0 + "px";
        shadow.style.height = 580 + "px";
        shadow.style.position = "absolute";
        shadow.style.top = 0 + "px";
        shadow.style.left = thunx + 250 + "px";
        shadow.style.boxShadow = "0px 0px 200px 25px white";
        thun.style.left = thunx + "px";
        thun.style.backgroundImage = "url('thun" + thuns + ".gif')";
        thun.style.backgroundSize = 500 + "px " + 650 + "px";
        thuns++;
        warn.remove();
        setTimeout(thundisapear, 670);
        if (thuns === 3) thuns = 1;
        function thundisapear() {
            thun.remove();
            shadow.remove();
        }
    }
}//thunder       

//----------------------------------------------------------------------------------   
function boss() {
    var audiostand = new Audio('ufo.mp3');
    var audiorun = new Audio('uforun.mp3');
    var audiodam = new Audio('ufodam.mp3');
    var highscr = localStorage.getItem("hai");
    if (highscr >= 1) document.getElementById("high").innerHTML = highscr;
    document.body.style.position = "absolute";
    document.body.style.left = 0 + "px";
    document.body.style.top = 0 + "px";
    let elem = document.getElementById("boss");
    let elemcon = document.getElementById("bossy");
    let light = document.getElementById("bosslight");
    let countTo3bullets = 3;
    let checkhitboss = 0;
    let xo = 500;
    let yo = 100;
    let stark = setInterval(starto, 1);
    function starto() {
        if (highscore != 0) {
            moveto();
            clearInterval(stark);
        }
    }
    //di chuyển của con boss
    function moveto() {
        audiorun.play();
        audiostand.pause();
        audiostand.load();
        audiodam.pause();
        audiodam.load();
        allowtohit = 0;
        if (bossshieldhealth <= 0) bossshieldhealth = 1;
        xo = Math.floor(Math.random() * 1100) + 1;
        yo = Math.floor(Math.random() * 500) + 1;
        var speedofboss = Math.floor(Math.random() * 2) + 1;
        var id = setInterval(frameb, 0.1);
        //đường đạn
        function bullet(sidebullet) {
            var frags = document.createDocumentFragment();
            var bu = document.createElement("DIV");
            frags.appendChild(bu);
            let xbullet = posx;
            let ybullet = posy;
            let lol = xbullet;
            let olo = ybullet;
            bu.style.position = "absolute";
            bu.style.width = 10 + "px";
            bu.style.height = 10 + "px";
            bu.style.top = ybullet + "px";
            bu.style.left = xbullet + "px";
            bu.style.backgroundColor = "#ff0000";
            bu.style.boxShadow = "0px 0px 30px 13px #ff0000";
            bu.style.borderRadius = 10 + "px";
            document.body.appendChild(frags);
            let xx = x;
            let yy = fly + sidebullet;
            let a = tinhtoancackieua(xx, yy, posx, posy);
            let b = tinhtoancackieub(xx, yy, posx, posy);
            let bn = setInterval(bullets, 0.1);
            let checkpos = posx;
            function removeshots() {
                clearInterval(bn);
                bu.remove();
            }
            setTimeout(removeshots, 2100);
            function bullets() {
                if (shiphealth === 0) clearInterval(bn);
                if (olo <= yy && lol >= xx) {
                    xbullet -= 2.5;
                    if (highscore >= 20) xbullet -= 0.75;
                    ybullet = a * xbullet + b;
                    bu.style.top = ybullet + "px";
                    bu.style.left = xbullet + "px";
                }
                if (olo <= yy && lol < xx) {
                    xbullet += 2.5;
                    if (highscore >= 20) xbullet += 0.75;
                    ybullet = a * xbullet + b;
                    bu.style.top = ybullet + "px";
                    bu.style.left = xbullet + "px";
                }
                if (olo > yy && lol <= xx) {
                    xbullet += 2.5;
                    if (highscore >= 20) xbullet += 0.75;
                    ybullet = a * xbullet + b;
                    bu.style.top = ybullet + "px";
                    bu.style.left = xbullet + "px";
                }
                if (olo > yy && lol > xx) {
                    xbullet -= 2.5;
                    if (highscore >= 20) xbullet -= 0.75;
                    ybullet = a * xbullet + b;
                    bu.style.top = ybullet + "px";
                    bu.style.left = xbullet + "px";
                }
                if (x + 30 >= xbullet) {
                    if (fly <= ybullet + 10)
                        if (x <= xbullet + 10)
                            if (fly + 30 >= ybullet) {
                                document.getElementById("score").innerHTML = --shiphealth;
                                removeshots();
                                if (shiphealth === 0) {
                                    explodendie();
                                }
                                else xxs.play();
                            }
                }
            }
        }
        var checkhealth = 0;
        function frameb() {
            if (shiphealth === 0) clearInterval(id);
            elem.style.backgroundImage = "url('boss.gif')";
            if (posx < x) elemcon.style.backgroundImage = "url('duckr.gif')";
            if (posx >= x) elemcon.style.backgroundImage = "url('duckl.gif')";
            if (posx === xo && posy === yo) { //khi boss đi hết quãng đường và dừng lại và bắn
                audiorun.pause();
                audiorun.load();
                audiostand.play();
                checkhealth = highscore;
                clearInterval(id);
                bossshot.play();
                bullet(0);
                countTo3bullets--;
                if (countTo3bullets === 0) {
                    bullet(80);
                    bullet(-80)
                    countTo3bullets = 3;
                }
                var ik = setTimeout(moveto, 3000);
                var il = setInterval(destroyhimwhilehesleep, 1);//
                var wakeup = setTimeout(wakeupboss, 2970);
                function destroyhimwhilehesleep() {
                    var bos = document.getElementById("bossy");
                    if (posx < x && bossshieldhealth > 0) {
                        bos.style.backgroundImage = "url('duckr.gif')";
                    }
                    if (posx >= x && bossshieldhealth > 0) {
                        bos.style.backgroundImage = "url('duckl.gif')";
                    }
                    if (bossshieldhealth <= 0) {
                        audiostand.pause();
                        audiostand.load();
                        audiodam.play();
                        //
                        var bos = document.getElementById("bossy");
                        if (posx < x) bos.style.backgroundImage = "url('duckdamr.png')";
                        if (posx >= x) bos.style.backgroundImage = "url('duckdaml.png')";
                        var box = document.getElementById("boss");
                        box.style.backgroundImage = "url('bossdam.png')";
                        //
                        allowtohit = 1;
                        clearTimeout(ik);//hủy bỏ lần di chuyển kế tiếp của boss (khi bossshieldhealth vẫn còn)
                        var ig = setTimeout(moveto, 7000);
                        clearInterval(il);// ngay khi bossshieldhealth vừa chạm đến 0, thì phải lập tức clearinterval ngay, ko thì nó sẽ lặp lại liên tục và sẽ cứ settimeout moveto liên tục
                        var hithim = setInterval(nowhithim, 1);
                        setTimeout(clearnowhithim, 6970);
                        function clearnowhithim() {
                            clearInterval(hithim);
                        }
                        function nowhithim() {
                            if (highscore > checkhealth) {
                                allowshiphealthtodrop = 5;
                                if (highscore === 5) {
                                    allowtohit = 0;
                                    thunder();
                                    setTimeout(thunder, 500);
                                    setTimeout(thunder, 1000);
                                    setTimeout(thunder, 1500);
                                    setTimeout(moveto, 6000);
                                }
                                else moveto();
                                clearInterval(hithim);
                                clearTimeout(ig);
                            }
                        }
                    }
                }
                function wakeupboss() {
                    clearInterval(il);
                }
            } else {
                if (posx < xo) { //khi đi chưa hết quãng đường thì tiếp tục tăng dần posx và posy
                    posx += speedofboss;
                    bossyx = posx + 28 + speedofboss;
                }
                else if (posx === xo || posx === xo + 1 || posx === xo - 1) {
                    posx = xo;
                    bossyx = posx + 28;
                }
                else {
                    posx -= speedofboss;
                    bossyx = posx + 28 - speedofboss;
                }
                if (posy < yo) {
                    posy += speedofboss;
                    bossyy = posy - 48 + speedofboss;
                }
                else if (posy === yo || posy === yo + 1 || posy === yo - 1) {
                    posy = yo;
                    bossyy = posy - 48;
                }
                else {
                    posy -= speedofboss;
                    bossyy = posy - 48 - speedofboss;
                }
                if (bossshieldhealth <= 0) { //nếu như shield của boss bị vỡ, boss dừng lại, và cho khoảng thời gian hồi là 7s
                    audiorun.pause();
                    audiorun.load();
                    audiodam.play();
                    //
                    if (posx < x) elemcon.style.backgroundImage = "url('duckdamr.png')";
                    if (posx >= x) elemcon.style.backgroundImage = "url('duckdaml.png')";
                    elem.style.backgroundImage = "url('bossdam.png')";
                    var lig = document.getElementById("bosslight");
                    //
                    allowtohit = 1;
                    clearInterval(id);
                    var ig = setTimeout(moveto, 7000);
                    checkhealth = highscore;
                    var hithim = setInterval(nowhithim, 1);//nếu cốc đầu thg boss lúc nó đang ngất thì nó bừng dậy
                    setTimeout(clearnowhithim, 6970)
                    function clearnowhithim() {
                        clearInterval(hithim);
                    }
                    function nowhithim() {
                        lig.style.left = 1500 + "px";
                        if (highscore > checkhealth) {
                            allowshiphealthtodrop = 5;
                            if (highscore === 5) {
                                allowtohit = 0;
                                thunder();
                                setTimeout(thunder, 500);
                                setTimeout(thunder, 1000);
                                setTimeout(thunder, 1500);
                                setTimeout(thunder, 2000);
                                setTimeout(moveto, 6000);
                            }
                            else moveto();
                            clearInterval(hithim);
                            clearTimeout(ig);
                        }
                    }
                }
                elem.style.top = posy + 'px';
                elem.style.left = posx + 'px';
                elemcon.style.top = bossyy + 'px';
                elemcon.style.left = bossyx + 'px';
                light.style.top = posy + 'px';
                light.style.left = posx + 10 + 'px';
            }
        }//frameb
    }
}