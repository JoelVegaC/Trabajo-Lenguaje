const botonBuscar = document.getElementById("btnBuscar");
const campoBuscar = document.getElementById("buscar");
const selectorTema = document.getElementById("tema");
const zonaResultado = document.getElementById("resultado");

const panelColores = document.getElementById("panelColores");
const inputBody = document.getElementById("colorBody");
const inputHeader = document.getElementById("colorHeader");
const inputFooter = document.getElementById("colorFooter");
const botonAplicar = document.getElementById("btnAplicarColores");

const colorBodyInicial = "linear-gradient(to bottom, #6a0dad, #000000)";
const colorHeaderInicial = "#1e1e1e";
const colorFooterInicial = "#1e1e1e";

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

            if (!encontrado) zonaResultado.textContent = "Prueba con otro, ese no se encuentra en la lista.";
        });
});

selectorTema.addEventListener("change", () => {
    const tema = selectorTema.value;

    if (tema === "personal") {
        panelColores.style.display = "flex";
        return;
    }

    panelColores.style.display = "none";

    if (tema === "claro") {
        document.body.style.background = "linear-gradient(135deg, #f5f4f4, #becede)";
        document.body.style.color = "black";
        document.querySelector("header").style.background = "#eacece";
        document.querySelector("footer").style.background = "#c4c2ea";
    }

    if (tema === "oscuro") {
        document.body.style.background = "linear-gradient(135deg, #000000, #2b2b2b)";
        document.body.style.color = "white";
        document.querySelector("header").style.background = "#1e1e1e";
        document.querySelector("footer").style.background = "#1e1e1e";
    }

    if (tema === "restaurar") {
        document.body.style.background = colorBodyInicial;
        document.body.style.color = "white";
        document.querySelector("header").style.background = colorHeaderInicial;
        document.querySelector("footer").style.background = colorFooterInicial;
    }
});

botonAplicar.addEventListener("click", () => {
    const bodyColor = inputBody.value;
    const headerColor = inputHeader.value;
    const footerColor = inputFooter.value;

    document.body.style.background = bodyColor;
    document.querySelector("header").style.background = headerColor;
    document.querySelector("footer").style.background = footerColor;

    panelColores.style.display = "none";
});
