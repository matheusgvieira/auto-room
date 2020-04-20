/*
   Autor: Matheus Gois Vieira
   Data: Março de 2020
*/
//-------- Bibliotecas -----------
#define BLYNK_PRINT Serial
#include "DHT.h" // DHT
#include <BlynkSimpleEsp32.h> // Blynk-ESP32
#include <SPI.h>
#include <WiFi.h> // Wi-Fi
#include <WiFiClient.h> // Wi-Fi client 
//-------- DHT 11 -----------
#define DHTTYPE DHT11 // Tipo DHT 22, AM2302, AM2321
#define DHTPIN 27 // Pino 12 (GP12)
DHT dht(DHTPIN, DHTTYPE);
//-------- Token de Autenticação -----------
char auth[] = "Pp8rYflMtjOMRF7YH1IEOaQFSqUcZD9k";
//-------- Configurações de Wi-Fi -----------
char ssid[] = "Familia_de_Deus";
char pass[] = "gois6523";
//-------- Pino Virtual -----------
BlynkTimer timer;
void sendSensor()
{
  float h = dht.readHumidity();   // Armazena a leitura da umidade em “h”
  float t = dht.readTemperature();// Armazena a leitura da umidade em “t”
  Blynk.virtualWrite(V5, h);      // Umidade porta virtual V5
  Blynk.virtualWrite(V2, t);      // Temperatura porta virtual V2
}
void setup()
{
  Serial.begin(115200);     // Taxa de transmissão 115200
  dht.begin();                       // DHT
  pinMode(23, OUTPUT);           // LED white
  Blynk.begin(auth, ssid, pass); // TOKEN+REDE+SENHA
  timer.setInterval(1000L, sendSensor);
}
void loop()
{
  timer.run();
  Blynk.run();
}
