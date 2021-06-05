var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedDog;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed,time;

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
  feedDog=createButton("Feed dog");
  feedDog.position(720,95);
  feedDog.mousePressed(feedDogs);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  
  //write code to read fedtime value from the database //idk

  //write code to display text lastFed time here
  if(lastFed>=12){
    fill("black");
    text("Last Feed : 12:00 PM",400,30);
  }else if(lastFed==0){
    fill("black");
    text("Last Feed : 12:00 AM",400,30);
  }else{
    fill("black");//if there is hour than there is minute
    text("Last Feed : "+time,400,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDogs(){
  dog.addImage(happyDog);
  time=hour(0,12);
  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <=0){
    foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  database.ref('/').update({
    Food:food_stock_val
  })
  database.ref('/').update({
   FeedTime:time
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
