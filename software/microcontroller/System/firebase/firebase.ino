#include <WiFi.h>
#include <IOXhop_FirebaseESP32.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <DHT.h>

// Variable Lamp
#define lamp 2
int lampValue = false;

// Variable Temp
int period = 300000;
unsigned long time_now = 0;
bool first = true;

// Variables DHT11
#define DHTPIN 27
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
float temperature;
float humidity;
int point = 2;

// Variables NTP
WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP);
const long gmtOffset_sec = -3 * 60 * 60;
String ntpTime;

#define FIREBASE_HOST "https://autoroom-1a19b.firebaseio.com/"
#define FIREBASE_AUTH "IMnvs2tez5IY1F2sCYONqJlgdVqTB03BVUiUxODM"
#define WIFI_SSID "Familia_de_Deus"
#define WIFI_PASSWORD "gois6523"

String path1 = "/temperature";
String path2 = "/humidity";
String path3 = "/time";

void setup() {
  Serial.begin(115200);

  // Lamp
  pinMode(lamp, OUTPUT);
  digitalWrite(lamp, LOW);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setBool("lamp", false);
  // handle error
  if (Firebase.failed()) {
    Serial.print("setting /lamp failed:");
    Serial.println(Firebase.error());
    return;
  }
  // Start NTP
  timeClient.begin();
  timeClient.setTimeOffset(gmtOffset_sec);

  // DHT Start
  dht.begin();

}

void loop() {
  // Validate WiFi connected
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print(". - . ");
  }

  // Update Time
  while (!timeClient.update()) {
    timeClient.forceUpdate();
  }

  if (millis() >= time_now + period || first) {
    time_now += period;
    temperature = dht.readTemperature();
    humidity = dht.readHumidity();
    ntpTime = timeClient.getFormattedDate();

    if (isnan(humidity) || isnan(temperature)) {
      Serial.println(F("Failed to read from DHT sensor!"));
      return;
    } else {
      Firebase.pushFloat(path1, temperature, point) ;
      Firebase.pushFloat(path2, humidity, point) ;
      Firebase.pushString(path3, ntpTime) ;
      Serial.println("Send!");
      first = false;

    }
  }

  // set bool value
  lampValue = Firebase.getBool("lamp");
  digitalWrite(2, lampValue ? HIGH : LOW);

}
