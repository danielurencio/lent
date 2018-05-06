#include <Bridge.h>
#include <YunClient.h>
#include "EmonLib.h"
EnergyMonitor emon1;
#define PORT 5555

char IRMS[5];
IPAddress addr(192, 168, 0, 6);
// Define our client object
YunClient client;

void setup()
{
  // Bridge startup
  Bridge.begin();
  emon1.current(1, 111.1);             // Current: input pin, calibration.

  //Serial.begin(9600);

 // while (!Serial); // wait for a serial connection
}

void loop()
{
  double Irms = emon1.calcIrms(1480);
  // Make the client connect to the desired server and port
  //IPAddress addr(192, 168, 0, 6);
  
  // Or define it using a single unsigned 32 bit value
  // IPAddress addr(0xc0a8sab9); // same as 192.168.42.185
  
  // Or define it using a byte array
  // const uint8 addrBytes = {192, 168, 42, 185};
  // IPAddress addr(addrBytes);

  client.connect(addr, PORT);
  
  // Or connect by a server name and port.
  // Note that the Yun doesn't support mDNS by default, so "Yun.local" won't work
  // client.connect("ServerName.com", PORT);

  if (client.connected())
  {
    Console.println("Connected to the server.");
    
    // Send something to the client
    //client.print(1);
    dtostrf(Irms,2,2,IRMS);
    client.print(IRMS);

    // Cheap way to give the server time to respond.
    // A real application (as opposed to this simple example) will want to be more intelligent about this.
    delay (250);
  
    // Read all incoming bytes available from the server and print them
    /*while (client.available())
    
    {
      char c = client.read();
      Console.print(c);
    }
    //Serial.flush();
*/
    // Close the connection
    client.stop();
  }
  //else
   // Console.println("Could not connect to the server.");  
    
  // Give some time before trying again
  delay (1000);
}
