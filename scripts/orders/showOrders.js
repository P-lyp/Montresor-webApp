import { conexoesOrder } from "./connectOrders.js";

const timelinePedidos = document.getElementById("listaPedidos");

const elementoPedidosAndamento = document.getElementById(
    "num_pedidosAndamento"
);

const elementoPedidosFinalizado = document.getElementById(
    "num_pedidosFinalizado"
);

var quantidadeFinalizado = 0;
var quantidadeAndamento = 0;

async function carregarPedidos() {
    try {
        const listaApi = await conexoesOrder.adquirePedidos();

        listaApi.forEach((element) => {
            timelinePedidos.appendChild(
                constroiCardPedido(
                    element.nomeCliente,
                    element.valorPedido,
                    element.descricaoPedido,
                    element.dataInicio,
                    element.finalizado,
                    element.id
                )
            );
        });

        funcionamentoBtnDelete();

        elementoPedidosFinalizado.innerText = quantidadeFinalizado;
        elementoPedidosAndamento.innerText = quantidadeAndamento;

        // espaco para funções utilizadas nos cards
    } catch (e) {
        timelinePedidos.innerHTML = `<h2>Não foi possível carregar a lista de pedidos!</h2>`;
    }
}

function funcionamentoBtnDelete() {
    const botoesDelete = document.querySelectorAll("[data-botaoDeleta]");

    botoesDelete.forEach((botaoDelete) => {
        botaoDelete.addEventListener("click", async () => {
            const cardElement = botaoDelete.parentNode.parentNode;
            const cardId = cardElement.getAttribute("data-id");
            await conexoesOrder.removePedido(cardId);
            alert("Pedido removido com sucesso!");
            window.location.reload();
        });
    });
}

carregarPedidos();

export default function constroiCardPedido(
    nomeCliente,
    valorPedido,
    descricaoPedido,
    dataInicio,
    finalizado,
    id
) {
    const card = document.createElement("div");
    card.className = "container__card__pedido";
    card.setAttribute("data-card", "");
    card.setAttribute("data-id", id);

    var statusPedido;
    var dataAtributteStatus;
    var iconeStatus;
    var dataBotao;

    if (finalizado == false) {
        dataAtributteStatus = "status__andamento";
        statusPedido = "Em andamento";
        iconeStatus = "pedido-finalizado";
        dataBotao = "botaoFinalizar";
        quantidadeAndamento++;
    } else {
        dataAtributteStatus = "status__entregue";
        statusPedido = "Entregue";
        iconeStatus = "icone-remover";
        dataBotao = "botaoDeleta";
        quantidadeFinalizado++;
    }

    card.innerHTML = `
                    <div class="categoria__card">
                        <p class="categoria__card__data">${dataInicio}</p>
                        <p class="categoria__card__status ${dataAtributteStatus}">
                            ${statusPedido}
                        </p>
                    </div>

                    <div class="categoria__card card__background__superior">
                        <p class="categoria__card__nome">${nomeCliente}</p>
                        <p class="categoria__card__valor">R$ ${valorPedido}</p>
                    </div>
                    <div class="categoria__card card__background__inferior">
                        <p class="categoria__card__descricao">
                            ${descricaoPedido}
                        </p>
                        <img
                            data-${dataBotao} 
                            class="categoria__card__icone"
                            src="./assets/${iconeStatus}.svg"
                        />
                    </div>
    `;

    return card;
}
