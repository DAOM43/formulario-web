#Formulario Web con React y Node.js (ExcelJS)

Este es un proyecto completo que incluye tanto el **frontend como el backend en un mismo repositorio**. Fue creado como una tarea universitaria y consiste en un formulario web que permite registrar datos personales y guardarlos en un archivo Excel (`registros.xlsx`) de forma local.

#Tecnologías Utilizadas

- **React + Vite + TypeScript** (Frontend)
- **Node.js + Express** (Backend)
- **Bootstrap 5** para los estilos
- **Axios** para la comunicación entre frontend y backend
- **ExcelJS** para manipular archivos Excel (.xlsx)

#Estructura del Proyecto
formulario-web/
├── public/
├── server/
│ ├── excel/
│ │ └── registros.xlsx ⬅ Aquí se guardan los registros localmente
│ └── index.js ⬅ Backend con Express y ExcelJS
├── src/
│ ├── components/
│ │ └── Form.tsx ⬅ Componente principal del formulario
│ ├── styles/
│ │ └── FormStyles.css
│ ├── App.tsx
│ └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts

#Proyecto en línea

> El proyecto fue desplegado en **Vercel** y está conectado a un repositorio de GitHub, sin embargo, **solo funciona correctamente de forma local**, ya que el backend necesita acceso al sistema de archivos para guardar el archivo Excel, lo cual no es posible en producción en Vercel.

#Proyecto publicado en Vercel:
formulario-web-zkfg.vercel.app

#Funcionalidades

- Formulario interactivo con validación de campos.
- Guarda cada registro en un archivo Excel (`registros.xlsx`) en una nueva fila.
- Se ajustan automáticamente los anchos de columna en Excel.
- Encabezados con formato profesional (color, negrita y bordes).

#Cómo usarlo localmente

1. **Clonar el repositorio**
https://github.com/DAOM43/formulario-web/edit/main/README.md
cd formulario-web

2. Instalar dependencias
npm install
cd server
npm install

3. Ejecutar el backend local
node index.js

Ejecutar el frontend
npm run dev

Abrir en el navegador:
http://localhost:5173

*Limitaciones del despliegue
-El backend depende del acceso local al archivo registros.xlsx, lo cual no es posible en Vercel, ya que sus funciones no permiten escritura persistente en disco.
-Para hacerlo funcional en línea, se recomienda desplegar el backend en Render y conectar el frontend con esa API pública.

*Próxima mejora sugerida
-Separar el proyecto en dos carpetas: /client para React y /server para Node.js.
-Subir el backend a Render y conectar desde el frontend con su URL (https://formulario-backend-xxxx.onrender.com).

*Autor
Proyecto realizado por Daniel Ojeda, estudiante de Ingeniería en Sistemas — Universidad Mariano Gálvez de Guatemala.
