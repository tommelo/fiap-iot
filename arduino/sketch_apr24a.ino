#include <Stepper.h>
#include "DHT.h"

//lampada
#define LED 13 // Pin 13 onde esta conectado o LED
char rxChar = 0; // RXcHAR holds the received command.

//temperatura
#define DHTPIN A2 // temperatura
#define DHTTYPE DHT11 // DHT 11
DHT dht(DHTPIN, DHTTYPE);
float temperatura;

//ar condicionado
int ledInfoAR = 6; //emissor infra vermelho
int ventoinha = 7;//ventoinha
float armazenavalor = 0;

//alarme
int pinBuzzer = 8; //buzzer
int pinSensorPIR = 11; //sensor de presença
int valorSensorPIR = 0; //1 detecta algum movimento e 0 não detecta
int SensorLigado = 0; //0 sensor desligado e 1 sensor ligado

//portao
const int stepsPerRevolution = 500; 
Stepper myStepper(stepsPerRevolution, 2,4,3,5); //motor de passo
int posicaoPortao = 0; //0 fechado, 1 aberto



//Funcao com menu
void printMenu() {
  Serial.println("--- Serial Monitor ---");
  Serial.println("1 -> Ligar a luz");
  Serial.println("2 -> Apagar a luz");
  Serial.println("3 -> Verificar temperatura");
  Serial.println("4 -> Ligar ar condicionado");
  Serial.println("5 -> Desligar ar condicionado");
  Serial.println("6 -> Ligar alarme");
  Serial.println("7 -> Desligar alarme");
  Serial.println("8 -> Abrir portão");
  Serial.println("9 -> Fechar portão");

  //Serial.println("a -> Ligar o LED");
  //Serial.println("d -> Desligar o LED");
  //Serial.println("s -> Status do LED");
}

void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);

  dht.begin();

  Serial.flush();
  printMenu();

  pinMode(ledInfoAR, OUTPUT);
  pinMode(ventoinha, OUTPUT);

  pinMode(pinBuzzer, OUTPUT);
  pinMode(pinSensorPIR, INPUT);

  myStepper.setSpeed(60);
}

void loop() {
    //sensor de presença
    if (SensorLigado == 1) {
      valorSensorPIR = digitalRead(pinSensorPIR);
      if (valorSensorPIR == 1) {
        Serial.println(valorSensorPIR);
        tone(pinBuzzer, 1500);
        delay(4000);
        noTone(pinBuzzer);
      }
    }
    
  if (Serial.available() > 0) { // Verifica se recebeu alguma coisa no buffer
    rxChar = Serial.read(); // Salva o caracter lido
    Serial.flush(); // Limpa o buffer

    switch (rxChar) {

    case '1':
      if (digitalRead(LED) == LOW) {
        digitalWrite(LED, HIGH);
        Serial.println("Lampada Ligada");
      } else
        Serial.println("A lampada ja esta ligada");
      break;

    case '2':
      if (digitalRead(LED) == HIGH) {
        digitalWrite(LED, LOW);
        Serial.println("Lampada desligada");
      } else Serial.println("A Lampada ja esta desligada");
      break;

    case '3':
      temperatura = dht.readTemperature();
       if (isnan(temperatura)){
          Serial.println("Failed to read from DHT");
       } 
       else{
          Serial.println(temperatura);
       }
      break;

    case '4':
      if (armazenavalor == 0) {
        armazenavalor = 1;
        digitalWrite(ledInfoAR, HIGH);
        delay(200);
        digitalWrite(ledInfoAR, LOW);
        digitalWrite(ventoinha, HIGH);
        Serial.println("Ar Condicionado ligado");
      } else Serial.println("O ar condicionado ja esta ligado");
      break;

    case '5':
      if (armazenavalor == 1) {
        armazenavalor = 0;
        digitalWrite(ledInfoAR, HIGH);
        delay(200);
        digitalWrite(ledInfoAR, LOW);
        digitalWrite(ventoinha, LOW);
        Serial.println("Ar Condicionado desligado");
      } else Serial.println("O ar condicionado ja esta desligado");
      break;

    case '6':
      if (SensorLigado == 0) {
        SensorLigado = 1;
        Serial.println("Alarme de presença ligado");
      } else Serial.println("O alarme de presença ja esta ligado");
      break;

    case '7':
      if (SensorLigado == 1) {
        SensorLigado = 0;
        Serial.println("Alarme de presença desligado");
      } else Serial.println("O alarme de presença ja esta desligado");
      break;

    case '8':
      if (posicaoPortao == 0) {
        Serial.println("Abrindo o portão");
        posicaoPortao = 1;
        myStepper.step(-512);//Gira o motor no sentido horario a 90 graus
      } else Serial.println("O portão já está aberto");
      break;

    case '9':
      if (posicaoPortao == 1) {
        Serial.println("Fechando o portão");
        posicaoPortao = 0;
        myStepper.step(512);//Gira o motor no sentido ant-horario a 90 graus
      } else Serial.println("O portão já está fechado");
      break;

    default:
      Serial.print("'");
      Serial.print((char) rxChar);
      Serial.println("' nao eh um comando valido!");
    }
  }
}
