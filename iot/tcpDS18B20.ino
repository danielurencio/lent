#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#define Pin 2

OneWire ourWire(Pin);
DallasTemperature sensors(&ourWire);

const char* ssid = "Sersol";
const char* password = "mexicoespana";
const char* host = "192.168.0.6";
const int port = 5000;
char temperatureString[5];

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid,password);
  //IPAddress myIP = WiFi.softAPIP();
  //Serial.println(myIP);
  //Wait for connection
  
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.print("Connected to "); Serial.println(ssid);
  Serial.print("IP Address: "); Serial.println(WiFi.localIP());
  
  sensors.begin();
}

WiFiClient client;
float t = 0.0;

void loop() {

  if(!client.connect(host,port)) {
    Serial.println("...connectino failed!");
    Serial.println("Retrying in 5 seconds...");
    delay(5000);
    return;
  }

  sensors.requestTemperatures();
  float temp = sensors.getTempCByIndex(0);
  
  if(temp != t) {
    t = temp;
    dtostrf(t,2,2,temperatureString);   
    client.print(temperatureString);
  }

}
