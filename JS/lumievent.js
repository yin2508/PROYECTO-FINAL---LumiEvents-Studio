// ===========================================================
// LUMIEVENTS STUDIO – SCRIPT COMPLETO
// ===========================================================

// Brayand: Definimos una clave única para guardar todo el contenido.
const STORAGE_KEY = 'lumievents-data';

// Diego: Estructura base por defecto.
const defaultData = {
    textos: {
        heroTitle: 'Permítenos ser los arquitectos de momentos inolvidables, donde cada detalle cuenta y cada evento habla por sí mismo.',
        heroDescription: 'En LumiEvents Studio te ofrecemos no solo un servicio, sino una experiencia personalizada, cálida y jubilosa.',
        introText: 'Diseñamos y organizamos eventos íntimos, bodas, conferencias y celebraciones especiales, cuidando cada detalle para que disfrutes del momento.'
    },
    servicios: [],
    galeria: [],
    ajustes: {
        colorBoton: "#c89a2b",
        colorTexto: "#1f2933",
        colorFondo: "#ffffff",
        temaAdmin: "light"
    }
};

// Milena: Leer datos de localStorage.
function loadData() {
    const str = localStorage.getItem(STORAGE_KEY);
    if (!str) return structuredClone(defaultData);

    try {
        return JSON.parse(str);
    } catch (e) {
        console.error("Error leyendo localStorage, se cargarán valores base.", e);
        return structuredClone(defaultData);
    }
}

// Yineth: Guardar cambios en localStorage.
function saveData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ===========================================================
// PÁGINA PÚBLICA – index.html
// ===========================================================
function initPublicPage() {
    const data = loadData();

    // Milena: Aplicamos los textos guardados.
    const title = document.getElementById('hero-title');
    const desc = document.getElementById('hero-description');
    const intro = document.getElementById('intro-text');

    if (title) title.textContent = data.textos.heroTitle;
    if (desc) desc.textContent = data.textos.heroDescription;
    if (intro) intro.textContent = data.textos.introText;

    console.log("Datos cargados en página pública:", data);
}

// ===========================================================
// PÁGINA ADMINISTRATIVA – admin.html
// ===========================================================
function initAdminPage() {

    let data = loadData();

    // -------------------------------------------------------
    // 1. TEXTOS PRINCIPALES – Autosave + carga inicial
    // -------------------------------------------------------
    const heroTitleInput = document.getElementById("heroTitleInput");
    const heroDescriptionInput = document.getElementById("heroDescriptionInput");
    const introTextInput = document.getElementById("introTextInput");
    const formTextos = document.getElementById("form-textos");

    if (heroTitleInput && heroDescriptionInput && introTextInput) {

        // Diego: Cargar valores iniciales al panel
        heroTitleInput.value = data.textos.heroTitle;
        heroDescriptionInput.value = data.textos.heroDescription;
        introTextInput.value = data.textos.introText;

        // Brayand: Guardado manual
        formTextos.addEventListener("submit", e => {
            e.preventDefault();

            data.textos.heroTitle = heroTitleInput.value;
            data.textos.heroDescription = heroDescriptionInput.value;
            data.textos.introText = introTextInput.value;

            saveData(data);
            alert("Textos guardados correctamente.");
        });
    }

    // -------------------------------------------------------
    // 2. CRUD SERVICIOS – Agregar, editar, eliminar
    // -------------------------------------------------------
    const formServicio = document.getElementById("form-servicio");
    const listaServicios = document.getElementById("lista-servicios");
    const buscarServicio = document.getElementById("buscarServicio");

    function renderServicios() {
        listaServicios.innerHTML = "";
        pintarServicios(data.servicios);
    }

    // Función interna para pintar una lista filtrada (Brayand)
    function pintarServicios(arr) {
        listaServicios.innerHTML = "";

        arr.forEach((servicio, index) => {
            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${servicio.nombre}</strong> – ${servicio.descripcion}
                ${servicio.iconoUrl ? `<img src="${servicio.iconoUrl}" class="img-preview">` : ""}
            `;

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Eliminar";
            btnDelete.classList.add("btn-delete");

            const btnEdit = document.createElement("button");
            btnEdit.textContent = "Editar";
            btnEdit.classList.add("btn-edit");

            // Diego: Editar servicio
            btnEdit.addEventListener("click", () => {
                document.getElementById("servicioNombre").value = servicio.nombre;
                document.getElementById("servicioDescripcion").value = servicio.descripcion;
                document.getElementById("servicioIconoUrl").value = servicio.iconoUrl || "";

                data.servicios.splice(index, 1);
                saveData(data);
                renderServicios();
            });

            // Yineth: Confirmar eliminación
            btnDelete.addEventListener("click", () => {
                if (!confirm("¿Eliminar este servicio definitivamente?")) return;
                data.servicios.splice(index, 1);
                saveData(data);
                renderServicios();
            });

            li.appendChild(btnEdit);
            li.appendChild(btnDelete);
            listaServicios.appendChild(li);
        });
    }

    // FORMULARIO: Agregar servicio
    if (formServicio) {
        formServicio.addEventListener("submit", e => {
            e.preventDefault();

            const nombre = document.getElementById("servicioNombre").value.trim();
            const descripcion = document.getElementById("servicioDescripcion").value.trim();
            const iconoUrl = document.getElementById("servicioIconoUrl").value.trim();

            if (!nombre || !descripcion) {
                alert("Completa el nombre y la descripción.");
                return;
            }

            data.servicios.push({ nombre, descripcion, iconoUrl });
            saveData(data);

            formServicio.reset();
            renderServicios();
        });
    }

    // BUSCADOR de servicios
    if (buscarServicio) {
        buscarServicio.addEventListener("input", () => {
            const txt = buscarServicio.value.toLowerCase();

            const filtrados = data.servicios.filter(s =>
                s.nombre.toLowerCase().includes(txt) ||
                s.descripcion.toLowerCase().includes(txt)
            );

            pintarServicios(filtrados);
        });
    }

    // ORDENAR A–Z / Z–A
    document.getElementById("ordenarAZ")?.addEventListener("click", () => {
        data.servicios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        saveData(data);
        renderServicios();
    });

    document.getElementById("ordenarZA")?.addEventListener("click", () => {
        data.servicios.sort((a, b) => b.nombre.localeCompare(a.nombre));
        saveData(data);
        renderServicios();
    });

    renderServicios();

    // -------------------------------------------------------
    // 3. GALERÍA – CRUD + preview + buscador
    // -------------------------------------------------------
    const formGaleria = document.getElementById("form-galeria");
    const listaGaleria = document.getElementById("lista-galeria");
    const buscarImagen = document.getElementById("buscarImagen");

    function renderGaleria() {
        listaGaleria.innerHTML = "";

        data.galeria.forEach((url, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${url} <img src="${url}" class="img-preview">`;

            const del = document.createElement("button");
            del.textContent = "Eliminar";
            del.classList.add("btn-delete");

            del.addEventListener("click", () => {
                if (!confirm("¿Eliminar esta imagen?")) return;
                data.galeria.splice(index, 1);
                saveData(data);
                renderGaleria();
            });

            li.appendChild(del);
            listaGaleria.appendChild(li);
        });
    }

    if (formGaleria) {
        formGaleria.addEventListener("submit", e => {
            e.preventDefault();
            const url = document.getElementById("galeriaUrl").value.trim();

            if (!url) {
                alert("Ingresa una URL válida.");
                return;
            }

            data.galeria.push(url);
            saveData(data);
            formGaleria.reset();
            renderGaleria();
        });
    }

    if (buscarImagen) {
        buscarImagen.addEventListener("input", () => {
            const t = buscarImagen.value.toLowerCase();

            const filtradas = data.galeria.filter(url =>
                url.toLowerCase().includes(t)
            );

            listaGaleria.innerHTML = "";
            filtradas.forEach((url, index) => {
                const li = document.createElement("li");
                li.innerHTML = `${url} <img class="img-preview" src="${url}">`;

                const del = document.createElement("button");
                del.textContent = "Eliminar";
                del.classList.add("btn-delete");

                del.addEventListener("click", () => {
                    if (!confirm("Eliminar esta imagen?")) return;
                    data.galeria.splice(index, 1);
                    saveData(data);
                    renderGaleria();
                });

                li.appendChild(del);
                listaGaleria.appendChild(li);
            });
        });
    }

    renderGaleria();

    // -------------------------------------------------------
    // 4. AJUSTES GENERALES – colores + dark mode
    // -------------------------------------------------------
    const colorBoton = document.getElementById("colorBoton");
    const colorTexto = document.getElementById("colorTexto");
    const colorFondo = document.getElementById("colorFondo");
    const temaAdmin = document.getElementById("temaAdmin");

    // Milena: Cargar ajustes iniciales.
    if (data.ajustes) {
        colorBoton.value = data.ajustes.colorBoton;
        colorTexto.value = data.ajustes.colorTexto;
        colorFondo.value = data.ajustes.colorFondo;
        temaAdmin.value = data.ajustes.temaAdmin;

        aplicarAjustes(data.ajustes);
    }

    document.getElementById("guardarAjustes").addEventListener("click", () => {
        data.ajustes = {
            colorBoton: colorBoton.value,
            colorTexto: colorTexto.value,
            colorFondo: colorFondo.value,
            temaAdmin: temaAdmin.value
        };

        saveData(data);
        aplicarAjustes(data.ajustes);

        alert("Ajustes guardados correctamente.");
    });

    // Aplicar Visualmente los ajustes
    function aplicarAjustes(a) {
        // Diego: Aplicar colores dinámicos.
        document.documentElement.style.setProperty('--color-boton', a.colorBoton);
        document.body.style.color = a.colorTexto;
        document.body.style.backgroundColor = a.colorFondo;

        // Modo oscuro
        if (a.temaAdmin === "dark") {
            document.body.classList.add("admin-dark");
        } else {
            document.body.classList.remove("admin-dark");
        }
    }

    console.log("Panel administrativo cargado:", data);
}

// ===========================================================
// INTERACCIÓN GENERAL – Navegación móvil + formularios
// ===========================================================
document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.dataset.page;

    if (page === 'public') initPublicPage();
    if (page === 'admin') initAdminPage();

    // Diego: Menú hamburguesa
    const hamburger = document.getElementById("hamburgerBtn");
    const mainNav = document.querySelector(".main-nav");

    if (hamburger && mainNav) {
        hamburger.addEventListener("click", () => {
            mainNav.classList.toggle("open");
        });
    }

    // ✔ FORMULARIO CONTACTO – página pública
    const formContacto = document.querySelector('#contacto form');

    if (formContacto) {
        formContacto.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = formContacto.querySelector("#nombre").value.trim();
            const correo = formContacto.querySelector("#email").value.trim();
            const mensaje = formContacto.querySelector("#mensaje").value.trim();

            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!nombre) return alert("Escribe tu nombre.");
            if (!correo || !regex.test(correo)) return alert("Correo inválido.");
            if (!mensaje) return alert("Escribe un mensaje.");

            alert(`¡Gracias, ${nombre}! Tu mensaje se ha enviado correctamente.`);
            formContacto.reset();
        });
    }
});