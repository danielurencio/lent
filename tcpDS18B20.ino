#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#define Pin 2

OneWire ourWire(Pin);
DallasTemperature sensors(&ourWire);

// Hardcode WiFi parameters as this isn't going to be moving around.
const char* ssid = "INFINITUM_C83CE4";
const char* password = "F26DC83CE5";

// Start a TCP Server on port 5045
WiFiServer server(5045);
WiFiClient client;
char temperatureString[5];

void setup() {
 // pinMode(16,OUTPUT);
  Serial.begin(115200);
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
  
  // Start the TCP server
  server.begin();
  sensors.begin();
}

void loop() {
  TCPServer();
}

void TCPServer () {
  if(!client.connected()){
    client = server.available();
  } else {
    while (client.connected()) {
      sensors.requestTemperatures();
      float temp = sensors.getTempCByIndex(0);
      dtostrf(temp,2,2,temperatureString);
      client.print(temperatureString);
      client.print('\n');
    }
  }
}

void temp() {

}

