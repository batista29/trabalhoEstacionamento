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
        
        let valorHora = parseInt(info.hora[1] * minutoHora)
        let minutoDecimal = parseInt(info.hora[3])
        let minuto = parseInt(info.hora[4])
        precoTotal = (valorHora + (minutoDecimal*10) + minuto) * valorMinuto
        console.log(precoTotal)
    })
}