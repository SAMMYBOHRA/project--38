var dog,sadDog,happyDog,garden,washroom,database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var addFood;
var foodObj;
var gameState,readState;

function preload(){
sadDog=loadImage("Images/Dog.png");
happyDog=loadImage("Images/happy dog.png");
garden=loadImage("Images/Garden.png");
washroom=loadImage("Images/Wash Room.png");
bedroom=loadImage("Images/Bed Room.png");
milkImg = loadImage("Images/milk.png");
livingroom = loadImage("Images/Living Room.png");

}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodObj = new Food();
  feed = new feed();

  dog=createSprite(200,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20);

  milk1=createSprite(140,335,10,10);
  milk1.addImage(milkImg);
  milk1.scale=0.05;

  milk2=createSprite(210,180,10,10);
  milk2.addImage(milkImg);
  milk2.scale=0.05;
  milk2.visible=false;

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed("feeddog");

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed("addfoods");


  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
}

function draw() {
  background("green");

  foodObj.display();
  writeStock(foodS);

  if(foodS==0){
    dog.addImage(happyDog);
    milk2.visible=false;
  }else{
    dog.addImage(sadDog);
    milk2.visible=true;

  }
 var gameStateRef =database.ref('gameState');
  gameStateRef.on("value",function(data){
    gameState=data.val();
  });
  if(gameState===1){
    dog.addImage(happyDog);
    dog.scale=0.17;
    dog.y=250;
  }
  if(gameState===2){
    dog.addImage(sadDog);
    dog.scale=0.17;
    milk2.visible=false;
    dog.y=250;
  }

  var Bath = createButton(" I WANT TO BATH");
  Bath.position(500,125);
  if(Bath.mousePressed(function(){
     
    gameState=3;
    database.ref('/').update({
      'gameState':gameState
    });
 }))
 if(gameState===3){
  dog.addImage(washroom);
  dog.scale=1;
  milk1.visible=false;
  milk2.visible=false;
}

var Sleep = createButton(" sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
  gameState=4;
  database.ref('/').update({
    'gameState':gameState
  });
}))

if(gameState===4){
dog.addImage(bedroom);
dog.scale=1;
milk1.visible=false;
milk2.visible=false;
}

var Play = createButton(" I WANT TO Play");
Play.position(500,160);
if(Play.mousePressed(function(){
   
  gameState=5;
  database.ref('/').update({
    'gameState':gameState
  });
}))

if(gameState===5){
dog.addImage(livingroom);
dog.scale=1;
milk1.visible=false;
milk2.visible=false;
}

var PlayGarden = createButton(" I WANT TO PlayGarden");
PlayGarden.position(710,160);
if(PlayGarden.mousePressed(function(){
   
  gameState=6;
  database.ref('/').update({
    'gameState':gameState
  });
}))

if(gameState===6){
dog.addImage(garden);
dog.scale=1;
milk1.visible=false;
milk2.visible=false;
}
 
  drawSprites();
  textSize(17);
  fill("black");
  text("MILKS BOTTLE REMAINING :- "+foodS,90,495)
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  //foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food : x
  });
  
}
