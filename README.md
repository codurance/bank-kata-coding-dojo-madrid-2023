# Bank kata - API REST

## Instrucciones

Hay que implementar un POC (prueba de concepto) de un API REST para un banco, el sistema tiene que contar con los siguientes endpoints:

- POST **/deposit**: Permite al usuario depositar dinero. El cuerpo de la petición tiene el siguiente formato:
```json
{
  "amount": number // Cantidad de dinero a depositar, debe ser un número mayor a 0
}
```
- POST **/withdraw**: Permite al usuario retirar dinero. El cuerpo de la petición tiene el siguiente formato:
```json
{
  "amount": number // Cantidad de dinero a retirar, debe ser un número mayor a 0
}
```
- GET **/transactions**: Permite al usuario ver los movimientos que ha realizado. El listado de movimientos deberá estar ordenado de movimientos más recientes a movimientos más antiguos. El formato del listado de movimientos es el siguiente:
```json
[{
  "amount": number, // Cantidad del movimiento
  "balance": number, // Cantidad de dinero total del usuario
  "date": string, // fecha en la que se realiza el movimiento
}]
```

Este MVP debe tener persistencia de datos, por ahora al ser un POC, la persistencia será en un fichero en el propio sistema de ficheros dónde se encuentre la API.

El test de aceptación de este sistema definido en Gherkin es el siguiente:

```gherkin
Given el usuario hace un depósito de 1000 el 10-01-2012
And el usuario hace un depósito de 2000 el 13-01-2012
And el usuario retira 500 el 14-01-2012
When el usuario consulta los movimientos realizados
Then los movimientos serán:
[{
amount: -500,
balance: 2500,
date: '14/01/2012'
},
{
amount: 2000,
balance: 3000,
date: '13/01/2012'
},
{
amount: 1000,
balance: 1000,
date: '10/01/2012'
}]
```

## Referencias

Esta kata está basada en [Bank Kata propuesta por Sandro Mancuso](https://www.codurance.com/katalyst/bank)

