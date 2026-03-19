const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("buscar");
const selectorTema = document.getElementById("tema");
const resultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", () => {
    const nombreBuscado = inputBuscar.value.toLowerCase();

    fetch("galeria.xml")
        .then(res => res.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "text/xml");
            const personajes = xml.getElementsByTagName("personaje");

            let encontrado = false;
            resultado.innerHTML = "";

            for (let p of personajes) {
                const titulo = p.getElementsByTagName("titulo")[0].textContent;
                const descripcion = p.getElementsByTagName("descripcion")[0].textContent;
                const imagen = p.getElementsByTagName("imagen")[0].textContent;

                if (titulo.toLowerCase() === nombreBuscado) {
                    encontrado = true;

                    resultado.innerHTML = `
                        <div class="tarjeta">
                            <img src="${imagen}" alt="${titulo}" style="width:250px">
                            <h3>${titulo}</h3>
                            <p>${descripcion}</p>
                        </div>
                    `;
                }
            }

            if (!encontrado) {
                resultado.innerHTML = `<p>Prueba con otro, ese no se encuentra en la lista.</p>`;
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
});
