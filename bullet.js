//定義一個bullet的
class Bullet{
    constructor(args){
         this.r = args.r || 10  //設計的飛彈大小有大有小,傳送args.r來設定大小
         this.p = args.p || shipP.copy() //建立一個向量,{x:width/2 , y:heihght}
         this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(10)
    }
    
    draw(){ //繪製子蛋 //
        push()
        translate(this.p.x,this.p.y)
        noStroke()
        fill("#FFFCEC") //底下白色的圓
        ellipse(0, 0, 30, 30, 5);
        fill("#FFDC35") //上面黃色的圓
        ellipse(0, 0, 15, 15, 5);
            
        pop() //執行完回到原本執行的(0,0)

  
    }
    update(){
        this.p.add(this.v)
      
    }
  
  
  }
  