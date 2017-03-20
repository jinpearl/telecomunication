var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData; // for incoming serial data

var circle = {
  x: 0,
  y: 200.0,
  diameter: 40,
};

var b = 242;
var speed = 6;

var bl, rd;

function setup() {

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  //serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  createCanvas(1200, 400);

  bl = background(25, 25, b);
  rd = color(170,61,82);
  
  m = -100;
  n = 1300;
}

function draw() {


  background(25, 25, b);

  //gradients
  setGradient(m, 0, width/12, height, rd, color(25, 25, b), 2);
  setGradient(n, 0, width/12, height, color(25, 25, b), rd,2);


  //moon
  stroke(248, 240, 251);
  strokeWeight(4);
  fill(255);
  ellipse(circle.x, circle.y, 40);

  //line(width/2,0,width/2,height); dividing line

  //stars
  stroke(248, 240, 251);
  strokeWeight(1);
  line(220, 40, 220, 60);
  line(210, 50, 230, 50);

  line(420, 340, 420, 360);
  line(410, 350, 430, 350);

  line(580, 110, 580, 130);
  line(570, 120, 590, 120);

  line(880, 370, 880, 390);
  line(870, 380, 890, 380);

  fill(135, 206, 235);
  stroke(135, 206, 235);

  rect(900, 100, 2, 2);
  rect(1100, 350, 2, 2);
  rect(650, 250, 2, 2);
  rect(150, 370, 2, 3);

  //blue color shift
  if (circle.x > width / 2) {
    b = map(circle.x, width / 4, width, 0, 75);
  }

  if (circle.x < width / 2) {
    b = map(circle.x, 0, width / 2, 75, 0);
  }

  //bounce
  if (circle.x > width) {
    speed = -speed;
  }

  if (circle.x < 0) {
    speed = -speed;
  }

  if (circle.y <200) {
    m = map(m, -100, 1200, -100, -50);
    n = map(n, 0, 1300, 1150, 1300);
  }
  circle.x = circle.x + speed;;
  circle.y = inData;
}

  //if (m > -50) {m = -50;}
//if (n > 1200) {n =1200}
function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == 1) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  else if (axis == 2) {  // Left to right gradient
    for (var i = x; i <= x+w; i++) {
      var inter = map(i, x, x+w, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y+h);
    }
  }
}


function serialEvent() {
  var some = serial.read();
  var mappedSome = map(some, 0, 255, 100 , 300);
  inData = Number(mappedSome);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}


function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}