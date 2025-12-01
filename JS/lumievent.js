// ===============================
// LUMIEVENTS STUDIO – APP.JS
// ===============================

// Brayand: Definimos una clave única para guardar todo en localStorage.
const STORAGE_KEY = 'lumievents-data';

// Diego: Datos por defecto, por si es la primera vez que se abre la página.
const defaultData = {
    textos: {
        heroTitle: 'Permítenos ser los arquitectos de momentos inolvidables, donde cada detalle cuenta y cada evento habla por sí mismo.',
        heroDescription: 'En LumiEvents Studio te ofrecemos no solo un servicio, sino una experiencia personalizada, cálida y jubilosa.',
        introText: 'Diseñamos y organizamos eventos íntimos, bodas, conferencias y celebraciones especiales, cuidando cada detalle para que tú solo disfrutes del momento.'
    },
    servicios: [],
    galeria: []
};

// Milena: Función para leer la configuración desde localStorage.
function loadData() {
    const dataString = localStorage.getItem(STORAGE_KEY);
    if (!dataString) {
        // Si no hay datos, devolvemos los valores por defecto.
        return structuredClone(defaultData);
    }

    try {
        return JSON.parse(dataString);
    } catch (error) {
        console.error('Error al parsear localStorage, se usará defaultData', error);
        return structuredClone(defaultData);
    }
}

// Yineth: Guardamos la configuración actualizada en localStorage.
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===============================
// LÓGICA PÁGINA PÚBLICA (index.html)
// ===============================

function initPublicPage() {
    const data = loadData();

    // Milena: Aplicamos textos dinámicamente para simular el CMS.
    const heroTitle = document.getElementById('hero-title');
    const heroDescription = document.getElementById('hero-description');
    const introText = document.getElementById('intro-text');

    if (heroTitle) heroTitle.textContent = data.textos.heroTitle;
    if (heroDescription) heroDescription.textContent = data.textos.heroDescription;
    if (introText) introText.textContent = data.textos.introText;

    // Brayan: Por ahora mostramos solo un console.log para verificar datos.
    console.log('Datos cargados en la página pública:', data);

    // Diego: Más adelante aquí vamos a renderizar los servicios y la galería totalmente dinámicos.
    // De momento dejamos los servicios estáticos que están en el HTML.
    // Cuando conectemos el panel, llenaremos desde data.servicios y data.galeria.
}

// ===============================
// LÓGICA PANEL ADMIN (admin.html)
// ===============================

function initAdminPage() {
    let data = loadData();

    // Milena: Referencias a los campos de texto del formulario de textos principales.
    const heroTitleInput = document.getElementById('heroTitleInput');
    const heroDescriptionInput = document.getElementById('heroDescriptionInput');
    const introTextInput = document.getElementById('introTextInput');
    const formTextos = document.getElementById('form-textos');

    if (heroTitleInput && heroDescriptionInput && introTextInput && formTextos) {
        // Cargamos los valores actuales en los inputs.
        heroTitleInput.value = data.textos.heroTitle;
        heroDescriptionInput.value = data.textos.heroDescription;
        introTextInput.value = data.textos.introText;

        formTextos.addEventListener('submit', (event) => {
            event.preventDefault();

            // Yineth: Actualizamos los textos dentro del objeto data.
            data.textos.heroTitle = heroTitleInput.value;
            data.textos.heroDescription = heroDescriptionInput.value;
            data.textos.introText = introTextInput.value;

            saveData(data);
            alert('Textos guardados correctamente.');
        });
    }

    // ================== SERVICIOS (CRUD BÁSICO) ==================
    const formServicio = document.getElementById('form-servicio');
    const listaServicios = document.getElementById('lista-servicios');

    function renderServicios() {
        if (!listaServicios) return;
        listaServicios.innerHTML = '';

        data.servicios.forEach((servicio, index) => {
            const li = document.createElement('li');
            li.textContent = servicio.nombre + ' – ' + servicio.descripcion;

            // Botones Editar y Eliminar
            const btnEdit = document.createElement('button');
            btnEdit.textContent = 'Editar';
            btnEdit.classList.add('btn-edit');

            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Eliminar';
            btnDelete.classList.add('btn-delete');

            // Brayand: Botón eliminar para quitar un servicio del arreglo.
            btnDelete.addEventListener('click', () => {
                data.servicios.splice(index, 1);
                saveData(data);
                renderServicios();
            });

            // Diego: Botón editar que simplemente carga el servicio en el formulario.
            btnEdit.addEventListener('click', () => {
                document.getElementById('servicioNombre').value = servicio.nombre;
                document.getElementById('servicioDescripcion').value = servicio.descripcion;
                document.getElementById('servicioIconoUrl').value = servicio.iconoUrl || '';

                // Borramos el elemento actual para que al guardar se reemplace.
                data.servicios.splice(index, 1);
                saveData(data);
                renderServicios();
            });

            const buttonBox = document.createElement('div');
            buttonBox.appendChild(btnEdit);
            buttonBox.appendChild(btnDelete);

            li.appendChild(buttonBox);
            listaServicios.appendChild(li);
        });
    }

    if (formServicio && listaServicios) {
        formServicio.addEventListener('submit', (event) => {
            event.preventDefault();

            const nombre = document.getElementById('servicioNombre').value.trim();
            const descripcion = document.getElementById('servicioDescripcion').value.trim();
            const iconoUrl = document.getElementById('servicioIconoUrl').value.trim();

            if (!nombre || !descripcion) {
                alert('Por favor completa nombre y descripción del servicio.');
                return;
            }

            // Yineth: Creamos el objeto servicio y lo agregamos al arreglo.
            const nuevoServicio = { nombre, descripcion, iconoUrl };
            data.servicios.push(nuevoServicio);
            saveData(data);

            // Limpiamos el formulario
            formServicio.reset();
            renderServicios();
        });

        // Render inicial
        renderServicios();
    }

    // ================== GALERÍA ==================
    const formGaleria = document.getElementById('form-galeria');
    const listaGaleria = document.getElementById('lista-galeria');

    function renderGaleria() {
        if (!listaGaleria) return;
        listaGaleria.innerHTML = '';

        data.galeria.forEach((url, index) => {
            const li = document.createElement('li');
            li.textContent = url;

            const btnDelete = document.createElement('button');
            btnDelete.textContent = 'Eliminar';
            btnDelete.classList.add('btn-delete');

            btnDelete.addEventListener('click', () => {
                data.galeria.splice(index, 1);
                saveData(data);
                renderGaleria();
            });

            li.appendChild(btnDelete);
            listaGaleria.appendChild(li);
        });
    }

    if (formGaleria && listaGaleria) {
        formGaleria.addEventListener('submit', (event) => {
            event.preventDefault();
            const url = document.getElementById('galeriaUrl').value.trim();

            if (!url) {
                alert('Por favor ingresa una URL válida.');
                return;
            }

            data.galeria.push(url);
            saveData(data);
            formGaleria.reset();
            renderGaleria();
        });

        renderGaleria();
    }

    console.log('Panel admin inicializado con datos:', data);
}

// ===============================
// INTERACCIÓN GENERAL (NAV, ETC.)
// ===============================

document.addEventListener('DOMContentLoaded', () => {
    // Milena: Detectamos qué tipo de página es (public o admin) con el data-page del body.
    const pageType = document.body.dataset.page;

    if (pageType === 'public') {
        initPublicPage();
    } else if (pageType === 'admin') {
        initAdminPage();
    }

    // Diego: Lógica simple para abrir/cerrar el menú en móviles.
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mainNav = document.querySelector('.main-nav');

    if (hamburgerBtn && mainNav) {
        hamburgerBtn.addEventListener('click', () => {
            mainNav.classList.toggle('open');
        });
    }

    // Yineth: Optimización del Formulario.
    const formContacto = document.querySelector('#contact-form');

if (formContacto) {

  const campoNombre = formContacto.querySelector('#nombre');
  const campoCorreo = formContacto.querySelector('#email');
  const campoMensaje = formContacto.querySelector('#mensaje');
  
  // Yineth: Mensaje creado debajo del input email para validación en tiempo real
  let emailFeedback = document.createElement("small");
  emailFeedback.style.display = "block";
  emailFeedback.style.marginTop = "4px";
  emailFeedback.style.fontSize = "14px";
  emailFeedback.style.fontWeight = "500";
  formContacto.querySelector('.campo-email')?.appendChild(emailFeedback);

  // --- 1) Validación de correo con API EVA ---
  async function validarCorreoAPI(correo) {
    try {
      const resp = await fetch(`https://api.eva.pingutil.com/email?email=${correo}`);
      const data = await resp.json();

      return data.data.deliverable; // true si el correo existe
    } catch (error) {
      console.error("Error validando correo:", error);
      return true; // si falla la API, no bloqueamos todo
    }
  }

  // --- 2) Validación en tiempo real ---
  campoCorreo.addEventListener("input", async () => {
    const correo = campoCorreo.value.trim();

    if (correo.length < 5) {
      emailFeedback.textContent = "Escribe un correo para validar…";
      emailFeedback.style.color = "#777";
      return;
    }

    emailFeedback.textContent = "Validando correo…";
    emailFeedback.style.color = "#444";

    const valido = await validarCorreoAPI(correo);

    if (valido) {
      emailFeedback.textContent = "✔ Correo válido";
      emailFeedback.style.color = "green";
    } else {
      emailFeedback.textContent = "✖ Este correo no es válido o no existe";
      emailFeedback.style.color = "red";
    }
  });

  // --- 3) Guardar contacto en localStorage ---
  function guardarContacto(nombre, correo, mensaje) {
    const contactos = JSON.parse(localStorage.getItem("contactos") || "[]");

    contactos.push({
      nombre,
      correo,
      mensaje,
      fecha: new Date().toISOString()
    });

    localStorage.setItem("contactos", JSON.stringify(contactos));
  }

  // --- 4) Manejo del envío del formulario ---
  formContacto.addEventListener('submit', async function (e) {

    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const mensaje = campoMensaje ? campoMensaje.value.trim() : "";

    // Validación básica
    if (!nombre || !correo) {
      e.preventDefault();
      alert('Por favor completa tu nombre y correo antes de enviar.');
      return false;
    }

    // Validación avanzada del correo usando API
    const correoValido = await validarCorreoAPI(correo);
    if (!correoValido) {
      e.preventDefault();
      alert("El correo ingresado no parece válido. Por favor revísalo.");
      return false;
    }

    // Guardamos internamente
    guardarContacto(nombre, correo, mensaje);

    // Envío simulado con fetch POST
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, mensaje })
      })
        .then(r => r.json())
        .then(data => console.log("Contacto enviado (simulado):", data));
    } catch (error) {
      console.error("Error al enviar contacto:", error);
    }

    // Dejar que la alerta original del proyecto se ejecute sin bloquear
    return true;
  });
}

});
