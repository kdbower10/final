var buff;
var MARGIN = 40;
var wolfy;
var wolf
var images;
var tmp;
var collectibles

function preload() {
  buff = loadImage("buff.png");// load buffalo png
  wolfy= loadImage("wolfy.png");//load wolf png
  soundFormats("wav");
  noise= loadSound("wolfbuff.wav");
}

function setup() {
  createCanvas(1200, 1200);

  tmp = new Group();
  x = .25; //starting x at 25%
  images = new Group(); //created a group for the buffalo
  // collectibles = new Group();
  
  for (var i = 0; i < 20; i++) {//for loop to start buffalo out 20 random 
    var img = createSprite(random(0, width), random(0, height));
    img.addImage(buff);
    img.setCollider("circle", -2, 2, 75);
    img.setSpeed(random(2, 3), random(0, 360));
    img.scale = 0.25;
    img.mass = img.scale;
    images.add(img);
  }

  for (var i = 0; i < 1; i++) {//for loop to start buffalo out 20 random 
    wolf = createSprite(random(0, width), random(0, height));
    wolf.addImage(wolfy);
    wolf.setCollider("circle", -2, 2, 75);
    wolf.setSpeed(random(2, 3), random(0, 360));
    wolf.scale = 1;
    wolf.mass = img.scale;
    // images.add(img);
  }
// for(var i=0; i<10; i++)
//     {
//     // var img = createSprite(random(0, width), random(0,height));
//     collectibles.add(img);
//     }
  

}
// function death(){
// noise.setVolume(1);
// noise.play();

// }

function explode(buff1, buff2){
  
  if ((buff1.scale == 1) && (buff2.scale == 1)){
    buff1.remove();
    buff2.remove();

    for (var i = 0; i < 4; i++) {
      var img = createSprite(random(0, width), random(0, height));
      img.addImage(buff);
      img.setCollider("circle", -2, 2, 50);
      img.setSpeed(random(2, 3), random(0, 360));
      img.scale = 0.25;
      img.mass = img.scale;

      //images.add(img);
      tmp.add(img);
    }
  }
  
}





function draw() {
  background(255, 255, 255);
// image(wolfy,mouseX,mouseY);

//if no arrow input set velocity to 0
  wolf.velocity.x = (mouseX-wolf.position.x)/10;
  wolf.velocity.y = (mouseY-wolf.position.y)/10;

  //circles bounce against each others and against boxes
  images.collide(images);
  images.overlap(images,explode);
  images.collide(tmp);
  images.overlap(tmp,explode);
 
  wolf.overlap(tmp,collect);
  wolf.overlap(images, collect);
 
  // wolf.overlap(tmp,death);
  // wolf.overlap(images,death);
  //all sprites bounce at the screen edges
  for (var i = 0; i < allSprites.length; i++) {
    var s = allSprites[i];
    s.scale += 0.001;
    if (s.scale >= 1) {
      s.scale = 1;
    }
    
    if (s.position.x < 0) {
      s.position.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if (s.position.x > width) {
      s.position.x = width - 1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if (s.position.y < 0) {
      s.position.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if (s.position.y > height) {
      s.position.y = height - 1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }

  drawSprites();

}
function collect(collector, collected)
{
  //collector is another name for asterisk
  //show the animation
  // collector.changeAnimation("stretch");
  // collector.animation.rewind();
  //collected is the sprite in the group collectibles that triggered 
  //the event
  collected.remove();
  noise.setVolume(0.3);
noise.play();
tint(255,0,150);
}