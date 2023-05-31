//let points = [[-2, 0], [-1,-1], [0, -1],[1,0],[1,2],[0,3],[-1,3],[-2,2],[-3,2],[-4,1],[-4,-2],[-5,-4],[-4,-4],[-3,-2],[-2,-1],[-2,-3], [-2,-4], [-1, -4],[0,-4],[0,-2],[2,-2],[2,-4], [4, -4],[4,1],[3,2],[1,2],[1,2]];
let points = [[-6,4],[-5,5],[-4,4],[-3,5],[-2,4],[-1,5],[0,4],[1,5],[2,4],[3,5],[4,4],[5,3],[4,2], [5,1], [4,0],[5,-1],[4,-2],[5,-3],[4,-4], [3,-5],[2,-4],[1,-5],[0,-4],[-1,-5],[-2,-4],[-3,-5],[-4,-4],[-5,-5],[-6,-4],[-7,-3],[-6,-2],[-7,-1],[-6,0],[-7,1],[-6,2],[-7,3],[-6,4]];

var line_colors = "ccd5ae-e9edc9-fefae0-faedcd-d4a373".split("-").map(a=>"#"+a)
var fill_colors = "bb9457-432818-99582a-ffe6a7".split("-").map(a=>"#"+a)

//畫point所有點的物件設定-------------------------------------
var ball //目前要處理的物件，暫時放在ball變數內
var balls =[]
//畫point所有點的物件設定-------------------------------------


//飛彈物件的定義---------------------------------------
var bullet  //目前要處理的物件暫時放在bullet變數內
var bullets = []
//飛彈物件的定義---------------------------------------

//怪物物件的定義---------------------------------------
var monster  //目前要處理的物件暫時放在bullet變數內
var monsters = []
//怪物物件的定義---------------------------------------
var shipP
//+++++++++++++設定砲台的位置

//++++++++++++++++++++
var score = 0  //分數初始設定

function preload(){ //程式碼準備執行前，所執行程式碼內容，比setup更早執行
  elephant_sound = loadSound("sound/y1211.mp3")
  bullet_sound = loadSound("sound/playsound.mp3") //子彈發射聲音
  monster_sound = loadSound("sound/14633.mp3") //怪物死亡聲音
  createImg = loadImage("image/images.jpg") //背景圖設置
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipP = createVector (width/2,height/2) //預設砲台的位置在(width/2,height/2)
  for(var i=0;i<10;i=i+1){
    ball = new Obj({}) //產生一個Obj class元件
    balls.push(ball) //把ball物件放入balls陣列內
  }
  for(var i=0;i<10;i=i+1){
    monster = new Monster({}) //產生一個怪物 class元件
    monsters.push(monster) //把monster物件放入monsters陣列內
  }
}

function draw() {
  background(createImg);
  // for(var j=0;j<balls.length;j=j+1){
  //   ball= balls[j]
  //   ball.draw()
  //   ball.update()
  // }
  if(keyIsPressed){ //鍵盤設定(上下左右按鍵)
    if(key =="ArrowLeft" || key=="a"){ // 按下鍵盤的往左鍵/a往左移
      shipP.x = shipP.x - 5
    }
    if(key =="ArrowRight"|| key=="d"){ // 按下鍵盤的往右鍵
      shipP.x = shipP.x + 5
    }
    if(key =="ArrowUp"|| key=="w"){ // 按下鍵盤的往上鍵
      shipP.y = shipP.y - 5
    }
    if(key =="ArrowDown"|| key=="s"){// 按下鍵盤的往下鍵
      shipP.y = shipP.y + 5
}
  }

  //餅乾的顯示
  for(let ball of balls)  //balls的迴圈
  {
    ball.draw() //餅乾的繪製
    ball.update() //更新餅乾的狀態
    for(let bullet of bullets){  
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y)){  //偵測飛彈物件有沒有接觸現在的ball
        balls.splice(balls.indexOf(ball),1) //子彈碰到餅乾會使餅乾消失
        bullets.splice(balls.indexOf(bullet),1)  //子彈碰到餅乾會使子彈消失  
        score = score - 1 //子彈打到餅乾減一分
        elephant_sound.play() //播放打到餅乾的聲音
    }
  }
  }

  //飛彈的顯示
  for(let bullet of bullets) 
  {
    bullet.draw() //子彈的繪製
    bullet.update()
  }

  //怪物的顯示

  for(let monster of monsters)  //for迴圈，偵測所有怪物
    {
      if(monster.dead == true && monster.timenum>4){
        monsters.splice(monsters.indexOf(monster),1)
          //檢查怪物是否是在死亡狀態，並延遲時間，然後再從資料庫刪除怪物 (使用splice刪除怪物)
      }
      monster.draw() //怪物的繪製
      monster.update() //怪物的更新
      for(let bullet of bullets){  //更新子彈
        if(monster.isBallInRanger(bullet.p.x,bullet.p.y)){      
        //飛彈物件有沒有接觸現在的ball(怪物)
          bullets.splice(bullets.indexOf(bullet),1)    
          score = score + 1 //怪物被子彈打到時加一分
          monster.dead = true //被子彈打到時，怪物轉為死亡
          monster_sound.play() //怪物死亡的聲音撥放
    }
  }
  }
  
  fill(255) //計分框填色為白色
    strokeWeight(3) //計分框外框線粗細
    rect(18,15,90,60) //設置計分框
    fill(0) //字體顏色(0) 黑色
    textSize(50) //字體大小50
    text (score,50,50) //顯示score(分數)的值，並顯示於(50,50)上
  push()//重新規劃原點(0,0)，在視窗的中間
    let dx = mouseX - width/2  // 計算滑鼠相對於畫面中心點的水平偏移量(寬度)
    let dy = mouseY - height/2  //計算滑鼠相對於畫面中心點的垂直偏移量(高度)
    let angle = atan2(dy,dx) //計算從畫面中心點到滑鼠位置的角度，並將結果儲存在 angle 變數中
    translate(shipP.x,shipP.y) //位移
    noStroke() //沒有外框
    rotate(angle) //旋轉
   // ----------------------繪製平底鍋
    fill(0) //填充黑色
    rect(-6,-6,60,10,10) //繪製手柄(方形圓框)
    fill(0) //填充黑色
    ellipse(0,0,50) //繪製鍋子
    fill("#ADADAD") //填充灰色#ADADAD
    ellipse(0,0,40) //繪製鍋底
    
   
  pop()//恢復原本的設定,原點(0,0)在視窗的左上角
}

//在物件上按下滑鼠，物件消失不見，分數加一分
function mousePressed(){  //按一下產生飛彈
  bullet = new Bullet({
  r:10
  })
  bullets.push(bullet)
  bullet_sound.play()
}

function keyPressed(){ //按鍵觸發
  if(key==" "){ //當按下空格時
    bullet = new Bullet({}) //生成新子彈
    bullets.push(bullet) //將新子彈放入bullets陣列中(子彈庫)
    bullet_sound.play() //播放子彈音效
  }
  
  }
