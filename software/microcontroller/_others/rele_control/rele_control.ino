const int rele = 8;
const int led = 13;
void setup() {
  Serial.begin(9600);
  pinMode(rele, OUTPUT);
  pinMode(led, OUTPUT);

}

void loop() {
  if(Serial.available()>0){
    char c = Serial.read();
    if(c == 'd'){
      digitalWrite(rele, HIGH);
      digitalWrite(led, HIGH);
      Serial.println("LAMPADA DESLIGADA");
    }
    if(c == 'a'){
      digitalWrite(rele, LOW);
      digitalWrite(led, LOW);
      Serial.println("LAMPADA ACESA");
    }
  }

}
