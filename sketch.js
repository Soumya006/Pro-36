var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed , lastFed;


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  feed=createButton("Feed");
  feed.position(750,95);
  feed.mousePressed(feedDog);


  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  currentTime=hour();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    fill(255,255,254);
 textSize(15);
     text("Last Feed : 12  PM",400,30);
  }else if(lastFed==0){
    fill(255,255,254);
 textSize(15);
    text("Last Feed : 12 AM",400,30);
  }else{
    fill(255,255,254);
 textSize(15);
    text("Last Feed : 1 AM",400,30);
  }

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time

  var foodStock_val  = foodObj.getFoodStock();
  if(foodStock_val<= 0){
    foodObj.updateFoodStock(foodStock_val*0);
  }else{
    foodObj.updateFoodStock(foodStock_val -1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
