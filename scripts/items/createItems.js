import { conexoesApi } from "./connectItems.js";

const formulario = document.getElementById("form");

formulario.addEventListener("submit", (evento) => cadastrarGasto(evento));

async function cadastrarGasto(evento) {
    evento.preventDefault();

    const nomeGasto = document.getElementById("nomeGasto").value;
    const valorGasto = document.getElementById("valorGasto").value;
    const lojaGasto = document.getElementById("lojaGasto").value;
    const dataGasto = document.getElementById("dataGasto").value;
    const tipoGasto = document.getElementById("tipoGasto").value;

    try {
        await conexoesApi.criaGasto(
            nomeGasto,
            valorGasto,
            lojaGasto,
            dataGasto,
            tipoGasto
        );

        window.location.href = "./index.html";
    } catch (e) {
        alert(e);
    }
}
