
#include <Bridge.h>
#include <Console.h>
#include <YunClient.h>
#include "EmonLib.h"                   // Include Emon Library
EnergyMonitor emon1;
#define PORT 5555

char IRMS[5];
YunClient client;
IPAddress addr(192, 168, 0, 6);

void setup() {
  // Bridge startup
  Bridge.begin();
  Console.begin();
  emon1.current(1, 111.1);             // Current: input pin, calibration.
  Serial.begin(9600);
  //Serial.println("hola");
 // while (!Serial); // wait for a serial connection

  client.connect(addr, PORT);
  if(client.connected()) {
    Serial.println("Conectado!");
  }
  
}

void loop() {
  double Irms = emon1.calcIrms(1480);
  // Console.println("!");

  if(!client.connect(addr,PORT)) {
    Console.println("...connectino failed!");
    Console.println("Retrying in 5 seconds...");
    delay(5000);
    client.connect(addr, PORT);
    return;
  }

  if (client.connected()) {
    Console.println(Irms);
    dtostrf(Irms,2,2,IRMS);
    client.print(IRMS);
//    Serial.flush();
  }
  else
    Console.println("Could not connect to the server.");  
  // Give some time before trying again
  delay (1000);
}
