var minutoHora = 60;
var valorMinuto = 0.4;

fetch("http://localhost:3000/pagamentos")
    .then(resp => { return resp.json() })
    .then(lancamento => {
        pagamento = lancamento;
        listaPagamentos();
    });

function listaPagamentos() {
    pagamento.forEach(info => {
        valorHora = parseInt(info.hora[1] * minutoHora)
        v = parseInt(info.hora[3])
        x = parseInt(info.hora[4])
        precoTotal = (valorHora + v + x) * valorMinuto
        console.log(precoTotal)
    })
}