const btnBuscar = document.getElementById("btnBuscar");
const inputBuscar = document.getElementById("buscar");
const selectorTema = document.getElementById("tema");
const btnAdd = document.getElementById("btnAdd");

let contenedor = document.createElement("div");
contenedor.classList.add("contenedor");
document.body.insertBefore(contenedor, document.querySelector("footer"));

btnAdd.addEventListener("click", () => {
    const titulo = prompt("Título:");
    const texto = prompt("Descripción:");
    if (!titulo) return;

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `<h3>${titulo}</h3><p>${texto || ""}</p>`;
    contenedor.appendChild(tarjeta);
});

btnBuscar.addEventListener("click", () => {
    const filtro = inputBuscar.value.toLowerCase();
    const tarjetas = document.querySelectorAll(".tarjeta");

    tarjetas.forEach(t => {
        t.style.display = t.innerText.toLowerCase().includes(filtro) ? "block" : "none";
    });
});

selectorTema.addEventListener("change", () => {
    const tema = selectorTema.value;

    if (tema === "claro") {
        document.body.style.background = "white";
        document.body.style.color = "black";
    }

    if (tema === "oscuro") {
        document.body.style.background = "black";
        document.body.style.color = "white";
    }

    if (tema === "personal") {
        window.open("color.html", "_blank");
    }
});
