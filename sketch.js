const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
//Constraint é limitação
const Constraint = Matter.Constraint;
//Composites é um compostos conjunto de corpos
const Composites = Matter.Composites; 
//Composit é um composto conjunto de corpo
const Composite = Matter.Composite;

var engine, world;

var chao

var corda

var fruta 

var frutaconectada

var fundo

var frutaImg

var coelho
var coelhoImg
var piscando
var comendo
var triste

var Botao

var Botao2

var Som1
var Som2
var Som3 
var Som4
var Som5
function preload(){

    fundo=loadImage("background.png");

    frutaImg=loadImage("melon.png");

    coelhoImg=loadImage("Rabbit-01.png");
    piscando=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
    comendo=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
    triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");

    Som1=loadSound("air.wav");
    Som2=loadSound("rope_cut.mp3");
    Som3=loadSound("sad.wav");
    Som4=loadSound("eating_sound.mp3")
    Som5=loadSound("sound1.mp3")
    //Evitando repetimento de animações
    comendo.looping=false
    triste.looping=false
}

function setup(){
createCanvas (500, 700);
Som5.play()
Som5.setVolume(0.01)
//Motor de física
engine = Engine.create();
//Adicionando o motor de física ao mundo
world = engine.world;

var propriedadesdochao = {
    isStatic:true

}

chao = Bodies.rectangle(200, 690, 600, 20, propriedadesdochao);
World.add(world, chao);


corda = new Rope(7, {x:245,y:30})

var propriedadesdafruta = {
    isStatic:false
}

fruta = Bodies.circle(300, 300, 5, propriedadesdafruta);
frutaconectada = new Link (corda, fruta)
//Adicionando fruta no corpo da corda
Matter.Composite.add(corda.body, fruta)
World.add(world, fruta);

coelho=createSprite(420,600,100,100);
coelho.addImage(coelhoImg);
coelho.scale=0.3;
piscando.frameDelay=30;
coelho.addAnimation("piscando", piscando);
coelho.addAnimation("comendo", comendo);
coelho.addAnimation("triste", triste);
coelho.changeAnimation("piscando");


Botao=createImg("cut_btn.png");
Botao.position(220,30);
Botao.size(50,50);
Botao.mouseClicked(Cortar);

Botao2=createImg("balloon.png");
Botao2.position(10,250);
Botao2.size(150,100);
Botao2.mouseClicked(assoprarbalao)

}



function draw(){
    background(fundo)
    //Atualizando motor de física
    Engine.update(engine);
 
push()
rectMode(CENTER);
rect(chao.position.x, chao.position.y, 600, 20);


pop()

   corda.show();
   push()
   imageMode(CENTER)
   if(fruta!=null){
    image(frutaImg, fruta.position.x, fruta.position.y, 82, 82);
   }
   
   pop()

   drawSprites();
   if(colisao(fruta,coelho)==true){
       coelho.changeAnimation("comendo")
       Som4.play()
   }

   if(fruta!=null && fruta.position.y>=650){
       coelho.changeAnimation("triste")
       fruta=null
       Som3.play()
   }
       

}
function Cortar(){
    corda.break();
    frutaconectada.detach();
    frutaconectada=null
    Som2.play()

}
function assoprarbalao(){
    Matter.Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0})
    Som1.play()
}
function colisao(body,sprite){
    if(body!=null){
        var distancia=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(distancia<=80){
        World.remove(engine.world,fruta)
        fruta=null
    //Retornando valor da função
    return true 
    
    }
    else{
        return false
    }
    }
     
}