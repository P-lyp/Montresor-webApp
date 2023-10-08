async function criaPedido(
    nomeCliente,
    valorPedido,
    descricaoPedido,
    dataInicio,
    finalizado
) {
    const conexao = await fetch("https://api-montresor.onrender.com/pedidos", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            nomeCliente: nomeCliente,
            valorPedido: valorPedido,
            descricaoPedido: descricaoPedido,
            dataInicio: dataInicio,
            finalizado: finalizado,
        }),
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar!");
    }

    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function adquirePedidos() {
    const conexao = await fetch("https://api-montresor.onrender.com/pedidos");
    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function removePedido(id) {
    const conexao = await fetch("https://api-montresor.onrender.com/pedidos", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível remover!");
    }

    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function alteraStatusFinalizado(id) {
    console.log(id);
    const conexao = await fetch("https://api-montresor.onrender.com/pedidos", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id: id,
        }),
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível finalizar o pedido!");
    }

    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

export const conexoesOrder = {
    adquirePedidos,
    criaPedido,
    removePedido,
    alteraStatusFinalizado,
};
