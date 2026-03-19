const botonBuscar = document.getElementById("btnBuscar");
const campoBuscar = document.getElementById("buscar");
const selectorTema = document.getElementById("tema");
const zonaResultado = document.getElementById("resultado");

// Variables para el modal de colores personalizados
const panelColores = document.getElementById("panelColores");
const inputBody = document.getElementById("colorBody");
const inputHeader = document.getElementById("colorHeader");
const inputFooter = document.getElementById("colorFooter");
const botonAplicar = document.getElementById("btnAplicarColores");
const btnCerrarModalColores = document.getElementById("btnCerrarModalColores");

// Variables para el modal de añadir tarjetas
const modalAdd = document.getElementById("modalAdd");
const btnAdd = document.getElementById("btnAdd");
const btnGuardarTarjeta = document.getElementById("btnGuardarTarjeta");
const btnCerrarModalAdd = document.getElementById("btnCerrarModalAdd");

const colorBodyInicial = "linear-gradient(to bottom, #6a0dad, #000000)";
const colorHeaderInicial = "#1e1e1e";
const colorFooterInicial = "#1e1e1e";

// Con esto hacemos que la pagina "cargue" de forma predeterminada todas las tarjeta
window.addEventListener("DOMContentLoaded", () => {
    cargarGaleria("");
});

// Función principal para cargar el xml y filtrar
function cargarGaleria(filtro) {
    fetch("data/data.xml")
        .then(res => res.text())
        .then(texto => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(texto, "text/xml");
            const lista = xml.getElementsByTagName("personaje");

            let encontrado = false;
            zonaResultado.innerHTML = ""; // con esto eliminamos el contenido antes de pintar el resultado

            for (let personaje of lista) {
                const titulo = personaje.getElementsByTagName("titulo")[0].textContent;
                const descripcion = personaje.getElementsByTagName("descripcion")[0].textContent;
                let imagen = personaje.getElementsByTagName("imagen")[0].textContent;

                // este condicional filtra por texto (ignora mayúsculas/minúsculas)
                if (titulo.toLowerCase().includes(filtro.toLowerCase()) || filtro === "") {
                    encontrado = true;
                    crearTarjetaDOM(titulo, descripcion, imagen);
                }
            }

            if (!encontrado) { // si no encuentra un resultado muestra un mensaje de error
                zonaResultado.innerHTML = "<p style='grid-column: 1 / -1; text-align: center;'>Prueba con otro, ese no se encuentra en la lista.</p>";
            }
        })
        .catch(error => console.error("Error al cargar el XML:", error));
}

// Función para pintar una tarjeta en el DOM usando Flexbox en columna
function crearTarjetaDOM(titulo, descripcion, imagenSrc) {
    const div = document.createElement("div");
    div.className = "tarjeta";
    
    // Estilos Flexbox en columna
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.alignItems = "center";
    div.style.background = "#2a2a2a";
    div.style.padding = "15px";
    div.style.borderRadius = "10px";
    div.style.textAlign = "center";
    div.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3)";
    
    div.innerHTML = `
        <img src="${imagenSrc}" alt="${titulo}" style="width: 100%; height: 250px; border-radius: 8px; object-fit: cover; object-position: center;">
        <h3 style="margin: 15px 0 10px 0;">${titulo}</h3>
        <p style="font-size: 14px; margin: 0;">${descripcion}</p>
    `;
    zonaResultado.appendChild(div);
}

// Con esto hacemos que al hacer click se llame a la funcion de cargar la galeria y filtre por el valor indicado
botonBuscar.addEventListener("click", () => {
    cargarGaleria(campoBuscar.value);
});

// listener para cambiar los colores de la pagina
selectorTema.addEventListener("change", () => {
    const tema = selectorTema.value;

    if (tema === "personal") {
        panelColores.style.display = "flex";
        return;
    }

    panelColores.style.display = "none";

    if (tema === "claro") {
        document.body.style.background = "linear-gradient(135deg, #ffffff, #becede)";
        document.body.style.color = "white";
        document.body.main.style.color = "#ffffff";
        document.querySelector("header").style.background = "#eacece";
        document.querySelector("footer").style.background = "#c4c2ea";
    }

    if (tema === "oscuro") {
        document.body.style.background = "linear-gradient(135deg, #000000, #2b2b2b)";
        document.body.style.color = "white";
        document.body.main.style.color = "#ffffff";
        document.querySelector("header").style.background = "#1e1e1e";
        document.querySelector("footer").style.background = "#1e1e1e";
    }

    if (tema === "restaurar") {
        document.body.style.background = colorBodyInicial;
        document.body.style.color = "white";
        document.querySelector("main").style.color = colorBodyInicial;
        document.querySelector("header").style.background = colorHeaderInicial;
        document.querySelector("footer").style.background = colorFooterInicial;
    }
});

botonAplicar.addEventListener("click", () => {
    document.body.style.background = inputBody.value;
    document.querySelector("header").style.background = inputHeader.value;
    document.querySelector("footer").style.background = inputFooter.value;
    panelColores.style.display = "none";
});

btnCerrarModalColores.addEventListener("click", () => {
    panelColores.style.display = "none";
    selectorTema.value = "restaurar"; 
});

// listener para añadir una nueva tarjeta
btnAdd.addEventListener("click", () => {
    modalAdd.style.display = "flex";
});

btnCerrarModalAdd.addEventListener("click", () => {
    modalAdd.style.display = "none";
});

btnGuardarTarjeta.addEventListener("click", () => {
    const titulo = document.getElementById("nuevoTitulo").value;
    const desc = document.getElementById("nuevaDesc").value;
    const inputImagen = document.getElementById("nuevaImagen");
    const archivo = inputImagen.files[0];

    if (titulo && desc && archivo) {
        let reader = new FileReader();
        
        reader.onload = function(e) {
            const rutaImagen = e.target.result; 
            
            // Añadimos la nueva tarjeta dinámicamente al <main>
            crearTarjetaDOM(titulo, desc, rutaImagen);
            
            // Limpiamos los campos y cerramos
            document.getElementById("nuevoTitulo").value = "";
            document.getElementById("nuevaDesc").value = "";
            inputImagen.value = "";
            modalAdd.style.display = "none";
        }
        
        reader.readAsDataURL(archivo); 
    } else {
        alert("Por favor, rellena todos los campos y selecciona una imagen desde tu ordenador.");
    }
});