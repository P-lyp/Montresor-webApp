// animacao para menu hamburguer
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

//redirecionar botao + para outra pagina
var botaoNovoItem = document.getElementById("botaoNovoItem");

botaoNovoItem.addEventListener(
    "click",
    () => (window.location.href = "./new-item.html")
);
