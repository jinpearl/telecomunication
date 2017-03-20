#include <Servo.h>

Servo myservo;

void setup() {
  Serial.begin(9600);
  myservo.attach(9); 
  
  while (Serial.available() <= 0) {
    Serial.println("hello");
    delay(300);

  }
}
void loop() {
  if (Serial.available()>0); {
  int reading = serial.read();
  int angle = map(reading, 0, 1023, 0, 179);
  myservo.write(reading);
  
  Serial.println(reading);
  }
}
