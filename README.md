# 🔍 Demoblaze API Testing con Cypress

Este proyecto realiza pruebas automatizadas con Cypress sobre los endpoints de autenticación de la API de [Demoblaze](https://api.demoblaze.com).

## 📦 ¿Qué se prueba?

- Registro exitoso de un nuevo usuario
- Intento de registro con usuario ya existente
- Login con credenciales correctas
- Login con contraseña incorrecta

## 🛠️ Tecnologías utilizadas

- [Cypress](https://www.cypress.io/) v14+
- [@faker-js/faker](https://github.com/faker-js/faker) para generación dinámica de datos
- JavaScript (ESModules)

## 📁 Estructura del proyecto

```bash
cypress/
├── e2e/
│   └── api_auth.cy.js    # Tests automatizados a la API de login/signup
cypress.config.js          # Configuración de Cypress con task para logging
README.md                  # Este archivo
```

## 🧪 Cómo ejecutar las pruebas

### 1. Clona el repositorio

```bash
git clone <url-del-repo>
cd <carpeta>
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Corre los tests en modo interactivo

```bash
npx cypress open
```

> Selecciona `E2E Testing`, elige tu navegador y haz click en el archivo `api_auth.cy.js`.

### 4. O corre en terminal (modo headless)

```bash
npx cypress run --spec "cypress/e2e/api_auth.cy.js"
```

## 🧠 Detalles técnicos

- Se generan credenciales aleatorias con `faker` para evitar conflictos de duplicados.
- La API responde con texto plano (`Auth_token: valor`), por lo que se hace un parser manual para extraer el token.
- Se usa `cy.task('logToTerminal', ...)` para imprimir información útil en consola desde los tests.

## 📌 Consideraciones

- La API de Demoblaze responde con código `200` incluso cuando hay errores, por eso se manejan los mensajes de error en el body.
