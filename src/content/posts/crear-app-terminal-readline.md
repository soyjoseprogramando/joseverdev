---
title: "Como crear una app de terminal con readline en Node.js"
date: "2025-10-14"
---

# Como crear una app de terminal con readline en Node.js

En este post te mostraré cómo crear una aplicación de terminal interactiva utilizando el módulo `readline` de Node.js. Este módulo nos permite hacer preguntas al usuario en la terminal, esperar a que este responda, y luego procesar esa respuesta.

## Paso 1: Crear un proyecto de Node.js

Primero, crea un nuevo directorio para tu proyecto y navega a él:

```bash
mkdir terminal-app
cd terminal-app
```

Luego, inicializa un nuevo proyecto de Node.js:

```bash
npm init -y
```

Esto creará un archivo `package.json` con la configuración predeterminada.

Ahora abre el proyecto con VsCode con

```bash
code .
```

Y ahora crea tu archivo `index.js`. Deberias tener estos dos archivos así:

```bash.
├── index.js
└── package.json
```

## Paso 2: Crear la interfaz de readline

Dentro de tu archivo `index.js`, importa el módulo `readline` y crea una interfaz para interactuar con la terminal:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
```

### Haciendo preguntas al usuario desde la terminal

Con esta interfaz, ya podemos hacer preguntas al usuario y recibir sus respuestas.

```js
rl.question("Cual es tu nombre? ", (name) => {
  console.log(`Hola ${name} tu nombre es horrible!`);
  rl.close();
});
```

En este ejemplo, hacemos la pregunta "Cual es tu nombre? ", esperamos a que el usuario responda y luego imprimimos "Hola [nombre] tu nombre es horrible!" en la terminal.

Al ejecutar el archivo con `node index.js`, verás la pregunta en la terminal. Después de que el usuario ingrese su nombre y presione Enter, se mostrará el mensaje de saludo.

```bash
$ node index.js
Cual es tu nombre? Johan
Hola Johan tu nombre es horrible!
```

## Paso 3: Creando un modulo para manejar las preguntas

Para mantener nuestro código organizado, podemos crear un módulo separado para manejar las preguntas. Crea un archivo llamado `questions.js` y agrega el siguiente código:

```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const closeQuestion = () => {
  rl.close();
};

module.exports = { askQuestion, closeQuestion };
```

> **Nota — ESM vs CommonJS:**  
> Si usas ESM (import/export) o CommonJS (require/module.exports) debes ajustar los ejemplos de código y la configuración (por ejemplo `package.json` -> `"type": "module"` para ESM). Revisa la sección correspondiente de tu entorno antes de copiar y pegar.

Como puedes ver tengo dos funciones, `askQuestion` que hace una pregunta y devuelve una promesa con la respuesta del usuario, y `closeQuestion` que cierra la interfaz de readline. Es importante recalcar que siempre debemos cerrar la interfaz cuando ya no la necesitemos para liberar recursos, generalmente es lo ultimo que se hace, pues si se cierra antes de tiempo no podremos hacer mas preguntas.

## Paso 4: Usando el modulo de preguntas en index.js

Ahora, en tu archivo `index.js`, importa el módulo de preguntas y úsalo para hacer preguntas al usuario. Ten en cuenta que `askQuestion` devuelve una promesa, por lo que usaremos `async/await` para manejar las respuestas de manera secuencial.

```javascript
const { askQuestion, closeQuestion } = require("./questions");

const main = async () => {
  const name = await askQuestion("Cual es tu nombre? ");
  console.log(`Hola ${name} tu nombre es horrible!`);

  const age = await askQuestion("Cuantos años tienes? ");
  console.log(`Wow, ${age} años! Eres muy viejo! Mañana te enterramos`);

  closeQuestion();
};

main();
```

En este ejemplo, usamos `askQuestion` para hacer dos preguntas: el nombre y la edad del usuario. Luego, imprimimos mensajes personalizados basados en sus respuestas. Finalmente, llamamos a `closeQuestion` para cerrar la interfaz de readline.
Al ejecutar el archivo con `node index.js`, verás las preguntas en la terminal y las respuestas se procesarán de manera secuencial:

```bash
$ node index.js
Cual es tu nombre? Johan
Hola Johan tu nombre es horrible!
Cuantos años tienes? 30
Wow, 30 años! Eres muy viejo! Mañana te enterramos
```

## Epilogo

Listo. Has creado una aplicación de terminal interactiva en Node utilizando el módulo `readline`. Aunque es una app todo pendeja, puedes expandir esta aplicación agregando más preguntas, validaciones de entrada e integrarla con otras funcionalidades de Node para hacer algo realmente útil.
