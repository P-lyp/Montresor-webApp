import { conectaApi } from "./conexao.js";

const formulario = document.getElementById("form");

formulario.addEventListener("submit", (evento) => criarGasto(evento));

async function criarGasto(evento) {
    evento.preventDefault();

    const nomeGasto = document.getElementById("nomeGasto").value;
    const valorGasto = document.getElementById("valorGasto").value;
    const lojaGasto = document.getElementById("lojaGasto").value;
    const dataGasto = document.getElementById("dataGasto").value;
    const tipoGasto = document.getElementById("tipoGasto").value;

    console.log(nomeGasto);
    console.log(valorGasto);
    console.log(lojaGasto);
    console.log(dataGasto);
    console.log(tipoGasto);

    try {
        await conectaApi.criaGasto(
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
