import { conexoesOrder } from "./connectOrders.js";

const formulario = document.getElementById("form");

formulario.addEventListener("submit", (evento) => cadastrarPedido(evento));

async function cadastrarPedido(evento) {
    evento.preventDefault();

    const nomeCliente = document.getElementById("nomeCliente").value;
    const valorPedido = document.getElementById("valorPedido").value;
    const descricaoPedido = document.getElementById("descricaoPedido").value;
    const dataInicio = document.getElementById("dataInicio").value;
    const finalizado = document.getElementById("finalizado").checked;

    try {
        await conexoesOrder.criaPedido(
            nomeCliente,
            valorPedido,
            descricaoPedido,
            dataInicio,
            finalizado
        );

        window.location.href = "./order.html";
    } catch (e) {
        alert(e);
    }
}
