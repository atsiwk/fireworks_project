let fireworks = [];
let gravity;
let strokeColor;
let launch = [];
let launchTime;
let music;
let hyu;
let don;


// HTML要素の取得
let start_btn = document.getElementById('start_btn');
let normal_btn = document.getElementById('normal_btn');
let biggest_btn = document.getElementById('biggest_btn');
let heart_btn = document.getElementById('heart_btn');
let flower_btn = document.getElementById('flower_btn');
let share_btn = document.getElementById('share_btn');

// 音源を読み込む
function preload() {
  soundFormats('mp3');
  music = loadSound('assets/mp3/music.mp3');
  hyu = loadSound('assets/mp3/hanabi1.mp3');
  don = loadSound('assets/mp3/hanabi2.mp3');
}

// スタートボタンクリック時の処理
start_btn.addEventListener('click', function () {
  start_btn.style.display = 'none'; // スタートボタンを非表示にする。
  share_btn.style.display = 'none'; // シェアボタンを非表示にする。

  // 音楽が再生されてなければ再生する。
  if (music.isPlaying() === false) {
    music.play();
  }

  // 打ち上げの回数分配列を作る。とりあえず50個作っておいた。すべてにtrueを入れる。（打ち上げたらfalseになる）
  launchTime = millis();
  for (let i = 0; i < 50; i++) {
    launch[i] = true;
  }
});

// 花火発射ボタンの処理（5つ） 引数は順に「花火の種類」「打ち上げるX座標」「打ち上げるときの初速」
normal_btn.addEventListener('click', function () {
  fireworks.push(new Firework('normal', random(width), random(-8, -13)));
});

big_btn.addEventListener('click', function () {
  fireworks.push(new Firework('big', random(width), random(-8, -13)));
});

biggest_btn.addEventListener('click', function () {
  let biggest_width = random(width);
  fireworks.push(new Firework('big', biggest_width, -13));
  fireworks.push(new Firework('big', biggest_width, -13));
});

heart_btn.addEventListener('click', function () {
  fireworks.push(new Firework('heart', random(width), random(-8, -14)));
});

flower_btn.addEventListener('click', function () {
  fireworks.push(new Firework('flower', random(width), random(-8, -14)));
});



// はじめに１回読み込まれる関数
function setup() {
  let canvas = createCanvas(1000, 800); // キャンバスの大きさ(幅1000px、高さ800px)
  canvas.parent('canvas'); // キャンバスの親要素をidで指定する。
  colorMode(HSB); // カラーモード
  gravity = createVector(0, 0.1); // 重力 ｙ軸下側に働く力（y軸は下が正の値）
  strokeColor = random(0, 360); // 色はランダムにする。HSBの場合0〜360で指定するため。
  stroke(strokeColor, 100, 100); // ボーダーの色 花火の粒子の色 HSBで指定。
  strokeWeight(4) // ボーダーの太さ(粒子の大きさ) pointで作っているので1pxだと小さすぎるので大きくしている。
  background(0);// 背景色は黒

  launchTime = 3000; // スタートボタンが押されてから１回目の花火があがるまでの時間（音声の読み込みがあるので３秒後にした。）
  music.setVolume(0.03); // 音声ファイルの音量を調整
  hyu.setVolume(0.03);
  don.setVolume(0.03);
}



// 1秒間に60回読み込まれる関数 frameRateで読み込む回数は変更可
function draw() {
  frameRate(60); // １秒間に60回読み込む。
  background(0, 0, 0, 0.1); // 背景色 不透明度を0.1にすることで残像が残る。1にすると残像が残らない。


  // 花火を打ち上げる順番の設定 ここから ----------------------------------------------------------------

  // millis()は最初に読み込んでからの経過時間（ミリ秒）を表す。
  // 最初はlaunchTime = 3000(ミリ秒) なので、millis() > 3秒 ３秒後でないと打ち上げられない。
  if (millis() > launchTime && launch[0] == true) {
    for (let i = width / 4; i < width; i += width / 4) {
      fireworks.push(new Firework('normal', i));
    }
    launch[0] = false; // 花火を打ち終わったらfalseにする。
    launchTime += 3000;// launch[1]の花火が打ち上げられてから、次のlaunch[2]の花火が打ち上げられるまでの時間
  }

  if (millis() > launchTime && launch[1] == true) {
    fireworks.push(new Firework('heart', width / 4, -9)); // widthはキャンバスの幅を表す。キャンバスの4分の1の幅の場所から打ち上げ
    fireworks.push(new Firework('heart', 2 * width / 4, -12)); // キャンバス幅の4分の2の場所から打ち上げ
    fireworks.push(new Firework('heart', 3 * width / 4, -9));  // キャンバス幅の4分の3の場所から打ち上げ
    launch[1] = false;
    launchTime += 3000;
  }

  if (millis() > launchTime && launch[2] == true) {
    for (let i = width / 4; i < width; i += width / 4) {
      fireworks.push(new Firework('big', i, -12));
    }
    launch[2] = false;
    launchTime += 3000;

  }

  if (millis() > launchTime && launch[3] == true) {
    fireworks.push(new Firework('flower', width / 5, -9));
    launch[3] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[4] == true) {
    fireworks.push(new Firework('flower', 2 * width / 5, -9));
    launch[4] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[5] == true) {
    fireworks.push(new Firework('flower', 3 * width / 5, -9));
    launch[5] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[6] == true) {
    fireworks.push(new Firework('flower', 4 * width / 5, -9));
    launch[6] = false;
    launchTime += 500;
  }


  if (millis() > launchTime && launch[8] == true) {
    fireworks.push(new Firework('flower', width / 5, -12));
    launch[8] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[9] == true) {
    fireworks.push(new Firework('flower', 2 * width / 5, -12));
    launch[9] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[10] == true) {
    fireworks.push(new Firework('flower', 3 * width / 5, -12));
    launch[10] = false;
    launchTime += 500;
  }

  if (millis() > launchTime && launch[11] == true) {
    fireworks.push(new Firework('flower', 4 * width / 5, -12));
    launch[11] = false;
    launchTime += 3000;
  }


  if (millis() > launchTime && launch[13] == true) {
    fireworks.push(new Firework('big', width / 2, -12));
    fireworks.push(new Firework('big', width / 2, -12));
    launch[13] = false;
    launchTime += 4000;
  }

  if (millis() > launchTime && launch[14] == true) {
    for (let i = width / 4; i < width; i += width / 4) {
      fireworks.push(new Firework('normal', i, -12));
    }
    for (let i = width / 4; i < width; i += width / 4) {
      fireworks.push(new Firework('normal', i, -8));
    }

    launch[14] = false;
    launchTime += 4000;
  }

  if (millis() > launchTime && launch[15] == true) {
    for (let i = 1; i < 8; i++) {
      fireworks.push(new Firework('normal', random(width), random(-8, -13)));
    }

    launch[15] = false;
    launchTime += 4000;
  }

  if (millis() > launchTime && launch[16] == true) {
    for (let i = 1; i < 8; i++) {
      fireworks.push(new Firework('big', random(width), random(-8, -13)));
    }

    launch[16] = false;
    launchTime += 5000;
  }

  if (millis() > launchTime && launch[17] == true) {
    for (let i = 1; i < 8; i++) {
      fireworks.push(new Firework('heart', random(width), random(-8, -13)));
    }

    launch[17] = false;
    launchTime += 5000;
  }

  if (millis() > launchTime && launch[18] == true) {
    for (let i = 1; i < 8; i++) {
      fireworks.push(new Firework('flower', random(width), random(-8, -13)));
    }

    launch[18] = false;
    launchTime += 5000;
  }



  if (millis() > launchTime && launch[19] == true) {
    fireworks.push(new Firework('big', width / 2, -12));
    fireworks.push(new Firework('big', width / 2, -12));
    launch[19] = false;
    launchTime += 3900;
  }

  if (millis() > launchTime && launch[20] == true) {
    // 花火が終わったらサイド「スタートボタン」「シェアボタン」を表示する。
    start_btn.style.display = 'block';
    share_btn.style.display = 'block';
  }

  // 花火を打ち上げる順番の設定  ここまで ----------------------------------------------------------------



  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();// 粒子を動かす
    fireworks[i].show();// 描画

    // 粒子がすべて消えたらfireworkオブジェクトを消す
    if (fireworks[i].done()) {
      fireworks.splice(i, 1); // splice:配列のindex番号iから1つ削除
    }
  }

  // console.log(fireworks.length);


}

class Particle { // 粒子クラス
  // インスタンス化したときに実行される 初期化
  constructor(x, y, hu, firework, speed = -12, afterExplodedVelocity = 0.96) {

    // 位置、速度、加速度のベクトルを作成
    this.pos = createVector(x, y); // 位置
    this.firework = firework;
    this.lifespan = 100;
    this.hu = hu;
    this.afterExplodedVelocity = afterExplodedVelocity;
    this.speed = speed;

    if (this.firework) { // 打ち上げる場合
      this.vel = createVector(0, this.speed); // 速度
    } else { // 爆発する場合
      this.vel = p5.Vector.random2D(); // 360°方向の単位ベクトル
      this.vel.mult(random(0, 6));
    }

    this.acc = createVector(0, 1); //加速度
  }

  applyForce(force) { // 運動方程式(F=ma) 質量は1として考えるのでF=a 力と加速度は同じと考える。
    this.acc.add(force);// 加速度に力を足す
  }

  update() { // 粒子を動かす
    if (!this.firework) {
      this.vel.mult(this.afterExplodedVelocity); // 爆発した後は落下速度を遅くする
      this.lifespan -= 1;
    }
    this.vel.add(this.acc); // 速度に加速度を足す 加速する
    this.pos.add(this.vel); // 位置に速度を足す 動く
    this.acc.mult(0); // 加速度に0をかける 加速度をリセットする

  }

  show() {// 描画
    colorMode(HSB);

    if (!this.firework) {
      stroke(this.hu, 100, 100, this.lifespan);
    } else {

      stroke(this.hu, 100, 100);
    }
    point(this.pos.x, this.pos.y); // 点を描く
  }


  done() { //粒子が消えたかどうか
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }

  }

}

class CustomParticle { // ハートなどの粒子クラス

  constructor(x, y, hu, firework, origin) { // インスタンス化したときに実行される 初期化

    // 位置、速度、加速度のベクトルを作成
    this.pos = createVector(x, y); // 位置
    this.firework = firework;
    this.lifespan = 100;
    this.hu = hu;

    if (this.firework) {
      this.vel = createVector(0, random(-11, -6)); // 速度
    } else { // 爆発するときの速度ベクトル
      this.vel = createVector(x, y).sub(origin); // 粒子の爆発方向のベクトル（粒子によって爆発する方向は異なる）originは爆発中心点
      this.vel.mult(1);
    }

    this.acc = createVector(0, 1); // 加速度
  }

  applyForce(force) { // 運動方程式(F=ma) 質量は1として考えるのでF=a 力と加速度は同じと考える。
    this.acc.add(force);// 加速度に力を足す
  }

  update() { // 粒子を動かす
    if (!this.firework) {
      this.vel.mult(0.95); // 爆発した後は落下速度を遅くする/
      this.lifespan -= 1;
    }
    this.vel.add(this.acc); // 速度に加速度を足す 加速する
    this.pos.add(this.vel); // 位置に速度を足す 動く
    this.acc.mult(0); // 加速度に0をかける 加速度をリセットする

  }

  show() {// 描画
    colorMode(HSB);

    if (!this.firework) {
      stroke(this.hu, 100, 100, this.lifespan);
    } else {
      stroke(this.hu, 100, 100);
    }
    point(this.pos.x, this.pos.y); // 点を描く
  }


  done() { // 粒子が消えたかどうか
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }

  }

}

class Firework {
  constructor(type, position, speed) {
    hyu.play();
    this.hu = random(360);
    // 粒子を作る 初期位置はx軸はwidthの範囲でランダム、y軸はキャンバスの高さ
    // width,heightにcreateCanvasで指定した値が自動的に入る。
    this.exploded = false; // 爆発したかどうか
    this.particles = []; // 爆発したときに生成される100個の粒子が入る配列
    this.type = type;
    this.position = position;
    this.speed = speed;
    this.firework = new Particle(this.position, height, this.hu, true, this.speed);


  }

  // 花火が消えたかどうか
  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }


  update() {
    // 打ち上げたときの処理
    if (!this.exploded) {
      this.firework.applyForce(gravity); // 重力加速度を設定
      this.firework.update(); // 点を動かす

      // 速度が０以上になったら（頂点に達したら）爆発させる
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode(); // 新しい粒子を100個生成する 速度ベクトルは360°ランダムな方向
        don.play(); // 花火が打ち上げる音（どん！）
      }
    } else {
      // 爆発したときの処理
      for (let i = this.particles.length - 1; i >= 0; i--) {
        this.particles[i].applyForce(gravity); // 加速度に重力を足す
        this.particles[i].update(); // 粒子を動かす

        // lifespan < 0 になったら配列のparticleオブジェクトを消す
        if (this.particles[i].done()) {
          this.particles.splice(i, 1); // splice:配列のindex番号iから1つ削除
        }

      }

    }

  }

  show() {
    // 打ち上げたときの処理
    if (!this.exploded) {
      this.firework.show(); // 画面に点を描く
    } else {
      // 爆発したときの処理
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].show();
      }
    }

  }

  explode() { // 新しい粒子を200個生成する 速度ベクトルは360°ランダムな方向

    if (this.type == 'normal') {
      // 通常の花火
      for (let i = 0; i < 200; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
        this.particles.push(p); // 配列に格納
      }
    } else if (this.type == 'big') {
      // 大きい花火
      for (let i = 0; i < 200; i++) {
        let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false, null, 0.99);
        this.particles.push(p); // 配列に格納
      }

    } else if (this.type == 'heart') {
      // ハートの花火

      let size = 0.5;
      for (let a = 0; a < TWO_PI; a += 0.15) {
        // ハートの計算式
        let r = size; // ハートの大きさ
        let x = r * 16 * pow(sin(a), 3);
        let y = -r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a));

        let p = new CustomParticle(this.firework.pos.x + x, this.firework.pos.y + y, this.hu, false, this.firework.pos);
        this.particles.push(p); // 配列に格納
      }

    } else if (this.type == 'flower') {
      // 正葉曲線の花火

      let curve = Math.ceil(random(1, 7)); // 8種類の曲線をランダムに選ぶ

      let size = 6;
      for (let a = 0; a < TWO_PI; a += 0.05) {
        // 花びらの計算式
        let r = size; // 花びらの大きさ
        let x = r * sin(curve * a) * sin(a);
        let y = -r * sin(curve * a) * cos(a);

        let p = new CustomParticle(this.firework.pos.x + x, this.firework.pos.y + y, this.hu, false, this.firework.pos);
        this.particles.push(p); // 配列に格納
      }
    }


  }

}
