const botaoMenuGeral = document.querySelector("[data-menuGeral]");
const botaoMenuDesejos = document.querySelector("[data-menuDesejos]");
const botaoMenuPedidos = document.querySelector("[data-menuPedidos]");

const botaoLogo = document.querySelector("[data-botaoLogo]");
const botaoNovoItem = document.querySelector("[data-botaoNovoItem]");

redirecionamentosPaginas();

// animacao para menu hamburguer
animacaoMenuHamburguer();

function redirecionamentosPaginas() {
    //redirecionar para pag principal ao apertar na logo
    botaoLogo.addEventListener(
        "click",
        () => (window.location.href = "./index.html")
    );

    //redirecionar botao + para outra pagina
    botaoNovoItem.addEventListener(
        "click",
        () => (window.location.href = "./new-item.html")
    );

    //menu
    botaoMenuGeral.addEventListener("click", () => (window.location.href = ""));

    botaoMenuDesejos.addEventListener(
        "click",
        () => (window.location.href = "")
    );

    botaoMenuPedidos.addEventListener(
        "click",
        () => (window.location.href = "./sales.html")
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
