var monster_colors = "d9ed92-b5e48c-99d98c-76c893-52b69a-34a0a4-168aad-1a759f-1e6091-184e77".split("-").map(a=>"#"+a)
class Monster{
    constructor(args){
        this.r = args.r || random(40,150)  //設計的怪物主體，傳送args.r來設定大小
        this.p = args.p || createVector(random(width),random(height)) //建立一個向量,由電腦亂數抽取初始位置
        this.v = args.v || createVector(random(-1,1),random(-1,1)) //移動的速度，如果沒有傳args參數,會利用亂數抽取x,y軸的移動速度
        this.color = args.color || random(monster_colors)
        this.mode = random(["happy","bad"])
        this.dead = false //代表活著
        this.timenum = 0

   }
   draw(){ //劃出元件
    if (this.dead == false){
        push() //重新設定原點位置
            translate(this.p.x,this.p.y)//把原點(0,0)座標移到物件中心位置
            fill(this.color)
            noStroke()
            ellipse(0,0,this.r)
        
            //+====================================
            if(this.mode == "happy"){
                fill(255)
                ellipse(0,0,this.r/2)
                fill("#930000")
                ellipse(0,0,this.r/3)
            }else{
                fill(255)
                arc(0,0,this.r/2,this.r/2,0,PI)
                fill("#FF2D2D")
                arc(0,0,this.r/3,this.r/3,0,PI)

            }
            stroke(this.color)
            strokeWeight(15)
            // line(this.r/2,0,this.r,0)
            noFill()
            for(var j=0;j<4;j++){
                rotate(PI/2)
                beginShape()
                for(var i = 0;i<(this.r/2);i++){
                    vertex(this.r/2+i,sin(i/8+frameCount*100))
                }
            endShape()
            }
        pop()}
        else{ //怪物死亡的畫面
            this.timenum = this.timenum +8 //死亡畫面停留時間
            push()
                translate(this.p.x,this.p.y)
                fill(this.color)
                noStroke()
                ellipse(0,0,this.r)
                stroke(255)
                strokeWeight(4)
                line(-this.r/2,0,this.r/2,0
)
            pop()
                
        }
   }

   update(){ //計算出移動元件後的位置
        this.p.add(this.v)
        if(this.p.x<=0 ||this.p.x>=width){ //X軸碰到左邊(<=0),或是碰到右邊(>=width)
            this.v.x= -this.v.x
          }
          if(this.p.y<=0 ||this.p.y>=height){ //Y軸碰到上邊(<=0),或是碰到下邊(>=height)
            this.v.y= -this.v.y //y軸方向,把速度改變
   }
}
    isBallInRanger(x,y){ //判斷飛彈是否在怪物的範圍內
        let d = dist(x,y,this.p.x,this.p.y) //計算兩點(飛彈與物件的中心點)
        if(d<this.r/2){
          return true //滑鼠與物件的距離小於物件的寬度，
     }else{
       return false//滑鼠與物件的距離大於物件的寬度
     }
     }
}