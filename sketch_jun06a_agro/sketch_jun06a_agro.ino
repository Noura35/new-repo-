#include <DHT.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include "string.h"

#include <HTTPClient.h>
#include "time.h"
#define WIFI_SSID "noura"
#define WIFI_PASSWORD "password"


#define dhtpin 2
#define soilpin 32


DHT dht(dhtpin,DHT11);

unsigned long epochTime;
unsigned long dataMillis=0;

const char* ntpserver="pool.ntp.org";
String serverName = "https://smartwaterring.herokuapp.com/post";

StaticJsonDocument<500> doc;


// -- Project -------------------------------------------
//#define CLIENT                  "Office Acera"        // Client ID for the ESP (or something descriptive "Front Garden")
//#define TYPE                    "ESP32"               // Type of Sensor ("Hornbill ESP32" or "Higrow" or "ESP8266" etc.)  

// -- Other - Helpers ------------------------------------
#define uS_TO_S_FACTOR          1000000               // Conversion factor for micro seconds to seconds
#define TIME_TO_SLEEP           300                   // Time ESP32 will go to sleep (in seconds) 
#define TIME_TO_SNOOZE          5    

void setup()
{
  Serial.begin(115200);
  dht.begin();

  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  Serial.print(" with password ");
  Serial.println(WIFI_PASSWORD);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");

}
void loop()
{
 if(millis()- dataMillis > 15000 || dataMillis == 0){

  dataMillis =millis();
  
  epochTime-getTime();

  Serial.println(epochTime);
  float temperature=dht.readTemperature();
  float humidity = dht.readHumidity();

  float moisture=analogRead(soilpin);
  float moisturePercent=100.00-((moisture/4095.00)*100);
  
  //humidity air 
  Serial.print("Temperature : ");
  Serial.print(String(temperature));
  Serial.print(" C°");

  Serial.print("\nHumidity : ");
  Serial.print(String(humidity));
  Serial.print(" %");
 

  //humidity sol
  Serial.print("\nMoisture : ");
  Serial.print(String(moisturePercent));
  Serial.print(" %");
  Serial.print("\n ");


  doc["temp"]= temperature;
  doc["hum"]= humidity;
  doc["humsol"]= moisturePercent;
  doc["electrovane"]= true;

  Serial.println("update data ...");
  POSTData();
  }
}



unsigned long getTime(){
    time_t now;

    struct tm timeinfo;
    if(!getLocalTime(&timeinfo)){
      return (0);
      }
      time(&now);
      return now;
 
  }





void POSTData()
{
      
      if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;
      //serverName=serverName+"/post";
      http.begin(serverName);
      http.addHeader("Content-Type", "application/json");

      String json;
      serializeJson(doc, json);

      Serial.println(json);
      int httpResponseCode = http.POST(json);
      Serial.println(httpResponseCode);
      }
}
