//menu hamburguer e opcoes
const botaoMenuGeral = document.querySelector("[data-menuGeral]");
const botaoMenuDesejos = document.querySelector("[data-menuDesejos]");
const botaoMenuPedidos = document.querySelector("[data-menuPedidos]");

// logo montresor
const botaoLogo = document.querySelector("[data-botaoLogo]");

// tela cadastro item
const botaoNovoItem = document.querySelector("[data-botaoNovoItem]");

//tela cadastro pedido
const botaoNovoPedido = document.querySelector("[data-botaoNovoPedido]");

animacaoMenuHamburguer();

redirecionamentosPaginas();

// animacao para menu hamburguer

function redirecionamentosPaginas() {
    //redirecionar para pag principal ao apertar na logo
    botaoLogo.addEventListener(
        "click",
        () => (window.location.href = "./index.html")
    );

    if (window.location.pathname == "/order.html") {
        //botao novo pedido que redireciona para pagina de cadastro
        botaoNovoPedido.addEventListener(
            "click",
            () => (window.location.href = "./new-order.html")
        );
    }

    if (window.location.pathname == "/index.html") {
        // botao novo item que redireciona para pagina de cadastro
        botaoNovoItem.addEventListener(
            "click",
            () => (window.location.href = "./new-item.html")
        );
    }

    //menu hamburguer - opção geral
    botaoMenuGeral.addEventListener("click", () => (window.location.href = ""));

    //menu hamburguer - opção lista de desejos
    botaoMenuDesejos.addEventListener(
        "click",
        () => (window.location.href = "")
    );

    //menu hamburguer - opção lista de pedidos
    botaoMenuPedidos.addEventListener(
        "click",
        () => (window.location.href = "./order.html")
    );
}

function animacaoMenuHamburguer() {
    const menuIcone = document.getElementById("menu-hamburguer");
    const menuConteudo = document.querySelector(".menu__hamburguer");

    menuIcone.onclick = function () {
        if (menuConteudo.style.display == "block") {
            menuConteudo.style.display = "none";
        } else {
            menuConteudo.style.display = "block";
            menuConteudo.classList.add("menu-fade-in");
        }
    };
}
