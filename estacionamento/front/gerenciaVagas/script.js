const lancamentos = document.querySelector(".lista-vagas");
const lancamento = document.querySelector(".botoes2");

function carregarVagas() {
    const options = { method: 'GET' };

    fetch('http://localhost:3000/vagas', options)
        .then(response => response.json())
        .then(resp => {
            resp.forEach(v => {
                var vaga = document.querySelector(".vaga").cloneNode(true);
                vaga.classList.remove("modelo")
                vaga.querySelector(".id").innerHTML = v.id_vaga;
                if (v.id_vaga < 10) {
                    vaga.querySelector(".id").innerHTML = "0" + v.id_vaga;
                }

                const options2 = { method: 'GET' };
                fetch('http://localhost:3000/registros', options2)
                    .then(response => response.json())
                    .then(resp => {

                        resp.forEach(r => {
                            if (r.id_vaga == v.id_vaga) {
                                if (r.hora_saida == "00:00:00") {


                                    const options3 = { method: 'GET' };

                                    fetch('http://localhost:3000/clientes/' + r.id_cliente, options3)
                                        .then(response => response.json())
                                        .then(response => {
                                            response.forEach(c => {
                                                vaga.querySelector(".id_vaga_cli").innerHTML = c.id_cliente;
                                                vaga.querySelector(".nome").innerHTML = c.nome_cli;
                                                // vaga.querySelector(".email").innerHTML = c.email;
                                            })

                                        })

                                    const options4 = { method: 'GET' };

                                    fetch('http://localhost:3000/telefonesCli/' + r.id_cliente, options4)
                                        .then(response => response.json())
                                        .then(resp => {
                                            resp.forEach(t => {
                                                vaga.querySelector(".telefone").innerHTML += t.telefone;
                                            })

                                        })


                                    const options5 = { method: 'GET' };

                                    fetch('http://localhost:3000/carros/' + r.id_cliente, options5)
                                        .then(response => response.json())
                                        .then(resp => {
                                            resp.forEach(car => {
                                                vaga.querySelector(".tipoCar").innerHTML = car.tipo + ": ";
                                                vaga.querySelector(".placa").innerHTML += car.placa;
                                                vaga.querySelector(".modeloCar").innerHTML += car.modelo;
                                                // if(car.descricao == null){
                                                //     vaga.querySelector(".descricao") = "sem desrição";
                                                // }else{
                                                vaga.querySelector(".descricao").innerHTML += car.descricao;
                                                // }

                                            })
                                        })
                                    var botaofina = document.createElement("button")
                                    botaofina.classList.add("btnCadVaga");
                                    botaofina.setAttribute("onClick", "finalizarVaga(this)")
                                    botaofina.id = v.id_vaga
                                    vaga.appendChild(botaofina);
                                    console.log(botaofina);

                                }
                            }
                        })
                    })

                document.querySelector(".cards").appendChild(vaga);


            })
        })
}

function finalizarVaga(e) {
    var hoje = new Date();
    var hora = hoje.getHours();
    var minutos = hoje.getMinutes();
    var segundos = hoje.getSeconds();
    horaAtual = hora + ':' + minutos + ":" + segundos;

    let options = JSON.stringify({
        "id_vaga": e.id,
        "hora_saida": horaAtual

    });

    fetch("http://localhost:3000/registros", {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(response => response.json())
        .then(response => { 
            if(response.hora_saida !== "00:00:00"){
                window.location.reload();

            }
            console.log(response)
        })
}


function listaPagamentos() {
    pagamento.forEach(info => {
        valorHora = parseInt(info.hora[1] * minutoHora)
        v = parseInt(info.hora[3])
        x = parseInt(info.hora[4])
        precoTotal = (valorHora + v + x) * valorMinuto
        console.log(precoTotal)
    })
}


var modal = document.querySelector(".modal");

function abrirModal() {
    modal.classList.toggle("model");
}


function cadastrar() {
    let idVaga = document.querySelector(".idVaga").value;
    let ocupada = document.querySelector(".ocupada").value;

    let options = JSON.stringify({
        "id_vaga": idVaga,
        "ocupada": ocupada
    });

    fetch("http://localhost:3000/vagas", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(resp => { return resp })
        .then(resp => {
            alert("Vaga cadastrada com sucesso!");
            window.location.reload();
            abrirModal();

        })
}


var val = document.querySelector(".tela");

function abrirModal2() {
    val.classList.toggle("tela2");
    var hoje = new Date();
    var dia = String(hoje.getDate()).padStart(2, '0');
    var mes = String(hoje.getMonth() + 1).padStart(2, '0');
    var ano = hoje.getFullYear();
    dataAtual = ano + '-' + mes + '-' + dia;
    document.querySelector(".data").value = dataAtual;

    let inpData = document.querySelector(".data");
    inpData.disabled = true;
    console.log(dataAtual);

    var hora = hoje.getHours();
    var minutos = hoje.getMinutes();
    var segundos = hoje.getSeconds();
    horaAtual = hora + ':' + minutos + ":" + segundos;
    document.querySelector(".horaEn").value = horaAtual;

    let inpHora = document.querySelector(".horaEn");
    inpHora.disabled = true;

    var saida = "00:00:00"
    var Hsaida = document.querySelector(".horaSai").value = saida;

    let inpHoraS = document.querySelector(".horaSai");
    inpHoraS.disabled = true;
}


function cadRegistro() {

    let idCliente = document.querySelector(".idCliente").value;
    let idCarro = document.querySelector(".idCarro").value;
    let idVaga = document.querySelector(".idVaga").value;

    let horaSaida = document.querySelector(".horaSai").value;


    let options = JSON.stringify({
        "id_cliente": idCliente,
        "id_carro": idCarro,
        "id_vaga": idVaga,
        "hora_entrada": horaAtual,
        "hora_saida": horaSaida,
        "data": dataAtual
    });

    fetch("http://localhost:3000/registros", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": options
    })
        .then(resp => { return resp })
        .then(resp => {
            alert("Registro cadastrado com sucesso!");
            window.location.reload();
            abrirModal2();

        })
}

