'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');//constの理由はconstructor()の中でしか使わない為
      section.classList.add('panel');

      this.img = document.createElement('img');//class Paelの他のメソッドから呼び出す為にthisを使用
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement('button');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');//最初にinactiveを加えることでstopを押せない様にする
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;//一度押すと処理が止まる様にする→二回押せない
        }
        this.stop.classList.add('inactive');

        clearTimeout(this.timeoutId);//clearTimeoutに渡すtimeoutIdが必要、class Panel内で作成する

        panelsLeft--;//stopボタンを押すと１減らす

        if (panelsLeft === 0) {
          checkResult();//判定の処理、パネル同士を比較する処理なのでclassのそとで書く
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);//sectionの子要素として追加
      section.appendChild(this.stop);//sectionの子要素として追加

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/05DCD2E6-A8FB-45AF-868A-A1A6C4E7778D_4_5005_c.jpeg',
        'img/841F18AE-E021-441E-AFFA-2A7CE6D187DB_4_5005_c.jpeg',
        'img/CA6BE10C-D49B-4453-9B10-A8549739B1D5_4_5005_c.jpeg',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
      this.img.src = this.getRandomImage();
      //this.timeoutId はsetTimeoutの返り値
      this.timeoutId = setTimeout(() => {//spinの処理を一定時間繰り返す様にする
        this.spin();//spinメソッドを呼ぶことで繰り返される
      }, 50);//50m秒後に次の処理をさせる
    }

    isUnmatched(p1, p2) {
      // if(this.img.src !== p1.img.src && this.img.src !== p2.img.src){
      //   return true;
      // } else{
      //   return false;
      // }下の様に簡略化できる
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
      //二つの画像と異なる場合、trueを返す
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');//リセット機能
      this.stop.classList.remove('inactive');//リセット機能
    }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();//trueの場合unmatch()でclassにunmatchedを加える
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),//インスタンス作成
    new Panel(),
    new Panel(),
  ];

  let panelsLeft = 3;//初期値としていくつパネルが動いているかを書く

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;//一度押すと処理が止まる様にする→二回押せない
    }
    spin.classList.add('inactive');
       //パネルの画像を切り替える
    panels.forEach(panel => {
      panel.activate();//spinを押した時にclassを外す
      panel.spin();
    });
  });
}