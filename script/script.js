const botonBuscar = document.getElementById("btnBuscar");
const campoBuscar = document.getElementById("buscar");
const selectorTema = document.getElementById("tema");
const zonaResultado = document.getElementById("resultado");

const colorBodyInicial = getComputedStyle(document.body).background;
const colorHeaderInicial = getComputedStyle(document.querySelector("header")).background;
const colorFooterInicial = getComputedStyle(document.querySelector("footer")).background;

botonBuscar.addEventListener("click", () => {
    const nombre = campoBuscar.value.toLowerCase();

    fetch("galeria.xml")
        .then(res => res.text())
        .then(texto => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(texto, "text/xml");
            const lista = xml.getElementsByTagName("personaje");

            let encontrado = false;
            zonaResultado.innerHTML = "";

            for (let personaje of lista) {
                const titulo = personaje.getElementsByTagName("titulo")[0].textContent;
                const descripcion = personaje.getElementsByTagName("descripcion")[0].textContent;
                const imagen = personaje.getElementsByTagName("imagen")[0].textContent;

                if (titulo.toLowerCase() === nombre) {
                    encontrado = true;

                    zonaResultado.innerHTML = `
                        <div class="tarjeta">
                            <img src="${imagen}" alt="${titulo}" style="width:250px">
                            <h3>${titulo}</h3>
                            <p>${descripcion}</p>
                        </div>
                    `;
                }
            }

            if (!encontrado) {
                zonaResultado.textContent = "Prueba con otro, ese no se encuentra en la lista.";
            }
        });
});

selectorTema.addEventListener("change", () => {
    const tema = selectorTema.value;

    if (tema === "claro") {
        document.body.style.background = "linear-gradient(135deg, white, #dcdcdc)";
        document.body.style.color = "black";
    }

    if (tema === "oscuro") {
        document.body.style.background = "linear-gradient(to bottom left, grey, transparent), linear-gradient(to top right, black, transparent) ";
        document.body.style.color = "white";
    }

    if (tema === "personal") {
        window.open("color.html", "_blank");
    }

    if (tema === "restaurar") {
        restaurarColores();
    }
});

const colorBody = localStorage.getItem("colorBody");
const colorHeader = localStorage.getItem("colorHeader");
const colorFooter = localStorage.getItem("colorFooter");

if (colorBody) document.body.style.background = colorBody;
if (colorHeader) document.querySelector("header").style.background = colorHeader;
if (colorFooter) document.querySelector("footer").style.background = colorFooter;

function restaurarColores() {
    document.body.style.background = colorBodyInicial;
    document.querySelector("header").style.background = colorHeaderInicial;
    document.querySelector("footer").style.background = colorFooterInicial;

    localStorage.removeItem("colorBody");
    localStorage.removeItem("colorHeader");
    localStorage.removeItem("colorFooter");
}
