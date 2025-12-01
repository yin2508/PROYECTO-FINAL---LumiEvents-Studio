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

    // Brayand: Aquí más adelante conectaremos el formulario de contacto con WhatsApp o EmailJS.
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Este formulario se conectará con WhatsApp o EmailJS en la versión final del proyecto.');
            contactForm.reset();
        });
    }
});
