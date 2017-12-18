//kelly assisted in this development of everything, everytime I got stuck on a problem she would make me figure out what the solution could be and then explain it. 

var buff; 
var MARGIN = 40;
var wolfy;
var wolf
var images;
var tmp;
var collectibles;
var meadow;
// var vid;
var drops = [];
var howl;

function preload() {
  buff = loadImage("buff.png");// load buffalo png
  wolfy= loadImage("wolfy.png");//load wolf png
    soundFormats("wav");
  noise= loadSound("wolfbuff.wav");// created sound file of wolf howl and buffalo moan
  meadow= loadImage("meadow.jpg");// background image load
  nature= loadSound("nature.wav");  //background nature audio clip load
    // vid= createVideo("nature.3gp")// tried loading vidoe loop for the background
  rain= loadSound("rain.wav");//after all buffalo are gone sound
  howl= loadSound("howl.wav")
}

function setup() {
  createCanvas(1200, 900);

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
       
  for (var i = 0; i < 500; i++) {//rain drops array
     drops[i] = new Drop();
  }
}
       // function death(){
       // noise.setVolume(1);
       // noise.play();
       // }

function explode(buff1, buff2){//function allows when two buffalo grow to 100% they will explode and produce 4 buffalo at 25%
  
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
  background(meadow);// set image as background
 
   nature.setVolume(.5);//background noise volume
   nature.play();

   wolf.velocity.x = (mouseX-wolf.position.x)/10;//makes mouse control the movement of the wolf
   wolf.velocity.y = (mouseY-wolf.position.y)/10;//makes mouse control the movement of the wolf

 //when buffalo pngs reach growth and collide thie will explode through these commands
   images.collide(images);
   images.overlap(images,explode);
   images.collide(tmp);
   images.overlap(tmp,explode);
 //when the wolf overlaps the buffalos image he will consume the buffalo
   wolf.overlap(tmp,collect);
   wolf.overlap(images, collect);

        //when all buffalo are gone I wanted this to start surprise ending
       if(images.length==0&&tmp.length==0){
          
          rain.setVolume(.8);
          if (!rain.isPlaying()) {
             rain.play();
          }
         
  
       for (var i = 0; i < drops.length; i++) {
          drops[i].fall();
          drops[i].show();
      }    
          if(mouseIsPressed)//wolf can howl out of sadness wih no food when mouse is pressed
            howl.play();      
    }
 
     // wolf.overlap(tmp,death);
     // wolf.overlap(images,death);
     // Allows buffalo to bounce randomly on the screen 
  for (var i = 0; i < allSprites.length; i++) {
      var s = allSprites[i];
        s.scale += 0.001;//gives the buffalo the growth at .0001 rate
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


function collect(collector, collected)//function for wolf to collect the buffalo
{
   collected.remove();
   noise.setVolume(0.1);//faint howl of when and moan of buffalo when wold consumes buffalo
   noise.play();
     tint(255,0,150);// wolf flashes a red tint when consuming buffalo
}