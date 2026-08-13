# PokéDex

Aplicación web para gestionar una colección personal de Pokémon. El proyecto está construido con React + Vite en el frontend y Node.js + Express en el backend.

## Funcionalidades

### Autenticación

- Registro de usuario.
- Inicio de sesión.
- Contraseñas almacenadas como hash.
- JWT para proteger endpoints privados.
- Cierre de sesión.

### PokéAPI

- Buscar por nombre o ID.
- Pokémon anterior/siguiente.
- Pokémon aleatorio.
- Imagen.
- Tipos.
- HP, ataque, defensa y velocidad.
- Generación.

### Colección personal

- Agregar el Pokémon mostrado a la colección.
- Evitar duplicados por usuario.
- Ver cantidad de Pokémon guardados.
- Marcar/desmarcar favoritos.
- Eliminar Pokémon.
- Datos aislados por usuario mediante `userId`.

## Arquitectura

```text
pokedex-manager/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthScreen.jsx
│   │   │   ├── CollectionPanel.jsx
│   │   │   ├── DPad.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Keypad.jsx
│   │   │   ├── LeftPanel.jsx
│   │   │   ├── PokemonScreen.jsx
│   │   │   ├── RightPanel.jsx
│   │   │   └── SearchPanel.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useCollection.js
│   │   │   └── usePokemon.js
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── pokeApi.js
│   │   ├── utils/
│   │   │   └── pokemon.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── data/
│   │   └── db.json
│   ├── src/
│   │   └── server.js
│   └── package.json
│
├── package.json
└── README.md
```

## Tecnologías

- React
- Vite
- JavaScript
- Node.js
- Express
- JWT
- bcryptjs
- PokéAPI
- JSON como almacenamiento persistente local

## Instalación

Requisitos:

- Node.js 18 o superior.
- npm.

Desde la carpeta raíz:

```bash
npm install
npm run install:all
```

Después:

```bash
npm run dev
```

Se iniciarán:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

También pueden iniciarse por separado:

```bash
npm run server
```

```bash
npm run client
```

## Uso

1. Abre `http://localhost:5173`.
2. Crea una cuenta.
3. Inicia sesión.
4. Busca un Pokémon por nombre o número.
5. Usa los botones anterior, siguiente o aleatorio.
6. Pulsa `＋ AGREGAR` para guardarlo.
7. Revisa tu colección en la parte inferior.
8. Usa `★` para marcar favoritos o `×` para eliminar.

Atajos:

- `←`: Pokémon anterior.
- `→`: Pokémon siguiente.
- `R`: Pokémon aleatorio.

## Persistencia

La información local se guarda en:

```
server/data/db.json
```

No se guarda la contraseña directamente: el backend utiliza `bcryptjs` para almacenar un hash.

## Variables de entorno

El backend acepta dentro de un archivo .env:

```
PORT=4000
JWT_SECRET=una-clave-secreta-segura
```

Si no se proporciona `JWT_SECRET`, el proyecto utiliza una clave por defecto.
