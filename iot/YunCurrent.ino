#include <Bridge.h>
#include <YunClient.h>
#include "EmonLib.h"                   // Include Emon Library
EnergyMonitor emon1;
#define PORT 5555

char IRMS[5];
YunClient client;
IPAddress addr(192, 168, 0, 3);

void setup() {
  // Bridge startup
  Bridge.begin();
  emon1.current(1, 111.1);             // Current: input pin, calibration.
  Serial.begin(9600);

 // while (!Serial); // wait for a serial connection

  client.connect(addr, PORT);
  if(client.connected()) {
    Serial.println("Conectado!");
  }
  
}

void loop() {
  double Irms = emon1.calcIrms(1480);

    if(!client.connect(addr,PORT)) {
    Serial.println("...connectino failed!");
    Serial.println("Retrying in 5 seconds...");
    delay(5000);
    client.connect(addr, PORT);
    return;
  }

  if (client.connected()) {
    Serial.println(Irms);
    dtostrf(Irms,2,2,IRMS);
    client.print(IRMS);
//    Serial.flush();
  }
  else
    Serial.println("Could not connect to the server.");  
  // Give some time before trying again
  delay (1000);
}
