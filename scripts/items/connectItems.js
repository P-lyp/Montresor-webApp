async function criaGasto(gasto, valor, loja, data, tipo) {
    const conexao = await fetch("https://api-montresor.onrender.com/gastos", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            gasto: gasto,
            valor: valor,
            loja: loja,
            data: data,
            tipo: tipo,
        }),
    });

    if (!conexao.ok) {
        throw new Error("Não foi possível enviar!");
    }

    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function adquireGastos() {
    const conexao = await fetch("https://api-montresor.onrender.com/gastos");
    console.log(conexao.status);
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

async function removeGastos(id) {
    const conexao = await fetch("https://api-montresor.onrender.com/gastos", {
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

export const conexoesItem = {
    adquireGastos,
    criaGasto,
    removeGastos,
};
