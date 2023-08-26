import { conectaApi } from "./conexao.js";

const timelineGastos = document.getElementById("listaGastos");

const elementoValor = document.querySelector(".valor__info");

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
                    element.tipo,
                    element.id
                )
            );
        });
        // - CRIAR FUNCAO E COLOCAR SOMENTE A CHAMADA AQUI
        // adiciona os ícones nos card após serem criados e possiblita a animação de expandir e fechar
        const divCards = document.querySelectorAll("[data-card]");

        divCards.forEach((divCard) => {
            const divBotoesEditaDelete =
                divCard.querySelector(".container__botoes");
            divBotoesEditaDelete.style.display = "none";

            divCard.addEventListener("click", () => {
                divBotoesEditaDelete.style.display =
                    divBotoesEditaDelete.style.display === "none"
                        ? "block"
                        : "none";
                divCard.classList.toggle("card__expandido");
            });
        });

        // - CRIAR FUNCAO E COLOCAR SOMENTE A CHAMADA AQUI
        // seleciona o icone do botão delete
        const botoesDelete = document.querySelectorAll("[data-botaoDeleta]");

        botoesDelete.forEach((botaoDelete) => {
            botaoDelete.addEventListener("click", async () => {
                const cardElement =
                    botaoDelete.parentNode.parentNode.parentNode;
                const cardId = cardElement.getAttribute("data-id");
                await conectaApi.removeGastos(cardId);
                alert("Gasto removido!");
                window.location.reload();
            });
        });

        // - CRIAR FUNCAO E COLOCAR SOMENTE A CHAMADA AQUI
        //pega os valores de preço em cada card
        const cardPrecos = document.querySelectorAll("[data-preco]");
        var somaGastos = 0;
        cardPrecos.forEach((card) => {
            var gasto = parseFloat(
                card.innerText.replace("R$", "").replace(",", ".")
            );

            somaGastos += gasto;
        });
        elementoValor.innerText = `R$ ${somaGastos}`;
    } catch {
        timelineGastos.innerHTML = `<h2>Não foi possível carregar a lista de vídeos!</h2>`;
    }
}

mostrarGastos();

export default function constroiCard(gasto, valor, loja, data, tipo, id) {
    const card = document.createElement("div");
    card.className = "card__timeline";
    card.setAttribute("data-card", "");
    card.setAttribute("data-id", id);

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

    <div class="container__info-botoes">
        <div class="container__preco-loja">
            <div class="card__preco">
                <p data-preco>R$ ${valor}</p>
            </div>

            <div class="card__loja-data">
                <p>${loja}</p>
                <p>${data}</p>
            </div>
        </div>
        <div class="container__botoes" id="botoes-edit-delete">
            <img data-botaoDeleta class="botoes__card" src="./assets/lixeira.svg" />
            <img class="botoes__card" src="./assets/edit.svg" />
        </div>
    </div>
</div>`;

    // FALTANDO COLOCAR ICONES DIFERENTES PARA CADA TIPO DE GASTO
    return card;
}
