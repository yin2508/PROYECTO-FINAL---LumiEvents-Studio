# PROYECTO-FINAL---LumiEvents-Studio
Proyecto Final, para la materia de Programación Web. Participantes: Brayand Estrella, Diego Martijena, Whitney Milena de Los Santos y Yineth Herrera


## ✨ Descripción del Proyecto

**LumiEvents Studio** es una plataforma web desarrollada como proyecto académico para simular un sitio profesional de organización de eventos.

Incluye dos partes principales:

### 🌐 1. **Página Pública (Sitio Web principal)**

Los visitantes pueden ver:

* Banner con textos dinámicos
* Servicios ofrecidos
* Portafolio de imágenes
* Información de la empresa
* Testimonios
* Formulario de contacto
* Enlaces a WhatsApp e Instagram

La información visual se actualiza automáticamente en base a los datos gestionados desde el panel admin.

---

### 🛠️ 2. **Panel Administrativo (CMS básico simulado)**

Permite al emprendedor administrar:

#### ✔ Textos principales

* Título y descripción del banner
* Texto de bienvenida del inicio

#### ✔ Servicios (CRUD completo)

* Agregar, editar y eliminar servicios
* Vista previa del ícono
* Buscador de servicios
* Ordenar A–Z / Z–A

#### ✔ Galería (portafolio)

* Añadir imágenes del sitio por URL
* Eliminar imágenes
* Vista previa
* Buscador

#### ✔ Ajustes generales del sitio

* Color del botón principal
* Color del texto principal
* Color del fondo general
* Tema claro/oscuro del panel

Toda la información se guarda usando **localStorage**, simulando el comportamiento de un CMS real sin backend.

---

## 🧪 Tecnologías utilizadas

| Área                   | Tecnologías                             |
| ---------------------- | --------------------------------------- |
| **Frontend**           | HTML5, CSS3, JavaScript Vanilla         |
| **Almacenamiento**     | localStorage (simulación CMS)           |
| **Diseño**             | Adaptado a estética profesional moderna |
| **Responsive**         | Media Queries                           |
| **Control de versión** | Git & GitHub                            |

---

## 📂 Estructura del Proyecto

```
/LumiEvents-Studio
│
├── index.html            # Página pública
├── admin.html            # Panel administrativo (CMS)
│
├── /CSS
│   └── lumievents.css    # Estilos globales + modo admin
│
├── /JS
│   └── lumievent.js      # Lógica completa del sitio + CMS
│
├── /IMAGENES             # Recursos visuales
│
└── README.md             # Documentación del proyecto
```

---

## 🔥 Funcionalidades destacadas

### ⭐ Sistema CMS simulado

El panel administrativo alimenta dinámicamente el contenido de la página pública.

### ⭐ Administración de servicios

* Crear
* Editar (carga en el formulario)
* Eliminar
* Ordenar
* Previsualizar iconos

### ⭐ Galería dinámica

* Se agregan imágenes por URL
* Botón para eliminar
* Buscador
* Miniaturas en tiempo real

### ⭐ Personalización visual

* Cambios instantáneos en colores
* Persistencia en storage
* Tema claro/oscuro

### ⭐ Autoguardado y validaciones

Sistema intuitivo con alertas y confirmaciones.

---

## 🚀 Instrucciones para ejecutar el proyecto

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/LumiEvents.git
```

### 2️⃣ Abrir el proyecto

Puedes abrir el proyecto en tu editor favorito (VS Code recomendado).

### 3️⃣ Ejecutar localmente

Solo abre `index.html` y `admin.html` en tu navegador.
No requiere servidor.

---

## 🧩 Cómo funciona el CMS simulado

Toda la información es almacenada en:

```
localStorage['lumievents-data']
```

Dentro se guarda:

```json
{
  "textos": { },
  "servicios": [ ],
  "galeria": [ ],
  "ajustes": { }
}
```

Esto simula una base de datos pequeña.
Cuando el usuario recarga la página, todo se restaura automáticamente.

---

## 📱 Responsive Design

El sitio aplica breakpoints para adaptarse a:

* Móviles
* Tablets
* Laptops
* Pantallas grandes

---

## 👥 Autores (comentarios como en el código)

* **Milena** 
* **Diego** 
* **Yineth** 
* **Brayand Estrella** 

---

## 📝 Licencia

Proyecto académico sin fines comerciales.


