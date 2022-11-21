const lancamentos = document.querySelector(".lista-hora");
const lancamento = document.querySelector(".linhamodelo");

var estacionamento = [];
fetch("http://localhost:3000/pagamentos")
.then(resp => {return resp.json()})
.then(lancamento => {
        estacionamento = lancamento;
        listaDePagamentos();
    });

function listaDePagamentos() {
    estacionamento.forEach(info => {

        var lista = lancamento.cloneNode(true);
        lista.classList.remove("model")
        lista.querySelector("#nomeCli").innerHTML = info.nome_cli;
        lista.querySelector("#idCarro").innerHTML = info.id_carro;
        if(info.hora.substr(0,1) == "-"){
            lista.querySelector("#hora").innerHTML = "Ainda estacionado";
            if(info.hora == "Ainda estacionado"){
                lista.querySelector("#pago").innerHTML += "-"
            }
        }else{
            lista.querySelector("#hora").innerHTML = info.hora;
            if(info.hora < "01:00:00"){
                lista.querySelector("#pago").innerHTML = "R$ 15,00"
            }else{
                lista.querySelector("#pago").innerHTML = "R$ " + info.hora * 10;
            }
        }

        lista.querySelector("#data").innerHTML = info.data.slice(0,10);
        lista.querySelector("#idVaga").innerHTML = info.id_vaga;
        
        
        console.log(info.hora)
        lancamentos.appendChild(lista);
    })
}

