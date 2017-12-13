// var frank=[];
// var electric=[];
// var black=[];
// var face=[];




var img1;
var img2;
var img3;
var q = 0;

var h = 0;
var r = 0;
var d = 1;


function preload(){
  img1 = loadImage("bwfrank.jpg");

  img2 = loadImage("electfrank.jpg");

  img3 = loadImage("facefrank.png");


  

}

function frank(){

  image(img1,0,0);

  fill(255,0,0, q);
  stroke(255, q);
  textSize(32);
  text("I feel my heart glow with an enthusiasm which elevates me to heaven, for nothing contributes so much to tranquillize the mind as a steady purpose — a point on which the soul may fix its intellectual eye.",0,150,700,300);
    q = q+.5;

}

function electric(){
createCanvas(700,600,WEBGL);
background(0);






  var dirX = d*cos(r);
  var dirY = d*sin(r);
 
  directionalLight(0, 0, 0, dirX, dirY, 0.5);
  translate(dirX*width/2, -dirY*height/2, 0.5);
  
 
  rotateX(radians(h));
  rotateY(radians(mouseX/width*360));
  rotateZ(radians(mouseY/height*360));
  
  texture(img2);
  box(150, 150, 150);
  
  
  r = (r+0.01) % TWO_PI;
    }

  function black(){
background(0);
}

function face(){
 image(img3,0,0);

}




function setup(){
  createCanvas(700, 600);
  textFont("HelveticaBold");
}

function draw() {

  // frank();
  electric();
  // black();
  // face();
//  if(frameCount < 150) {
//     frank();
//   } else if (frameCount <300) {
//     electric();
//   } else if (frameCount <390) {
//     black();
//   } else if (frameCount < 500) {
//     face();
//   } 
  
}