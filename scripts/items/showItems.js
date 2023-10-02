import { conexoesItem } from "./connectItems.js";

const timelineGastos = document.getElementById("listaGastos");

const elementoValor = document.querySelector(".valor__info");

async function carregarGastos() {
    try {
        const listaApi = await conexoesItem.adquireGastos();

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
        // adiciona os ícones nos card após serem criados e possiblita a animação de expandir e fechar
        addAnimacaoBtn();

        // seleciona o icone do botão delete
        funcionamentoBtnDelete();

        //seleciona os valores de preço em cada card e soma eles para exibir
        calculaTotalInvestido();
    } catch {
        timelineGastos.innerHTML = `<h2>Não foi possível carregar a lista de gastos!</h2>`;
    }
}

carregarGastos();

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

    <div class="container__info">
        <div class="container__preco-loja">
            <div class="card__preco">
                <p data-preco>R$ ${valor}</p>
            </div>

            <div class="card__loja-data">
                <p>${loja}</p>
                <p>${data}</p>
            </div>
        </div>
    </div>

    <div class="container__botoes" id="botoes-edit-delete">
            <img data-botaoDeleta class="botoes__card" src="./assets/icone-remover.svg" />
        </div>
</div>`;

    // FALTANDO COLOCAR ICONES DIFERENTES PARA CADA TIPO DE GASTO
    return card;
}

function calculaTotalInvestido() {
    const cardPrecos = document.querySelectorAll("[data-preco]");
    var somaGastos = 0;
    cardPrecos.forEach((card) => {
        var gasto = parseFloat(
            card.innerText.replace("R$", "").replace(",", ".")
        );

        somaGastos += gasto;
    });
    elementoValor.innerText = `R$ ${somaGastos.toFixed(2)}`;
}

function funcionamentoBtnDelete() {
    const botoesDelete = document.querySelectorAll("[data-botaoDeleta]");

    botoesDelete.forEach((botaoDelete) => {
        botaoDelete.addEventListener("click", async () => {
            const cardElement = botaoDelete.parentNode.parentNode;
            const cardId = cardElement.getAttribute("data-id");
            await conexoesItem.removeGastos(cardId);
            alert("Gasto removido!");
            window.location.reload();
        });
    });
}

function addAnimacaoBtn() {
    const divCards = document.querySelectorAll("[data-card]");

    divCards.forEach((divCard) => {
        const divBotoesEditaDelete =
            divCard.querySelector(".container__botoes");
        const btnDeleteIcon = divCard.querySelector("[data-botaoDeleta]");

        const divPrecoLoja = divCard.querySelector(".container__info");

        divBotoesEditaDelete.style.display = "none";

        divCard.addEventListener("click", () => {
            divBotoesEditaDelete.style.display =
                divBotoesEditaDelete.style.display === "none"
                    ? "block"
                    : "none";
            btnDeleteIcon.classList.toggle("fadeIn");
            divPrecoLoja.classList.toggle("slideIn");

            // divCard.classList.toggle("card__expandido");
        });
    });
}
