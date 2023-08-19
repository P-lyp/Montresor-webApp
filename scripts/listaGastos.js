import { conectaApi } from "./conexao.js";

const timelineGastos = document.getElementById("listaGastos");

async function mostrarGastos() {
    try {
        const listaApi = await conectaApi.listaGastos();

        listaApi.forEach((element) => {
            timelineGastos.appendChild(
                constroiCard(
                    element.gasto,
                    element.valor,
                    element.loja,
                    element.data,
                    element.tipo
                )
            );
        });
    } catch {
        timelineGastos.innerHTML = `<h2>Não foi possível carregar a lista de vídeos!</h2>`;
    }
}

mostrarGastos();

export default function constroiCard(gasto, valor, loja, data, tipo) {
    const card = document.createElement("div");

    card.className = "card__timeline";

    card.innerHTML = `
    <div class="container__icone-titulo">
                    <div class="container__card__icone">
                        <img
                            class="icone__timeline"
                            src="./assets/icone-pedido.svg"
                        />
                    </div>
                    <div class="card__titulo">
                        <p>${gasto}</p>
                    </div>
                </div>

                <div class="container__preco-loja">
                    <div class="card__preco">
                        <p>${valor}</p>
                    </div>

                    <div class="card__loja-data">
                        <p>${loja}</p>
                        <p>${data}</p>
                    </div>
                </div>
    `;
    // FALTANDO COLOCAR ICONES DIFERENTES PARA CADA TIPO DE GASTO
    return card;
}
